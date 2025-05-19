async function routes(fastify, options) {
  fastify.get("/", async (request, reply) => {
    const client = await fastify.pg.connect();

    try {
      const { rows } = await client.query(
        "SELECT * FROM languages ORDER BY language"
      );

      return { languages: rows };
    } catch (error) {
      reply.code(500).send({
        error: "An error occurred while fetching the languages",
      });
    } finally {
      client.release();
    }
  });
}

module.exports = routes;
