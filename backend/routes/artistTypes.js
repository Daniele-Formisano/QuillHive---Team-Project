async function routes(fastify, options) {
  fastify.get("/", async (request, reply) => {
    const client = await fastify.pg.connect();
    try {
      const { rows } = await client.query(
        "SELECT * FROM artist_types ORDER BY id"
      );

      return { artistTypes: rows };
    } catch (error) {
      reply
        .code(500)
        .send({ error: "An error occured fetching the artist types" });
    }
  });
}

module.exports = routes;
