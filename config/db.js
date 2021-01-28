const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb://127.0.0.1:27017/gymanst",
    // "mongodb://localhost:27017/test",
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  );
  console.log("connected ", conn.connection.host);
};

module.exports = connectDB;
