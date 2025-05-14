async function routes(fastify, options) {
  // rotta per la visualizzazione dei capitoli di una storia
  fastify.get("/stories/:story_id/chapters", async (request, reply) => {
    const { story_id } = request.params;
    const client = await fastify.pg.connect();
    try {
      const { rows } = await client.query(
        "SELECT id, title, chapter_order, content FROM chapters WHERE story_id = $1",
        [story_id]
      );

      if (rows.length === 0) {
        return reply.code(404).send({ error: "Chapter not found" });
      }
      return { chapters: rows };
    } catch (error) {
      reply
        .code(500)
        .send({ error: "An error occurred fetching the chapters" });
    } finally {
      client.release();
    }
  });

  // rotta per la creazione di un capitolo in una storia
  fastify.post("/stories/:story_id/chapters", async (request, reply) => {
    const { story_id } = request.params;
    const { title, chapter_order, content } = request.body;

    const client = await fastify.pg.connect();

    try {
      const { rows } = await client.query(
        "INSERT INTO chapters (title, story_id, chapter_order, content) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, story_id, chapter_order, content]
      );
      reply
        .code(200)
        .send({ message: "Chapter created successfully", chapter: rows });
    } catch (error) {
      reply.code(500).send({ error: "An error occured with the server" });
    } finally {
      client.release();
    }
  });

  // rotta per la modifica di un capitolo
  fastify.put("/chapters/:chapter_id", async (request, reply) => {
    const { chapter_id } = request.params;
    const { title, chapter_order, content, updated_at } = request.body;

    const client = await fastify.pg.connect();

    try {
      const { rows } = await client.query(
        "UPDATE chapters SET title = $1, chapter_order = $2, content = $3, updated_at = NOW() WHERE id = $4 RETURNING *",
        [title, chapter_order, content, chapter_id]
      );

      if (rows.length === 0) {
        return reply.code(404).send({ error: "Chapter not found" });
      }
      reply
        .code(201)
        .send({ message: "Chapter edited successfully", chapter: rows[0] });
    } catch (error) {
      reply.code(500).send({ error: "An error occured with the server" });
    } finally {
      client.release();
    }
  });

  // rotta per la cancellazione di un capitolo
  fastify.delete("/chapters/:chapter_id", async (request, reply) => {
    const { chapter_id } = request.params;
    const client = await fastify.pg.connect();

    try {
      const { rows } = await client.query(
        "DELETE FROM chapters WHERE id = $1",
        [chapter_id]
      );
      reply.code(200).send({ message: "Chapter deleted successfully" });
    } catch (error) {
      reply.code(500).send({ error: "An error occured with the server" });
    } finally {
      client.release();
    }
  });
}

module.exports = routes;
