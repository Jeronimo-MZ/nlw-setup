import dayjs from "dayjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { prisma } from "@/database/prisma";

export class ToggleHabitStatusController {
  async execute(request: FastifyRequest, reply: FastifyReply): Promise<any> {
    try {
      const validator = z.object({
        id: z.string().uuid(),
      });
      const { id } = validator.parse(request.params);
      const day = await getDay();
      const dayHabit = await getDayHabit(day.id, id);
      const data = { day_id: day.id, habit_id: id };
      if (!dayHabit) {
        await prisma.dayHabit.create({ data });
      } else {
        await prisma.dayHabit.delete({ where: { day_id_habit_id: data } });
      }
    } catch (error) {
      const errorJson = JSON.stringify(error);
      console.log(error);
      if (error instanceof z.ZodError) return reply.status(400).send(errorJson);
      else return reply.status(500).send(errorJson);
    }
  }
}

const getDay = async () => {
  const today = dayjs().startOf("day").toDate();
  const day = await prisma.day.findUnique({ where: { date: today } });
  if (!day) {
    return await prisma.day.create({ data: { date: today } });
  }
  return day;
};

const getDayHabit = async (dayId: string, id: string) =>
  await prisma.dayHabit.findUnique({
    where: {
      day_id_habit_id: {
        day_id: dayId,
        habit_id: id,
      },
    },
  });
