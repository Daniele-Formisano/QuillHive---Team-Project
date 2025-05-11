async function routes(fastify, options) {
  // recuperiamo tutte le storie presenti nel DB
  fastify.get("/", async (request, reply) => {
    const client = await fastify.pg.connect();

    try {
      const { rows } = await client.query(
        "SELECT * FROM stories ORDER BY title"
      );

      return { genres: rows };
    } catch (error) {
      reply.code(500).send({
        error: "An error occurred while fetching the stories",
      });
    } finally {
      client.release();
    }
  });

  // recuperiamo una storia con l'autore in base all'ID
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params;

    try {
      const client = await fastify.pg.connect();

      // recupero la storia associata ad un id
      const { rows: storyRows } = await client.query(
        "SELECT id, title, plot, user_id, cover_image, saved, created_at, updated_at FROM stories WHERE id = $1",
        [id]
      );

      // recupero l'username in base all'id presente nella storia
      const { rows: userRows } = await client.query(
        "SELECT id, username FROM users WHERE id = $1",
        [storyRows[0].user_id]
      );

      if (!userRows.length) {
        return reply.code(404).send({ error: "user not found" });
      }

      const { user_id, ...story } = storyRows[0]; //rimuovo lo user id dalla storia

      // creo un oggetto con i dati della storia senza lo user id e inserisco le informazioni utente in un oggetto
      const storyData = { ...story, user: userRows[0] };

      return { story: storyData };
    } catch (error) {
      reply.code(500).send({
        error: "An error occurred while fetching the story",
      });
    } finally {
      client.release();
    }
  });
}

module.exports = routes;
