const express = require("express");
const router = express.Router();
const runCtrl = require("../controllers/runs");

router.get("/", runCtrl.index);

module.exports = router;
