const whitelist = [
  "http://localhost:4000/api/auth/login",
  "http://localhost:4000/api/auth/createUser",
  "http://localhost:4000/api/auth/profile",
];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || whitelist.includes(origin)) {
      return callback(null, origin);
    }
    return callback("¡Acceso denegado por CORS!");
  },
  credentials: true,
};

export { whitelist, corsOptions };
