import express from "express";
import {
  createOneProduct,
  getAllProduct,
  getOneProduct,
  updateOneProduct,
  deleteOneProduct,
} from "../Controller/product.js";
const productRouter = express.Router();

productRouter
  .post("/", createOneProduct)
  .get("/", getAllProduct)
  .get("/:id", getOneProduct)
  .put("/:id", updateOneProduct)
  .delete("/:id", deleteOneProduct);

export { productRouter };
