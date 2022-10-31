import { Express, Router } from "express";

export default async (app: Express): Promise<void> => {
  const router = Router();
  app.use("/api", router);
  (await import(`../routes/login-routes`)).default(router);
};
