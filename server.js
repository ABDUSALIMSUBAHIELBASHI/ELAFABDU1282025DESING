const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Your specific MongoDB URI
const mongoURI = "mongodb://localhost:27017/ELAFABDU1282025";

mongoose.connect(mongoURI)
    .then(() => console.log("✅ DATABASE LINKED SUCCESSFULLY: ELAFABDU1282025"))
    .catch(err => console.error("❌ MONGODB CONNECTION ERROR:", err));

app.get('/', (req, res) => res.send("DBHOND Server Active"));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 SERVER RUNNING ON PORT ${PORT}`));