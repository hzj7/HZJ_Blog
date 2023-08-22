const express = require('express');
const multer = require("multer");
const apiJSON = require("../utils/jsonCreator");

let { successJSON, errorJSON } = apiJSON()
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })

router.post('/uploadFile', upload.single('file'), function (req, res, next) {
    const file = req.file
    res.json(successJSON("图片已上传",file.filename))
})

module.exports = router;