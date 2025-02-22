import express from "express";

// controller functions
import { eventhandler } from "../controllers/eventController.js";

const router = express.Router();

// login route
router.post("/", eventhandler);

export default router;
