import { FastifyContextConfig } from "fastify";

declare module "fastify" {
  interface FastifyContextConfig {
    auth?: boolean;
  }

  interface FastifyRequest {
    user?: {
      id: number;
      email: string;
    };
  }
} 