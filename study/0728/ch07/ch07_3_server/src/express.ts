import express from "express";
import cors from "cors";
import { getPublicDirPath } from "./config";
import { setupRouters } from "./routers/index";
import type { MongoDB } from "./mongodb";

export const createExpressApp = (db: MongoDB) => {
  const app = express();
  app.use(express.static(getPublicDirPath()));
  app.use(express.json());
  app.use(cors());
  app.get("/", (req, res) => res.json({ message: "Hello world!" }));
  setupRouters(app, db);
  return app;
};
