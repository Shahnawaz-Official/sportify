const express = require("express")
const {handleCreateMusic, handleCreateAlbum,getAllMusics,getAllAlbums,getAlbumsById}  = require("../controller/music.controller")
const {authArtistMiddleware,authUser} = require("../middleware/auth.middleware")




const router = express.Router();


const multer = require("multer")

const upload = multer({storage:multer.memoryStorage()})

router.post("/upload",authArtistMiddleware,upload.single("music"),handleCreateMusic)
router.post("/album",authArtistMiddleware, handleCreateAlbum)

router.get("/",authUser,getAllMusics)
router.get("/albums",authUser,getAllAlbums)
router.get("/albums/:albumid",authUser,getAlbumsById)

module.exports = router