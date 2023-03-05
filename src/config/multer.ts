const multer = require("multer"); 
const path = require('path');
const fs = require('fs');
const util = require('util');

// Upload external file================
let storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync( 'uploads')) {
        fs.mkdirSync( 'uploads');
    }
    cb(null,  'uploads');
  },
  filename: (req, file, cb) => {
    var fileName = path.basename(file.originalname,path.extname(file.originalname));
    req.body.file_name_org = fileName+ '' + path.extname(file.originalname);
    req.body.file_name_server = fileName+ '' + path.extname(file.originalname);
    cb(null, fileName+ '' + path.extname(file.originalname));
  },
});

let uploadFile = multer({
  storage: storageImage,
}).single("file");

export const  uploadImage = util.promisify(uploadFile);




