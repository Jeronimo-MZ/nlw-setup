import { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/database/prisma";

export class GetSummaryController {
  async execute(request: FastifyRequest, reply: FastifyReply): Promise<Summary> {
    try {
      const summary: Summary = await prisma.$queryRaw`
        SELECT
        D.id, 
        D.date,
        (
            SELECT CAST(COUNT(*) AS FLOAT)
            FROM day_habits DH
            WHERE DH.day_id = D.id
        ) as completed,
        (
            SELECT CAST(COUNT(*) AS FLOAT)
            FROM habits H
            JOIN habit_week_days HWD
              ON H.id = HWD.habit_id
            WHERE  
              HWD.week_day = cast(strftime('%w',D.date/1000.0, 'unixepoch', 'localtime') as int)
              AND 
              H.created_at <= D.date
        ) as amount
        FROM days as D;
      `;
      return summary;
    } catch (error) {
      console.error(error);
      return reply.status(500).send(error);
    }
  }
}

type Summary = Array<{
  id: string;
  date: Date;
  completed: number;
  amount: number;
}>;
