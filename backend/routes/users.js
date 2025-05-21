function addDelData(dbData, newData, key) {
  // recuperiamo i dati presenti nella nostra richiesta ma non nel DB
  const addData = newData.filter(
    (data) => !dbData.some((dataDb) => dataDb[key] === data.id)
  );

  // recuperiamo i dati presenti nel DB, ma non nella nostra richiesta, per rimuoverle
  const removeData = dbData.filter(
    (dataDb) => !newData.some((data) => data.id === dataDb[key])
  );

  return { dataToAdd: addData, dataToRemove: removeData };
}

async function routes(fastify, options) {
  // ottiene tutti gli elementi di users
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
        "SELECT L.id, L.language FROM user_languages AS UL JOIN languages AS L ON UL.language_id = L.id WHERE user_id = $1",
        [id]
      );

      const { rows: artistTypeRows } = await client.query(
        "SELECT A.id, A.name FROM user_artist_types AS UA JOIN artist_types AS A ON UA.artist_type_id = A.id WHERE user_id = $1",
        [id]
      );

      const user = rows[0];
      user.languages = languageRows.map((language) => language);
      user.artistTypes = artistTypeRows.map((artistType) => artistType);

      return { user };
    } catch (error) {
      reply.code(500).send({
        error: "An error occurred while fetching the user",
      });
    } finally {
      client.release();
    }
  });

  // modificare i dati dell'utente
  fastify.put("/:id", async (request, reply) => {
    const { id } = request.params;
    const { username, pronouns, bio, profile_picture, languages, artistTypes } =
      request.body;
    const client = await fastify.pg.connect();

    try {
      const { rows: validUsername } = await client.query(
        "SELECT username FROM users WHERE LOWER(username) = $1 AND id !=$2",
        [username.toLowerCase(), id]
      );

      console.log("Validazione", validUsername);

      if (validUsername.length > 0) {
        return reply.code(400).send({
          error: "Username already exist",
        });
      }

      // query per aggiornare i dati "semplici" nell'utente
      await client.query(
        "UPDATE users SET username = $2, pronouns = $3, bio = $4, profile_picture = $5, updated_at = NOW() WHERE id=$1",
        [id, username, pronouns, bio, profile_picture]
      );

      const { rows: dbUserLanguages } = await client.query(
        "SELECT * FROM user_languages WHERE user_id=$1",
        [id]
      );

      const updatedLanguages = addDelData(
        dbUserLanguages,
        languages,
        "language_id"
      );

      if (updatedLanguages.dataToAdd.length) {
        // ciclo for per aggiungere le lingue nella tabella incrociata
        for (const lang of updatedLanguages.dataToAdd) {
          await client.query(
            "INSERT INTO user_languages (user_id, language_id) VALUES ($1, $2)",
            [id, lang.id]
          );
        }
      }

      if (updatedLanguages.dataToRemove.length) {
        // ciclo for per eliminare le lingue nella tabella incrociata
        for (const lang of updatedLanguages.dataToRemove) {
          await client.query("DELETE FROM user_languages WHERE id=$1", [
            lang.id,
          ]);
        }
      }

      const { rows: dbUserArtistTypes } = await client.query(
        "SELECT * FROM user_artist_types WHERE user_id=$1",
        [id]
      );

      const updatedArtistTypes = addDelData(
        dbUserArtistTypes,
        artistTypes,
        "artist_type_id"
      );

      if (updatedArtistTypes.dataToAdd.length) {
        // ciclo for per aggiungere i tipi di artista nella tabella incrociata
        for (const artistType of updatedArtistTypes.dataToAdd) {
          await client.query(
            "INSERT INTO user_artist_types (user_id, artist_type_id) VALUES ($1, $2)",
            [id, artistType.id]
          );
        }
      }

      if (updatedArtistTypes.dataToRemove.length) {
        // ciclo for per eliminare i tipi di artista nella tabella incrociata
        for (const artistType of updatedArtistTypes.dataToRemove) {
          await client.query("DELETE FROM user_artist_types WHERE id=$1", [
            artistType.id,
          ]);
        }
      }
    } catch (error) {
      reply.code(500).send({
        error: "An error occurred updating your data",
      });
    } finally {
      client.release();
    }
  });

  // ottiene le informazioni della storia (ovvero status e saved) in base all'id, in associazione all'utente
  fastify.get("/:userId/:storyId", async (request, reply) => {
    const { userId, storyId } = request.params;

    const client = await fastify.pg.connect();

    try {
      const { rows: validUser } = await client.query(
        "SELECT id FROM users WHERE id = $1",
        [userId]
      );

      if (!validUser.length) {
        return reply.code(404).send({ error: "user not found" });
      }

      const { rows: validStory } = await client.query(
        "SELECT id FROM stories WHERE id = $1",
        [storyId]
      );

      if (!validStory.length) {
        return reply.code(404).send({ error: "story not found" });
      }

      const { rows } = await client.query(
        "SELECT * FROM user_stories WHERE user_id = $1 AND story_id = $2",
        [userId, storyId]
      );

      return { userStories: rows };
    } catch (error) {
      reply.code(500).send({
        error:
          "An error occurred while fetching the story status for this user",
      });
    } finally {
      client.release();
    }
  });

  // modifcare le informazioni della storia (ovvero status e saved) in base all'id, in associazione all'utente
  fastify.post("/:userId/:storyId", async (request, reply) => {
    const { userId, storyId } = request.params;
    const { status, saved } = request.body;

    const client = await fastify.pg.connect();

    try {
      await client.query(
        "INSERT INTO user_stories (user_id, story_id, status, saved) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id, story_id) DO UPDATE SET status = EXCLUDED.status, saved = EXCLUDED.saved",
        [userId, storyId, status, saved]
      );
    } catch (error) {
      reply.code(500).send({
        error: "An error occurred updating your data",
      });
    } finally {
      client.release();
    }
  });

  // verifica se username o email sono disponibili
  fastify.post("/validUsernameOrEmail", async (request, reply) => {
    const { username, email } = request.body;

    const client = await fastify.pg.connect();

    try {
      if (username) {
        const { rows: validUsername } = await client.query(
          "SELECT id, username FROM users WHERE LOWER(username) = $1",
          [username.toLowerCase()]
        );

        if (validUsername.length) {
          return reply.code(400).send({ error: "username already exists" });
        }
      }

      if (email) {
        const { rows: validEmail } = await client.query(
          "SELECT id, email FROM users WHERE LOWER(email) = $1",
          [email.toLowerCase()]
        );

        if (validEmail.length) {
          return reply.code(400).send({ error: "Email already exists" });
        }
      }
    } catch (error) {
      reply.code(500).send({
        error: "An error occurred updating your data",
      });
    } finally {
      client.release();
    }
  });
}

module.exports = routes;
