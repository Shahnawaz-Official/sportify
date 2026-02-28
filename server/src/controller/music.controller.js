const Music = require("../models/music.model");
const Album = require("../models/album.model")
const jwt = require("jsonwebtoken");
const {uploadFile} = require("../services/storage.services");

async function handleCreateMusic(req, res) {

        const { title } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: "Music file is required"
            });
        }

        const result = await uploadFile(
            file.buffer.toString("base64")
        );

        const music = await Music.create({
            uri: result.url,
            title,
            artist: req.user.id
        });

        return res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        });

}

async function handleCreateAlbum(req,res){
        const { title,musics } = req.body;
             const album = await Album.create({
            title,
            artist: req.user.id,
            musics:musics,
        });
          return res.status(201).json({
            message: "Album created successfully",
            music: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics:album.musics
            }
        });
}


async function getAllMusics (req,res){
                // populate method kiya karta hei refrance and populate se artist ki detail vi aa jaegi
                // jis ka vi id aa rha hei na us detail la ke rakh deta hei
    // const musics = await Music.find().populate("artist")
    const musics = await Music.find()
    .skip(1) // is ka matlab hei ki pahle music skip kar do us ke ba le jao data
    .limit(3)// limit ye btata hei ki ek bar me client pe kiyna deta vejo ge
    res.status(200).json({
        message:"Music Fatch SuccessFully",
        musics : musics
    })
}


async function getAllAlbums(req,res){
    const albums = await Album.find().select("title artist").populate("artist","userName email")
    res.status(200).json({
        message:"Albums Fatch SuccessFully",
        albums : albums
    })
}

async function getAlbumsById (req,res){
    const albumId = req.params.albumid
    const album = await Album.findById(albumId).populate("artist","userName email").populate("musics")
    return res.status(200).json({
        message:"Album Fatched Successfully",
        album:album
    })
    
    
}



module.exports = {
    handleCreateMusic,
     handleCreateAlbum,
     getAllMusics,
     getAllAlbums,
     getAlbumsById,
     
};