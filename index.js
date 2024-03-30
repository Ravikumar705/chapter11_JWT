import express from "express";
import "dotenv/config";
import { DbConnection } from "./config/Db.js";
import { userRouter } from "./routers/user.js";
import { authRouter } from "./routers/auth.js";
import { productRouter } from "./routers/product.js";
import { publicKey } from "./Controller/auth.js";
// import crypto from "crypto";
// import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
const server = express();

// ===========================================================================
// due __dirname support not present in es6 that's why we use below code
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
// ============================================================================

// database connection
DbConnection();

//middleware
// user define middleware
// const publicKey = fs.readFileSync(
//   path.resolve(__dirname, "./public.key"),
//   "utf-8"
// );

// console.log(publicKey);
// const { publicKey } = crypto.generateKeyPairSync("rsa", {
//   modulusLength: 2048,
//   publicKeyEncoding: { type: "spki", format: "pem" },
// });
// console.log(publicKey);
const Auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    // const decoded = jwt.verify(token, process.env.SCR_KEY);
    const decoded = jwt.verify(token, publicKey);
    // console.log(decoded);
    if (decoded.email) {
      next();
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    return res.sendStatus(401);
  }
};

//built in middleware
server.use(express.json());
server.use(express.urlencoded());

//router based middleware
server
  .use("/products", Auth, productRouter)
  .use("/users", Auth, userRouter)
  .use("/auth", authRouter);

server.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.PORT}`);
});
