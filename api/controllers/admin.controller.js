import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js"; 
import { errorHandler } from "../utils/error.js";
import { User } from "../models/user.model.js";
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
      { expiresIn: "1h" }
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


export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, "-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
}

export const adminUpdatingUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { userName, email } = req.body;
        
        const updateUser = await User.findByIdAndUpdate(
            userId,
            {userName, email},
            {new : true}
        )
        
        if (!updateUser) {
            return res.status(401).json({message: "updating failed" })
        }
        
        return res.json(updateUser)

    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });

    }
}

export const adminDeleteUser = async (req, res, next) => {
    try {
        const {id} = req.params

        await User.findByIdAndDelete({_id : id})

        return res.status(200).json({message: "user Deleted" })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const adminAddUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "The email is already taken" });
        }

        // Hash the password synchronously
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create new user
        const newUser = new User({
            userName: name,
            email,
            password: hashedPassword, // Store hashed password
        });

        await newUser.save();

        return res.status(201).json({
            message: "New user added successfully",
            user: { id: newUser._id, name: newUser.userName, email: newUser.email } // Do not send password
        });

    } catch (error) {
        console.error("User creation failed:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
};


export const adminLogout = async (req,res)=> {
    try {
        res.clearCookie('adminToken')
        return res.status(200).json({message:"Logout Success"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal Servor Error'})
    }
}