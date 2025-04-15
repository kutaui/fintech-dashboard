import { eq } from "drizzle-orm";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { COOKIE_NAME, verifyToken } from "./jwt";

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const token = request.cookies[COOKIE_NAME];

    if (!token) {
      reply.status(401).send({ error: "Authentication required" });
      return reply;
    }

    const signedCookieValue = request.unsignCookie(token);

    if (!signedCookieValue.valid || !signedCookieValue.value) {
      reply.status(401).send({ error: "Invalid authentication token" });
      return reply;
    }

    const decodedToken = verifyToken(signedCookieValue.value);

    if (!decodedToken) {
      reply.status(401).send({ error: "Invalid or expired token" });
      return reply;
    }

    const [user] = await db
      .select({ id: usersTable.id, email: usersTable.email })
      .from(usersTable)
      .where(eq(usersTable.id, decodedToken.userId));

    if (!user) {
      reply.status(401).send({ error: "User not found" });
      return reply;
    }

    request.user = {
      id: user.id,
      email: user.email,
    };

    return;
  } catch (err: any) {
    reply.status(401).send({ error: "Unauthorized" });
    return reply;
  }
};

export function registerAuthPlugin(fastify: FastifyInstance) {
  fastify.decorate("authenticate", authenticate);

  fastify.addHook("onRoute", (routeOptions) => {
    if (routeOptions.config?.auth === true) {
      const preHandler = routeOptions.preHandler || [];
      routeOptions.preHandler = Array.isArray(preHandler)
        ? [authenticate, ...preHandler]
        : [authenticate, preHandler];
    }
  });
}
