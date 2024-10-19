const mongoose = require('mongoose');

const connectDB = async ()=>{
    console.log(process.env.URL, process.env.JWT_SECRET)
    try{
        await mongoose.connect(process.env.URL);
          console.log('Mongo connected ');
    }catch(err){
        console.log('Mongo conn error',err);
        process.exit(1);
    }
}

module.exports = connectDB; 