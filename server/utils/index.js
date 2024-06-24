import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "reactflow",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

export const catchAsync = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch((err) => {
      return next(err);
    });
  };
};
