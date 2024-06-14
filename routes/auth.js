const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");

router.get("/sign-up", authCtrl.getSignUp);

router.get("/sign-in", authCtrl.getSignIn);

router.get("/sign-out", authCtrl.signOut);

router.post("/sign-up", authCtrl.signUp);

router.post("/sign-in", authCtrl.signIn);

module.exports = router;
