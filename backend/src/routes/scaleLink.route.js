import { Router } from "express";
import { saveScaleLink, getALlScaleLinks, activateScalelinks,getActiveLink } from "../controllers/scaleLink.controller.js";
import {isLoggedIn} from "../middleware/auth.middleware.js";

const router = Router();

router.get("/:id", getALlScaleLinks);
router.post("/save",isLoggedIn, saveScaleLink);
router.put("/update-scale-link", activateScalelinks);
router.get("/active-links/:id", getActiveLink);

export default router;