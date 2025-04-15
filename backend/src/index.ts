import "dotenv/config";
import Fastify from "fastify";
import registerRoutes from "./routes";

const fastify = Fastify({
  logger: true,
});

fastify.register(import("@fastify/cors"), {
  origin: process.env.CORS_ORIGIN || true,
  credentials: true,
});

fastify.register(import("@fastify/formbody"));

fastify.register(import("@fastify/cookie"), {
  secret: process.env.COOKIE_SECRET,
  hook: "onRequest",
});

fastify.register(registerRoutes);

fastify.get("/", async (request, reply) => {
  return { message: "Welcome to InsureTex API" };
});

const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
    const host = process.env.HOST || "0.0.0.0";

    await fastify.listen({ host, port });
    console.log(`Server listening on ${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
