const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb://localhost:27017/gymnast_2", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  console.log("connectedd ", conn.connection.host);
};

module.exports = connectDB;
