require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const playerRouter = require('./routes/playerRoutes');

app.use(express.json());

app.use("/api/v1", playerRouter);


mongoose.connect(process.env.DATABASE).then(()=>{
    app.listen(PORT, ()=>{
    console.log("Server is running on the PORT:", PORT);
})
    console.log(`Database connection has been established successfully`);
    

}).catch((error)=>{
    console.error(`Unable to connect to the database ${error.message}`);
    
})
