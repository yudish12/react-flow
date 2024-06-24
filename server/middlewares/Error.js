export const globalErrorHandler = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.code || 500;
  err.status = err.status || "error";

  if (err.message.split(":")[0] === "Validation error") {
    err.statusCode = 403;
  }

  return res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
  });
};
