const express = require("express")
const {hendelUserRegister,hendleUserLogin,userLoguot } = require("../controller/auth.controller")
const router =express.Router()


router.post("/register",hendelUserRegister)
router.post("/login",hendleUserLogin)
router.post("/logout",userLoguot)

module.exports = router