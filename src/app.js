const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); 
const user =require("./models/user");
const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(express.json());

// app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
