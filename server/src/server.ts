import "./lib/dayjs";

import cors from "@fastify/cors";
import fastify from "fastify";

import { setupRoutes } from "./routes";

const app = fastify();

app.register(cors);
app.register(setupRoutes);

const PORT = 3333;

app.listen({ port: PORT }, () => console.log("Server running on port:", PORT));
