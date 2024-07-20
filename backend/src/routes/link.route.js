import { Router } from "express";
import {
    createLink,getLink,deleteLink
} from "../controllers/link.controller.js";
const router = Router();

router.post("/generate-link", createLink);
router.get("/:workspaceId", getLink);
router.delete("/:workspaceId",deleteLink)

export default router;
