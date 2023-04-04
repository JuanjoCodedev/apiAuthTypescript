import { Router } from "express";
import { createUser, getUsers, login, profile } from "../controllers/auth";
import { tokenValidation } from "../libs/verifyToken";

const router: Router = Router();

router.get("/", (_req, res) => {
  res.send("Hello world with Typescript");
});

router.post("/createUser", createUser);

router.post("/login", login);

router.get("/profile", tokenValidation, profile);

router.get("/getUsers", tokenValidation, getUsers);

export default router;
