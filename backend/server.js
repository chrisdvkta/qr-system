const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
// const ticketRoutes = require('./routes/')
const cors = require("cors");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  
  app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/user',userRoutes);
// app.use('/api/user/ticket',ticketRoutes);
const PORT = 5000; 
app.listen(PORT, ()=>console.log("RUNNING AT POST 5000"));