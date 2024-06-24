import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/index.js";
import { User } from "../models/User.js";
import AppError from "../utils/Apperror.js";

export const checkAuth = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in or token provided is wrong", 401)
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  console.log(decoded);

  const user = await User.findOne({ where: { id: decoded.id } });

  if (!user) {
    return next(
      new AppError("User belonging to this token does no longer exist", 401)
    );
  }

  req.user = User;
  res.locals.user = User;
  next();
});
