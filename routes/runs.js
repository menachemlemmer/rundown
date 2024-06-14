const express = require("express");
const router = express.Router();
const runCtrl = require("../controllers/runs");

router.get("/", runCtrl.index);

router.get("/new", runCtrl.new);

router.post("/", runCtrl.create);

router.get("/:runId", runCtrl.show);

router.delete("/:runId", runCtrl.delete);

router.get("/:runId/edit", runCtrl.edit);

router.put("/:runId", runCtrl.update);

module.exports = router;
