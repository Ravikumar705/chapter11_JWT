import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        },
        message: "Invalid email",
      },
    },
    password: { type: String, minLength: 6, required: true },
    token: { type: String },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
export { userModel };
