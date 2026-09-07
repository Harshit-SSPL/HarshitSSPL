import { createServer } from "node:http";
import { httpServerHandler } from "cloudflare:node";
import app from "./app.js";

const server = createServer(app);
const handler = httpServerHandler(server);

export default {
  async fetch(request, env, ctx) {
    if (env && typeof env === "object") {
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
    }
    return handler.fetch(request, env, ctx);
  },
};

