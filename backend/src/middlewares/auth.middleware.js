import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {

  //  Get token from header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized request. No token provided.");
  }

  const token = authHeader.split(" ")[1];

  //  Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token.");
  }

  //  Find user
  const user = await User.findById(decoded._id).select("-password");

  if (!user) {
    throw new ApiError(401, "User not found.");
  }

  //  Attach user to request
  req.user = user;

  next();
});