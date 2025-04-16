import { eq } from "drizzle-orm";
import type { FastifyInstance } from "fastify";
import { db } from "../db";
import { insuranceTypeEnum, offersTable, productTypeEnum } from "../db/schema";

type OfferParams = {
  id: string;
};

type OfferBody = {
  title: string;
  price: number;
  productType: (typeof productTypeEnum.enumValues)[number];
  insuranceType: (typeof insuranceTypeEnum.enumValues)[number];
};

export default async function offerRoutes(fastify: FastifyInstance) {
  fastify.get("/", {
    handler: async (_, reply) => {
      try {
        const offers = await db.select().from(offersTable);
        return { offers };
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
    config: {
      auth: true,
    },
  });

  fastify.get<{ Params: OfferParams }>("/:id", {
    handler: async (request, reply) => {
      const { id } = request.params;

      try {
        const [offer] = await db
          .select()
          .from(offersTable)
          .where(eq(offersTable.id, parseInt(id)));

        if (!offer) {
          return reply.status(404).send({ error: "Offer not found" });
        }

        return { offer };
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
    config: {
      auth: true,
    },
  });

  fastify.post<{ Body: OfferBody }>("/", {
    handler: async (request, reply) => {
      const { title, price, productType, insuranceType } = request.body;

      try {
        const [newOffer] = await db
          .insert(offersTable)
          .values({
            title,
            price,
            productType,
            insuranceType,
          })
          .returning();

        return reply.status(201).send({ offer: newOffer });
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
    config: {
      auth: true,
    },
  });

  fastify.put<{ Params: OfferParams; Body: OfferBody }>("/:id", {
    handler: async (request, reply) => {
      const { id } = request.params;
      const { title, price, productType, insuranceType } = request.body;

      try {
        const [updatedOffer] = await db
          .update(offersTable)
          .set({
            title,
            price,
            productType,
            insuranceType,
          })
          .where(eq(offersTable.id, parseInt(id)))
          .returning();

        if (!updatedOffer) {
          return reply.status(404).send({ error: "Offer not found" });
        }

        return { offer: updatedOffer };
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
    config: {
      auth: true,
    },
  });

  fastify.delete<{ Params: OfferParams }>("/:id", {
    handler: async (request, reply) => {
      const { id } = request.params;

      try {
        const [deletedOffer] = await db
          .delete(offersTable)
          .where(eq(offersTable.id, parseInt(id)))
          .returning();

        if (!deletedOffer) {
          return reply.status(404).send({ error: "Offer not found" });
        }

        return { message: "Offer deleted successfully" };
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
    config: {
      auth: true,
    },
  });
}
