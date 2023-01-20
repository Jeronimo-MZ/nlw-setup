import dayjs from "dayjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { prisma } from "@/database/prisma";

export class GetDayHabitsController {
  async execute(request: FastifyRequest, reply: FastifyReply): Promise<any> {
    try {
      const validator = z.object({
        date: z.date({ coerce: true }),
      });
      const { date } = validator.parse(request.query);
      const weekDay = dayjs(date).get("day");
      const possibleHabits = await prisma.habit.findMany({
        where: {
          created_at: {
            lte: date,
          },
          HabitWeekDays: {
            some: {
              week_day: weekDay,
            },
          },
        },
      });
      const day = await prisma.day.findUnique({
        where: { date: dayjs(date).startOf("day").toDate() },
        include: { DayHabit: true },
      });
      const completedHabits = day?.DayHabit.map(dayHabit => dayHabit.habit_id) ?? [];
      return {
        possibleHabits,
        completedHabits,
      };
    } catch (error) {
      const errorJson = JSON.stringify(error);
      if (error instanceof z.ZodError) return reply.status(400).send(errorJson);
      else return reply.status(500).send(errorJson);
    }
  }
}
