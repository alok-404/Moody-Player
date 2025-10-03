const express = require('express')
const multer = require("multer")
const uploadFile = require("../service/storage.service")
const router = express.Router() //ise hum api creates krenge 
const songModel = require("../models/song.model")

const upload = multer({storage:multer.memoryStorage()});  //MIDDLEWARE
//form-data formate ko read krh shkte hai ab
//multer temporary apke ram ya memory storage pe save krega apki file ko 

//upload.single("audio") iss line se middle wear use kra hai...
//agar multiple file hai toh upload.array("audio") 


router.post('/songs',upload.single("audio"),async (req,res)=>{

    console.log(req.body);//title and aitst ka data[text formate]
    console.log(req.file);//file means song ka data , buffer is actual data
    const fileData = await uploadFile(req.file)
    // console.log(fileData);

    const song = await songModel.create({
        title:req.body.title,
        artist:req.body.artist,
        audio:fileData.url,
        mood:req.body.mood
    })

    
    res.status(201).json({
        message:'Song Created Successfully',
        // song:req.body // 
        song:song // ise direct detail ajayega uper ki 
    })

    //undefined ayega jb ap postman se data bhejoge kykoki miidleware chiaye but humne app.js mn middle ware lgaya hai [...app.use(express.json())...] but work nahi krega ye kyoki ye tb use hota hai jb body ke ander -> 'raw' formate mn data send krta hoo tb abhi hum 'form-data' ka use krh rhe hai kyoki for files + text backennd mn use krne ke liye hum isi ka use krte hai ...
    //isi liye we use another middleware whose name is "MULTER"
    //Multer is alg se package we need to install it first ..
    //step 1 => npm i multer
    //step 2 => server again start"npx nodemon server.js'
    //step 3 => require[const multer = require("multer")] 1st line pe
    //step 4 => [const upload = multer({storage:multer.memoryStorage()});] 

})

// buffer is actual file ka data


router.get("/songs" , async (req , res)=>{
    const {mood} = req.query ; //asum = mood = neutral

    const songs = await songModel.find({
        mood:mood 

            // mood:"neutral" //query = aap hume sare songs lake do jinka mood neutralhai
    })
    
            res.status(200).json({
                message:"Songs fetched successfully",
                songs
            })
})








module.exports = router