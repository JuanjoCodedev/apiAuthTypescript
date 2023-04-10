import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth";
import { whitelist, corsOptions } from "./libs/configCors";

const app: Application = express();

app.use(morgan("dev")); // ?Esto es un middleware

app.use(cors({ origin: whitelist })); // ?Esto es un middleware

app.use(express.json()); // ?Esto es un middleware

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", cors(corsOptions), authRoutes, (_req: Request, res: Response) => {
  res.status(200).json({ msg: "¡Acceso permitido por CORS!" });
});

export default app;
