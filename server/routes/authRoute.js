import express from "express";
import { login, signup } from "../controllers/authController.js";
import { checkAuth } from "../middlewares/Auth.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/check", checkAuth, (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "User logged in",
      data: req.user,
    });
  }
});

export default router;
