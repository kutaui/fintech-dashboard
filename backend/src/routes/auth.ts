import { eq } from "drizzle-orm";
import type { FastifyInstance } from "fastify";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { COOKIE_NAME, COOKIE_OPTIONS, generateToken } from "../utils/jwt";
import { verifyPassword } from "../utils/password";

type LoginBody = {
  email: string;
  password: string;
};

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: LoginBody }>("/login", async (request, reply) => {
    const { email, password } = request.body;

    try {
      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (!user) {
        return reply.status(401).send({ error: "Invalid credentials" });
      }

      const isValidPassword = await verifyPassword(password, user.password);

      if (!isValidPassword) {
        return reply.status(401).send({ error: "Invalid credentials" });
      }

      const token = generateToken({
        userId: user.id,
        email: user.email,
      });

      reply.setCookie(COOKIE_NAME, token, COOKIE_OPTIONS);

      return {
        user: { id: user.id, email: user.email },
        success: true,
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  });

  fastify.post("/logout", async (request, reply) => {
    reply.clearCookie(COOKIE_NAME, { path: "/" });

    return {
      success: true,
      message: "Logged out successfully",
    };
  });
}
