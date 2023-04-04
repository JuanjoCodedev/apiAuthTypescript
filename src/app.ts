import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth";

const app: Application = express();

app.use(morgan("dev")); // ?Esto es un middleware

app.use(cors()); // ?Esto es un middleware

app.use(express.json()); // ?Esto es un middleware

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

export default app;
