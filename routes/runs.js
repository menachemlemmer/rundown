const express = require("express");
const router = express.Router();
const runCtrl = require("../controllers/runs");

router.get("/", runCtrl.index);

router.get("/new", runCtrl.new);

router.post("/", runCtrl.create);

router.get("/:runId", runCtrl.show);

router.delete("/:runId", runCtrl.delete);

module.exports = router;
