const Music = require("../models/music.model")
const jwt = require("jsonwebtoken")

async function hendleCreateMusic (req,res){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unautorized"})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(decoded.role !== "artist"){
            return res.status(403).json({message: "You don`t have access to create an music"})
        }
    } catch (error) {
        return res.status(401).json({message:"Unautorized"})
    }

    const {title} = req.body;
    const music = req.file;




}