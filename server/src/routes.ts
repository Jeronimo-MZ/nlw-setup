import { FastifyInstance } from "fastify";

import { prisma } from "@/database/prisma";

import { CreateHabitController } from "./controllers/create-habit";
import { GetDayHabitsController } from "./controllers/get-day-habits";

export async function setupRoutes(app: FastifyInstance): Promise<void> {
  app.get("/habits", async () => {
    return prisma.habit.findMany();
  });

  app.post("/habits", new CreateHabitController().execute);
  app.get("/day", new GetDayHabitsController().execute);
}
