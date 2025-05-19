async function routes(fastify, options) {
  fastify.get("/", async (request, reply) => {
    const client = await fastify.pg.connect();

    try {
      const { rows } = await client.query("SELECT * FROM genres ORDER BY name");

      return { genres: rows };
    } catch (error) {
      reply.code(500).send({
        error: "An error occurred while fetching the genres",
      });
    } finally {
      client.release();
    }
  });
}

module.exports = routes;
