import { Router } from "express";
import {
    createLink,getLink
} from "../controllers/link.controller.js";
const router = Router();

router.post("/generate-link", createLink);
router.get("/:workspaceId", getLink);

export default router;
