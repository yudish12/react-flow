import { DataTypes } from "sequelize";
import { sequelize } from "../utils/index.js";
import bcrypt from "bcrypt";
import AppError from "../utils/Apperror.js";

export const User = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: "Validation error:This email is already taken.",
      },
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isPassword(value) {
          const regexp =
            /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/;
          if (!regexp.test(value)) {
            throw new AppError(
              "Password must contain at least 8 characters, including at least one letter, one number and one uppercase character",
              403
            );
          }
        },
      },
    },
  },
  {
    hooks: {
      afterValidate(user, options) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(user.password, salt);
        user.password = hashedPassword;
      },
    },
  }
);

/*
2 users with these credentials are already there
email-yudishchakrawarty3042@gmail.com
password-A1b2C3d4

email-yudi@gmail.com 
password-Testing1234
*/
