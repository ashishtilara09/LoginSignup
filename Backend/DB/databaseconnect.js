const mongoose= require("mongoose");

const connectDB = async () => {
    try {
      const conn = await mongoose.connect("mongodb+srv://ashish:1234@cluster0.an7jydf.mongodb.net/Organization?retryWrites=true&w=majority");
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };
  
module.exports= connectDB;
