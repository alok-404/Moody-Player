const express = require("express");
const songRoute = require("./routes/song.routes")
const cors = require('cors')

const app = express(); 
  //Server Create
app.use(cors({
  origin: "https://moodsongs.vercel.app/", // ya jo bhi frontend ka URL hai
}));

app.use(express.json()) // middleware


// ab hota ky hai song.routes pe jo hum api use krne wale hai wo by default express nahi pechan pata hai iske liye hum app.js mn express ko batate hai ki bhyii jo hum api use krh rahein hai song.route mn wo tum use krh shkte ho ...thats it...

app.use('/', songRoute);


module.exports = app;
