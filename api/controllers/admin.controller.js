import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js"; 
import { errorHandler } from "../utils/error.js";
import  User  from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("Received login request:", { email });

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return next(errorHandler(404, "Admin not found"));
    }

    console.log('passwodr', password);
    

    const isPasswordValid = await password === admin.password

    console.log('isPasswordValid', isPasswordValid);
    
    if (!isPasswordValid) {
      return next(errorHandler(401, "Invalid credentials"));
    }

    console.log("Password validation successful");

    const token = jwt.sign(
      { id: admin._id, isAdmin: true },
      process.env.JWT_SECRET,
    );

    console.log("Generated Token:", token);

    res.cookie("adminToken", token, {
      httpOnly: true,
      maxAge: 3600000, 
    });

    res.status(200).json({ message: "Admin logged in successfully", admin });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};