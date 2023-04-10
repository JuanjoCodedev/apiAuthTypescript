import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";
import Token from "../models/token";

interface IPayload {
  _id: string;
  iat: number;
  exp: number;
}

export const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      const token = req.headers.authorization.split(" ")[1]; // *Obtenemos el token del header

      const findToken = await Token.findOne({ hash_token: token });

      if (!findToken) {
        return res.status(500).json({ msg: "token invalid" });
      }

      const decoded = jwt.verify(findToken.token, process.env.TOKEN_KEY as string) as IPayload; // *Verificamos el token

      const userById = await User.findById(decoded._id).select("id"); // *Obtenemos el token del usuario

      req.userId = userById?.id;

      return next();
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  } else {
    res.status(500).json({ msg: "token invalid" });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { rol }: IUser = req.body;

  if (rol === "ordinario") {
    res.status(401).json({
      ok: false,
      error: {
        message: "¡Acceso denegado! No tiene permiso de ingresar aqui",
      },
    });
  }
  next();
};
