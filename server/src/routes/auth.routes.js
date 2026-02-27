const express = require("express")
const {hendelUserRegister,hendleUserLogin } = require("../controller/auth.controller")
const router =express.Router()


router.post("/register",hendelUserRegister)
router.post("/login",hendleUserLogin)

module.exports = router