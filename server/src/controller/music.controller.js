const Music = require("../models/music.model");
const Album = require("../models/album.model")
const jwt = require("jsonwebtoken");
const {uploadFile} = require("../services/storage.services");

async function handleCreateMusic(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You don't have access to create music"
            });
        }

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
            artist: decoded.id
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

    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

async function handleCreateAlbum(req,res){
     const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
         if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You don't have access to create an Album"
            });
        }

        const { title,musics } = req.body;
             const album = await Album.create({
            title,
            artist: decoded.id,
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


    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}


module.exports = {
    handleCreateMusic,
     handleCreateAlbum
};