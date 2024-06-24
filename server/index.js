import express from "express";
import cors from "cors";
import "dotenv/config";
import { sequelize } from "./utils/index.js";
import AppError from "./utils/Apperror.js";
import { globalErrorHandler } from "./middlewares/Error.js";
import authRoute from "./routes/authRoute.js";
import flowRoute from "./routes/flowRoute.js";

const app = express();

const port = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync();
    console.log("Database Connected Successfully");
  })
  .catch((err) => console.log(`database connection failed:${err}`));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/flow", flowRoute);

app.all("*", (req, res, next) => {
  //AppError class for error handler object
  next(new AppError(`Cannot find route ${req.originalUrl} in the server`, 404));
});

//error middle ware whenever first arg is err object it is error middleware
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log("Server is running on port 5000");
});
