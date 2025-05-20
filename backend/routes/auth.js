const bcrypt = require("bcrypt");

async function routes(fastify, options) {
  // rotta login user
  fastify.post("/login", async (request, reply) => {
    const { usernameOrEmail, password } = request.body;

    const client = await fastify.pg.connect();

    try {
      const { rows } = await client.query(
        "SELECT id, username, email, password FROM users WHERE LOWER(username) = $1 OR LOWER(email) = $1",
        [usernameOrEmail.toLowerCase()]
      );

      if (!rows.length) {
        return reply.code(401).send({ error: "invalid credentials" });
      }

      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return reply.code(401).send({ error: "invalid credentials" });
      }

      const token = fastify.jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
      });

      return {
        token,
        user: { id: user.id, username: user.username, email: user.email },
      };
    } catch (error) {
      reply.code(500).send({ error: "impossible to validate user" });
    } finally {
      client.release();
    }
  });

  // rotta register user
  fastify.post("/register", async (request, reply) => {
    const { username, email, password, pronouns, genres, artistTypes } =
      request.body;

    // crittografia user passowrd
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("hashed password", hashedPassword);

    const client = await fastify.pg.connect();

    try {
      // INSERT dati utente nella tabella users del DB
      const { rows } = await client.query(
        "INSERT INTO users (username, email, password, pronouns) VALUES ($1, $2, $3, $4) RETURNING *",
        [username, email, hashedPassword, pronouns]
      );

      const user = rows[0];

      console.log("user", user);

      // INSERT generi selezionati dall'utente nella tabella user_genres del DB
      for (const genre of genres) {
        await client.query(
          "INSERT INTO user_genres (user_id, genre_id) VALUES ($1, $2)",
          [user.id, genre]
        );
      }

      // INSERT artist types selezionati dall'utente nella tabella user_artist_types del DB
      if (artistTypes.length) {
        for (const artistType of artistTypes) {
          await client.query(
            "INSERT INTO user_artist_types (user_id, artist_type_id) VALUES ($1, $2)",
            [user.id, artistType]
          );
        }
      }

      reply.code(200).send({ message: "account created successfully" });
    } catch (error) {
      reply.code(500).send({ error: "impossible to register user" });
    } finally {
      client.release();
    }
  });
}

module.exports = routes;
