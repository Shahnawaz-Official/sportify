const express = require("express")
const {handleCreateMusic, handleCreateAlbum}  = require("../controller/music.controller")
const router = express.Router();


const multer = require("multer")

const upload = multer({storage:multer.memoryStorage()})

router.post("/upload",upload.single("music"),handleCreateMusic)
router.post("/album", handleCreateAlbum)

module.exports = router