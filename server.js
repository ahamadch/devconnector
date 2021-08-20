const express = require('express');
const connectDB = require("./config/db");


const app = express();

// Connect to Database
connectDB();

//Init Middleware
app.use(express.json({extended: false}));

// app.use('/', (req, res) => res.send('API Running'));

app.use('/api/posts', require("./routes/api/posts"));
app.use('/api/auth', require("./routes/api/auth"));
app.use('/api/profile', require("./routes/api/profile"));
app.use('/api/users', require("./routes/api/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server connecter on port ${PORT}`));