import multer from "multer";

const storage = multer.diskStorage( // here we use diskStorage because file can be big but we can use other option ,read document 
    {
        // cb means callback
        destination:function(req,file,cb){
                cb(null,"./public/temp")
        },
        filename: function (req,file,cb){
            cb(null,file.originalname) //original name means file name given by user 
            // avoid givin originalname ,user can upload many file with same name
            // add time stamp in name to give uniquenese
        }
    }
)

export const upload = multer({
    storage,   //same as storage:storage
})  