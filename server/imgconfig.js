import moment from "moment";
import path from "path";
import {diskStorage} from "multer";

const storage = diskStorage({
    destination: "./upload",
    filename: (req, file, cb) =>{
        cb(null, moment().unix() + path.extname(file.originalname));
    }
});

export default storage;