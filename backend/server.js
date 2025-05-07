const fastify = require("fastify")({ logger: true });
const fastifyCors = require("@fastify/cors");
const fastifyPostgres = require("@fastify/postgres");
const fastifyJwt = require("@fastify/jwt");

fastify.register(fastifyCors, {
  origin: true,
});

fastify.register(fastifyPostgres, {
  connectionString: "postgres://postgres:12345@localhost:5432/QuillHive",
});

fastify.register(fastifyJwt, {
  secret: "a1ad968e2e14056b123282a50a4431852b099812a1a0148124abcc74aa500cbd",
});

fastify.decorate("authenticate", async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.send(error);
  }
});

// registriamo le rotte
fastify.register(require("./routes/users"), { prefix: "/api/users" });

fastify.get("/", async () => {
  return { status: "Server OK" };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
