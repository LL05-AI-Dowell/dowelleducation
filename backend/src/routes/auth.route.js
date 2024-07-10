import { Router } from "express";
import {
  login,logout,getUserDetails
} from "../controllers/auth.controller.js";
import {isLoggedIn} from "../middleware/auth.middleware.js";

const router = Router();

router.post("/login", login);
router.get("/logout",isLoggedIn, logout);
router.get("/user-details", isLoggedIn,getUserDetails);

export default router;
