import cors from "cors";
import express, { Request, Response } from "express";
import { apolloServer } from "./apollo/server";
import { PORT } from "./config";
import { rates } from "./dummy";

async function start() {
  const app = express();
  app.use(cors());

  // I am similating to the rates endpoint in the original code, but I am not using the rates endpoint in the original code.
  app.get("/rates", (req: Request, res: Response) => {
    const from = String(req.query.from || "ZAR").toUpperCase();
    const to = String(req.query.to || "USD").toUpperCase();

    const rate = rates[`${from}_${to}`] || 1;
    res.json({ from, to, rate, timestamp: Date.now() });
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql", cors: false });

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
  });
}
start().catch((err) => console.error(err));
