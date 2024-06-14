const express = require("express");
const router = express.Router();
const runCtrl = require("../controllers/runs");

router.get("/", runCtrl.index);

router.get("/new", runCtrl.new);

router.post("/", runCtrl.create);

module.exports = router;
