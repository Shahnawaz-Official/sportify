const jwt = require("jsonwebtoken")

async function authArtistMiddleware(req, res, next) {
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
        // create user 
        req.user = decoded;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}


async function authUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (decoded.role !== "user") {
            return res.status(403).json({
                message: "You don't have access to create music"
            });
        }
        //  jo vi decoded ka value hei us ko user me set kar denge
        req.user = decoded;
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = {
    authArtistMiddleware,
    authUser
}