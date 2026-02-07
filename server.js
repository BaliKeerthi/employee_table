const express=require("express");
const dotenv=require("dotenv");
const app=express();
const bodyParser=require("body-parser");
const employeeRoutes = require("./routes/employeeRoutes");
const cors = require('cors');

const mongoose = require("mongoose");
  

app.use(cors());
dotenv.config();
const PORT = process.env.PORT||5000;
app.use(bodyParser.json())


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected successfully");
  // Start server *after* DB connects
  app.listen(PORT, () => {
    console.log(`🚀 Server running at port ${PORT}`);
  });
})
.catch((error) => {
  console.error("❌ MongoDB connection error:", error);
});
app.use('/employees',employeeRoutes)
app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
})
