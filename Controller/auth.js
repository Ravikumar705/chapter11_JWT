import { userModel } from "../models/user.js";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import bcrypt from "bcrypt";
import "dotenv/config.js";

// ===========================================================================
// due __dirname support not present in es6 that's why we use below code
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// const __dirname = path.dirname(__filename); // get the name of the directory
// ============================================================================
// const privateKey = fs.readFileSync(
//   path.resolve(__dirname, "../private.key"),
//   "utf-8"
// );
// Generate privateKey
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});
// console.log(privateKey);

const signupUser = async (req, res) => {
  try {
    // HS256 ALGO DEFAULT
    // const token = jwt.sign({ email: req.body.email }, process.env.SCR_KEY);
    // RS256 ALGO
    const token = jwt.sign({ email: req.body.email }, privateKey, {
      algorithm: "RS256",
    });
    const hash = await bcrypt.hash(req.body.password, 10);
    const addUser = new userModel({ ...req.body });
    addUser.token = token;
    addUser.password = hash;
    const user = await addUser.save();
    return res.status(201).send({
      success: true,
      message: "User added successfully",
      token: user.token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server error",
      error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const getUser = await userModel.findOne({ email: req.body.email });
    // console.log(getUser);
    if (getUser) {
      const isAuth = await bcrypt.compare(req.body.password, getUser.password);
      // console.log(isAuth);
      if (isAuth) {
        // HS256 ALGO DEFAULT
        // const token = jwt.sign({ email: req.body.email }, process.env.SCR_KEY);
        // RS256 ALGO
        const token = jwt.sign({ email: req.body.email }, privateKey, {
          algorithm: "RS256",
        });
        getUser.token = token;
        const userToken = await getUser.save();
        return res.status(201).send({
          success: true,
          message: "User login successfully",
          token: userToken.token,
        });
      } else {
        return res.status(401).send({
          success: false,
          message: "unauthorized user",
        });
      }
    } else {
      return res.status(404).send({
        success: false,
        message: "user not found",
        email: req.body.email,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export { signupUser, loginUser, publicKey };
