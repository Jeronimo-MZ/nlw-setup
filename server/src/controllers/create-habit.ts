import dayjs from "dayjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { prisma } from "@/database/prisma";

export class CreateHabitController {
  async execute(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const validator = z.object({
        title: z.string(),
        weekDays: z.array(z.number().min(0).max(6)).min(1),
      });
      const { title, weekDays } = validator.parse(request.body);
      const today = dayjs().startOf("day").toDate();
      await prisma.habit.create({
        data: {
          title,
          created_at: today,
          HabitWeekDays: {
            create: weekDays.map(weekDay => ({ week_day: weekDay })),
          },
        },
      });
    } catch (error) {
      const errorJson = JSON.stringify(error);
      if (error instanceof z.ZodError) return reply.status(400).send(errorJson);
      else return reply.status(500).send(errorJson);
    }
  }
}
