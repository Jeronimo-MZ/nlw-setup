import fastify from "fastify";

import { setupRoutes } from "./routes";

const app = fastify();

app.register(setupRoutes);

const PORT = 3333;

app.listen({ port: PORT }, () => console.log("Server running on port:", PORT));
