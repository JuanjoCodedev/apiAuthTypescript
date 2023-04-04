import app from "./app";
import databaseConexion from "./server/database";

import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "./../config.env") });

app.listen(process.env.PORT, () => {
  console.log(`Server running ${process.env.PORT}`);
  databaseConexion();
});
