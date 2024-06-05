const multer = require('multer')
const imagekit = require('../config/imagekit.js')

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage, 
    limits: {fileSize: 10*1024*1024},
    fileFilter: (req, file, cb) => {
        checkFileTpye(file,cb)
    },
}).single('file')


function checkFileTpye(file, cb) {
    const filetypes = /jpeg|jpg|png/
    const extname = filetypes.test(file.originalname.toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

   if (mimetype && extname) {
    return cb(null, true)
   } else {
    cb('Error: Images only!')
   }
}

module.exports = upload