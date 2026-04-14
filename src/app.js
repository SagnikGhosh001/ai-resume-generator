import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/deno";
import { generateResume } from "./handler.js";
import { generatePdf } from "./download/pdf.js";

export const createApp = () => {
  const app = new Hono();
  app.use(logger());

  app.post("/generate", generateResume);
  app.post("/download/pdf", generatePdf);

  app.get("/resume", serveStatic({ path: "./public/resume.html" }));
  app.get("*", serveStatic({ root: "./public" }));

  return app;
};
