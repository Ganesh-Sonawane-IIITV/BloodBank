// const mongoose = require('mongoose')
// mongoose.connect(process.env.mongo_url)

// const connection = mongoose.connection;

// //verify connection 
// connection.on("connected",()=>{
//     console.log("mongo db connected")
// })


// connection.on("error",(err)=>{
//     console.log("mongo db connection error",err)
// })

require('dotenv').config();

const mongoose = require('mongoose');

// Ensure the mongo_url is properly loaded from the .env file
const mongoURL = process.env.mongo_url;
if (!mongoURL) {
    console.error("MongoDB URI is missing in the .env file");
    process.exit(1);
}

// Remove deprecated options and use the correct ones
const connectDB = async() => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true, // Use the new URL parser
            useUnifiedTopology: true, // Use the new server discovery and monitoring engine
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

connectDB();