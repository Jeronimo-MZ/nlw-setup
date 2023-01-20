import fastify from "fastify";

const app = fastify();
const PORT = 3333;

app.get("/hello", () => {
  return {
    hello: "world",
  };
});

app.listen({ port: PORT }, () => console.log("Server running on port:", PORT));
