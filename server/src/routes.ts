import { FastifyInstance } from "fastify";

import { prisma } from "@/database/prisma";

import { CreateHabitController } from "./controllers/create-habit";

export async function setupRoutes(app: FastifyInstance): Promise<void> {
  app.get("/habits", async () => {
    return prisma.habit.findMany();
  });

  app.post("/habits", new CreateHabitController().execute);
}
