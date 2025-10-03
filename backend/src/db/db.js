const mongoose = require('mongoose')

function connectDB(){


        // Extra for notes :== jis bhe bande ke pass niche diye gaye url ka access hoga wo mere database se eadily connect krh payega... And hum jb ise github pe push krenge toh koi bhe easily access krh lega toh ise bachne ke liye we use a new file [name = .env] url ya password we called these crediential things
        

    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log('Connected to DB');
    }).catch((err)=>{
        console.error('Error connecting to MOngoDB:' , err);
        
    })

}

module.exports = connectDB;