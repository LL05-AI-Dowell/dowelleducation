import { Router } from "express";
import healtcheckRoutes from './healthcheck.route.js'
import authRoutes from './auth.route.js'
import linkRoutes from './link.route.js'
import ScaleLinkRoutes from './scaleLink.route.js'

 
const router = Router()


router.use("/healtcheckup", healtcheckRoutes)
router.use("/auth", authRoutes)
router.use("/link", linkRoutes)
router.use("/scale-link", ScaleLinkRoutes)

export default router