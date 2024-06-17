const express = require("express");
const router = express.Router();
const settingCtrl = require("../controllers/settings");

router.get("/", settingCtrl.index);

router.post("/", settingCtrl.create);

module.exports = router;
