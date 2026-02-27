const User = require("../models/user.model")
const jwt = require("jsonwebtoken")

const bcrypt = require("bcryptjs")


const hendelUserRegister = async (req, res) => {
    const { userName, email, password, role = "user" } = req.body;
    //    find the user 
    const isUserAlreadyExists = await User.findOne({
        $or: [
            { userName },
            { email }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({ message: "User Already Exists" })
    }

    // hash Password

    const hash = await bcrypt.hash(password, 10)


    // user create
    const user = await User.create({
        userName,
        email,
        password:hash, // pass save db  password ,
        role
    })

    // token create
    const token = jwt.sign({
        id: (user)._id,
        role: user.role
    }, process.env.JWT_SECRET_KEY)
    // set cookie user device
    res.cookie("token", token)

    res.status(201).json({
        message: "User Register Successfully",
        user: {
            id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role
        }
    })
}


async function hendleUserLogin(req, res) {
    const { userName, email, password } = req.body;

    const user = await User.findOne({
        $or: [
            { userName }, { email }
        ]
    })

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }
    // check password hash hei ki nahi 
    const ispasswordvalid = await bcrypt.compare(password, user.password)
    // const ispasswordvalid = user.password;
    if (!ispasswordvalid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({
        id :user._id,
        role:user.role,
    },process.env.JWT_SECRET_KEY)

    res.cookie("token",token)

    res.status(200).json({
        message:"Login Successfully",
        user:{
            id:user._id,
            userName:user.userName,
            email:user.email,
            role:user.role
        }
    })
}





module.exports = {
    hendelUserRegister,
    hendleUserLogin,
}