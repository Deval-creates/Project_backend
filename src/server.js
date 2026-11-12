require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(cors()); // if frontend and backend are running on different ports then we use cors(cross-origin resource sharing)
// Middleware: to accept JSON data
app.use(express.json());

// Frontend files (public folder) 
app.use(express.static(path.join(__dirname, '../public')));

// Routes connect 
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// MongoDB connect 
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch((err) => console.log("MongoDB Connection Error: ", err));

// Server start 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});