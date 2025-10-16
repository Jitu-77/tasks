import multer from "multer";
import path from "path";
// Resolve current working directory
const __dirname = path.resolve();

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"./public"))
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
export const uploadFile = multer({storage:storage})