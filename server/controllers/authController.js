import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import AppError from "../utils/Apperror.js";
import { catchAsync } from "../utils/index.js";
import jwt from "jsonwebtoken";

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new AppError("Email or password missing", 400));
  }
  const userData = await User.findOne({ where: { email } });

  if (!userData) next(new AppError("Invalid email or password", 401));

  const isPasswordMatched = await bcrypt.compare(password, userData?.password);
  if (!isPasswordMatched) {
    next(new AppError("Invalid email or password", 401));
  }

  const token = jwt.sign(
    { id: userData.id, email: userData.email, name: userData.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  res.status(200).json({
    success: true,
    data: userData,
    token,
  });
});

export const signup = catchAsync(async (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    next(new AppError("Fill all details", 400));
  }
  const userData = await User.create({ email, name, password });
  if (userData.id) {
    res.status(200).json({
      success: true,
      data: "User created succefully! please login",
    });
  }
});
