import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/deno";
import { downlaodResume } from "./handler.js";

export const createApp = () => {
  const app = new Hono();
  app.use(logger());

  app.onError((err, c) => {
    console.error(`${err}`);
    return c.text("Internal Server Error", 500);
  });

  app.post("/download", downlaodResume);
  app.get("*", serveStatic({ root: "./public" }));
  return app;
};
