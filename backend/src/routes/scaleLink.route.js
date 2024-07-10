import { Router } from "express";
import { saveScaleLink } from "../controllers/scaleLink.controller.js";
import {isLoggedIn} from "../middleware/auth.middleware.js";

const router = Router();

router.post("/save", saveScaleLink);

export default router;