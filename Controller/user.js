import { userModel } from "../models/user.js";
import "dotenv/config.js";

const getAllUser = async (req, res) => {
  try {
    const allUser = await userModel.find({});
    return res.status(200).send({
      success: true,
      message: "Users get successfully",
      allUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server error",
      error,
    });
  }
};
const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const oneUser = await userModel.findById(id);
    return res.status(201).send({
      success: true,
      message: "User get successfully",
      oneUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server error",
      error,
    });
  }
};
const updateOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateOneUser = await userModel.findByIdAndUpdate(id, {
      ...req.body,
    });
    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      updateOneUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server error",
      error,
    });
  }
};

const deleteOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const DeleteOneUser = await userModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
      DeleteOneUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export { getAllUser, getOneUser, updateOneUser, deleteOneUser };
