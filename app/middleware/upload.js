const multer = require("multer");
const path = require('path');

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")){
        cb(null, true);
    } else {
        cb("please upload only images.", false);
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${Date.now()}-istar-${file.originalname}`);
    },
});

var upload = multer({ storage: storage, fileFilter: imageFilter });
module.exports = upload;