const express = require("express");

// controller functions
const { eventhandler } = require("../controllers/adminEventController.js");

const router = express.Router();

// login route
router.post("/", eventhandler);

module.exports = router;
