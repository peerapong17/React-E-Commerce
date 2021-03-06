import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    stripeCustomerId: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", User);
