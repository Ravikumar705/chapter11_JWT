import express from "express";
const userRouter = express.Router();
import {
  // createOneUser,
  getAllUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
} from "../Controller/user.js";

userRouter
  // .post("/", createOneUser)
  .get("/", getAllUser)
  .get("/:id", getOneUser)
  .put("/:id", updateOneUser)
  .delete("/:id", deleteOneUser);

export { userRouter };
