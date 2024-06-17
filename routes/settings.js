const express = require("express");
const router = express.Router();
const settingCtrl = require("../controllers/settings");

router.get("/", settingCtrl.index);

router.put("/", settingCtrl.update);

module.exports = router;
