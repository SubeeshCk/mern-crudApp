import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return next(errorHandler(401, "Access Denied: No Token Provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(errorHandler(403, "Invalid Token"));
    }

    if (!decoded.isAdmin) {
      return next(errorHandler(403, "Access Denied: Not an Admin"));
    }

    req.admin = decoded;
    next();
  });
};
