import { productModel } from "../models/product.js";

const createOneProduct = async (req, res) => {
  try {
    const addProduct = new productModel({ ...req.body });
    await addProduct.save();
    return res.status(201).send({
      success: true,
      message: "product added successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server error",
      error,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const allProduct = await productModel.find({});
    return res.status(200).send({
      success: true,
      message: "products get successfully",
      allProduct,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server error",
      error,
    });
  }
};
const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const oneProduct = await productModel.findById(id);
    return res.status(201).send({
      success: true,
      message: "product get successfully",
      oneProduct,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server error",
      error,
    });
  }
};
const updateOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateOneProduct = await productModel.findByIdAndUpdate(id, {
      ...req.body,
    });
    return res.status(200).send({
      success: true,
      message: "product updated successfully",
      updateOneProduct,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server error",
      error,
    });
  }
};

const deleteOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const DeleteOneProduct = await productModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "product deleted successfully",
      DeleteOneProduct,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export {
  createOneProduct,
  getAllProduct,
  getOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
