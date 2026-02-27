const {ImageKit} = require("@imagekit/nodejs")

const imageKitClient  = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
})