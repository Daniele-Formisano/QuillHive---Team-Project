async function routes(fastify, options) {
  // ottiene tutti gli elemnti di users
  fastify.get("/", async (request, reply) => {
    const client = await fastify.pg.connect();

    try {
      const { rows } = await client.query(
        "SELECT id, username, profile_picture FROM users ORDER BY username"
      );

      return { users: rows };
    } catch (error) {
      reply.code(500).send({
        error: "An error occurred while fetching the users",
      });
    }
  });

  // ottiene un singolo user in base a ID
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params;
    const client = await fastify.pg.connect();

    try {
      const { rows } = await client.query(
        "SELECT id, username, email, profile_picture, bio, pronouns, created_at FROM users WHERE id = $1",
        [id]
      );

      if (rows.length === 0) {
        return reply.code(404).send({ error: "User not found" });
      }

      const { rows: languageRows } = await client.query(
        "SELECT L.language FROM user_languages AS UL JOIN languages AS L ON UL.language_id = L.id WHERE user_id = $1",
        [id]
      );

      const { rows: artistTypeRows } = await client.query(
        "SELECT A.name FROM user_artist_types AS UA JOIN artist_types AS A ON UA.artist_type_id = A.id WHERE user_id = $1",
        [id]
      );

      const user = rows[0];
      user.languages = languageRows.map((language) => language.language);
      user.artistTypes = artistTypeRows.map((artistType) => artistType.name);

      return { user };
    } catch (error) {
      reply.code(500).send({
        error: "An error occurred while fetching the user",
      });
    } finally {
      client.release();
    }
  });
}

module.exports = routes;
