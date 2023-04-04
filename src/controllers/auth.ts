import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";
import Token, { IToken } from "../models/token";

async function createUser(req: Request, res: Response) {
  const user: IUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  user.password = await user.encryptPassword(user.password);

  const isEmailExist = await User.findOne({ email: req.body.email });

  if (!isEmailExist) {
    try {
      const savedUser = await user.save();

      const token: string = jwt.sign({ id: savedUser._id }, process.env.TOKEN_KEY || "TOKEN_KEY");
      res.header("auth-token", token).json(savedUser);
    } catch (error) {
      res.status(400).json({ error: { msg: "¡Este email ya se encuentra en nuestra bases de datos!" } });
    }
  } else {
    res.status(400).json({ error: { msg: "¡Este email ya se encuentra en nuestra bases de datos!" } });
  }
}

async function login(req: Request, res: Response) {
  const user = await User.findOne({ email: req.body.email });
  const isPasswordCorrect = await user?.validatePassword(req.body.password);

  if (user && isPasswordCorrect) {
    try {
      const token: string = jwt.sign({ _id: user?._id }, process.env.TOKEN_KEY as string, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      const newToken: IToken = new Token({
        token: token,
        hash_token: token,
      });

      const { hash_token } = await newToken.save();

      res.header("auth-token", hash_token).json({ msg: "¡Usuario logeado!", user });
    } catch (error) {
      res.status(401).json({ ok: false, error: { msg: "¡Credenciales invalidas!" } });
    }
  } else {
    res.status(401).json({ ok: false, error: { msg: "¡Credenciales invalidas!" } });
  }
}

async function profile(req: Request, res: Response) {
  const user = await User.findById(req.userId); // *se coloca password en 0 para que no devuelva la contraseña

  if (!user) {
    res.status(400).json({ msg: "No user found" });
  }

  try {
    res.status(200).json({ msg: user });
  } catch (error) {
    res.status(500).json({ error: "Error, no user found" });
  }
}

async function getUsers(_req: Request, res: Response) {
  const user = await User.find();

  try {
    res.status(200).json({ msg: user });
  } catch (error) {
    res.status(500).json({ error: "You can't read users" });
  }
}

export { createUser, login, profile, getUsers };
