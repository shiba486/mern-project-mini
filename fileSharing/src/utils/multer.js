import multer from "multer";
import path from "path"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {cb(null, 'uploads/')},

    filename: function (req, file, cb) {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
      cb(null, uniqueName)
    }
  })
  
  export const upload = multer({ storage,
    limits:{fileSize: 1000000 * 100}
   }).single('myfile')

   