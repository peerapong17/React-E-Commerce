import User from "../models/user.js";
import bcrypt from "bcrypt";
import { stripe } from "../utils/stripe.js";
import JWT from "jsonwebtoken";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      // res.status(404).json({
      //   message: "User not found",
      // });
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // res.status(400).json({
      //   message: "Password is not correct",
      // });
      throw new Error("Password is not correct");
    }

    const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        stripeCustomerId: user.stripeCustomerId,
      },
      message: "Login success",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const exisingUser = await User.find({ email });

    if (exisingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = await stripe.customers.create(
      {
        email,
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );

    const newUser = new User({
      email,
      password: hashedPassword,
      stripeCustomerId: newCustomer.id,
    });

    await newUser.save();

    res.status(200).json({
      user: {
        id: newUser.id,
        email: newUser.email,
      },
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      throw new Error("User not found");
    }

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        stripeCustomerId: user.stripeCustomerId,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// const logout = (req, res) => {
//   try {
//     req.logout();
//     res.status(200).json({ message: "User logs out successfully" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

export { login, register, profile };
