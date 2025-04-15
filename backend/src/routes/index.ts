import type { FastifyInstance } from "fastify";
import { registerAuthPlugin } from "../utils/auth";
import authRoutes from "./auth";
import offerRoutes from "./offers";

export default async function registerRoutes(fastify: FastifyInstance) {
  registerAuthPlugin(fastify);

  await fastify.register(authRoutes, { prefix: "/auth" });

  fastify.register(
    async (protectedApp) => {
      await protectedApp.register(offerRoutes, { prefix: "/offers" });

      protectedApp.get("/me", {
        handler: async (request) => {
          return {
            user: request.user,
            message: "You are authenticated!",
          };
        },
        config: {
          auth: true,
        },
      });
    },
    {
      prefix: "/api",
      config: {
        auth: true,
      },
    }
  );
}
