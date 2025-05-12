async function routes(fastify, options) {
  // recuperiamo tutte le storie presenti nel DB
  fastify.get("/", async (request, reply) => {
    const client = await fastify.pg.connect();

    try {
      const { rows } = await client.query(
        "SELECT S.id, S.title, S.plot, S.cover_image, U.username AS user FROM stories AS S JOIN users AS U ON S.user_id = U.id ORDER BY title ASC"
      );

      return { stories: rows };
    } catch (error) {
      reply.code(500).send({
        error: "An error occurred while fetching the stories",
      });
    } finally {
      client.release();
    }
  });

  // recuperiamo una storia con l'autore e i generi in base all'ID
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params;
    const client = await fastify.pg.connect();

    try {
      // recupero la storia associata ad un id
      const { rows: storyRows } = await client.query(
        "SELECT id, title, plot, user_id, cover_image, saved, created_at, updated_at FROM stories WHERE id = $1",
        [id]
      );

      if (!storyRows.length) {
        return reply.code(404).send({ error: "story not found" });
      }

      // recupero l'username in base all'id presente nella storia
      const { rows: userRows } = await client.query(
        "SELECT id, username FROM users WHERE id = $1",
        [storyRows[0].user_id]
      );

      if (!userRows.length) {
        return reply.code(404).send({ error: "user not found" });
      }

      // recupero i generi associati all'id della storia
      const { rows: genreStoryRows } = await client.query(
        "SELECT G.id, G.name FROM story_genres as SG JOIN genres AS G ON SG.genre_id = G.id WHERE SG.story_id = $1",
        [id]
      );

      const { user_id, ...story } = storyRows[0]; //rimuovo lo user id dalla storia

      // creo un oggetto con i dati della storia senza lo user id e inserisco le informazioni utente in un oggetto
      const storyData = { ...story, user: userRows[0], genres: genreStoryRows };

      return { story: storyData };
    } catch (error) {
      reply.code(500).send({
        error: "An error occurred while fetching the story",
      });
    } finally {
      client.release();
    }
  });

  // rotta per creazione di una nuova storia
  fastify.post("/", async (request, reply) => {
    const { title, plot, user_id, language_id, cover_image, genres } =
      request.body;

    const client = await fastify.pg.connect();

    try {
      // query per controllare se il titolo selezionato per la nuova storia è già in uso
      const { rows: validTitle } = await client.query(
        "SELECT id, title FROM stories WHERE LOWER(title) = $1",
        [title.toLowerCase()]
      );

      // controllo per visuallizzare se il titolo è unico
      if (validTitle.length) {
        return reply.code(400).send({ error: "title already exist" });
      }

      // inserire la nuova soria come record nel db
      await client.query(
        "INSERT INTO stories (title, plot, user_id, language_id, cover_image) VALUES ($1, $2, $3, $4, $5); ",
        [title, plot, user_id, language_id, cover_image]
      );

      // inserire i generi della nuova storia nella tabella di incrocio
      for (const genre of genres) {
        await client.query(
          "INSERT INTO story_genres (story_id, genre_id) VALUES ((SELECT id FROM stories WHERE title = $1), $2)",
          [title, genre.id]
        );
      }
    } catch (error) {
      reply.code(500).send({
        error: "An error occurred while creating the story",
      });
    } finally {
      client.release();
    }
  });
}

module.exports = routes;
