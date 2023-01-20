import fastify from "fastify";

import { prisma } from "@/database/prisma";

const app = fastify();
const PORT = 3333;

app.get("/habits", async () => {
  return prisma.habit.findMany();
});

app.post<{ Body: { title: string } }>("/habits", async (request, reply) => {
  const { title } = request.body;
  if (!title) return reply.code(400).send({ error: "O título é obrigatório" });
  const habit = await prisma.habit.create({
    data: {
      title,
    },
  });
  return habit;
});

app.listen({ port: PORT }, () => console.log("Server running on port:", PORT));
