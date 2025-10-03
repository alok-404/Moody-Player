// import ImageKit from "imagekit";

// or

const ImageKit = require("imagekit");
const { default: mongoose } = require("mongoose");

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY ,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});


function uploadFile(file){

//promise create isliye because we dont know ki hmre server se imagekit ke server tk file ko pauchne mn kitna time lagega
//if file uoloaded we call resolve
//if file not uploaded we call reject for error

    return new Promise((resolve,reject) => {
        imagekit.upload({
            file:file.buffer,
            // fileName:Math.random().toString(36).substring(10), //we can use nanoID , mongooose and diff methods
            fileName:new mongoose.Types.ObjectId().toString(), //we generate this by mongoose
            folder:"Moody-player-songs"
        },(error,result)=>{
            if(error){
                reject(error);
            }else{
                resolve(result);
            }
        })
    });

}

module.exports = uploadFile