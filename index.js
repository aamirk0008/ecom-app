const express = require('express');
const app = express()
const mongoose = require('mongoose');

const userRoutes = require('./view/user.routes')

app.use(express.json())
app.use(userRoutes)

app.get('/', (req, res) => {
    res.send('Welcome to E-commerce App')
})

const uri = "mongodb+srv://aamirsheikh0008_db_user:xXCpwHSneTAW9aQd@cluster0.kuwcezg.mongodb.net/?appName=Cluster0"

mongoose.connect(uri).then(() => {
    console.log('Connected to Database successfully');
    
}).catch((err) => {
    console.log('Error connecting to Database:', err);
})

const PORT = 3000

app.listen(PORT, () =>{
    console.log(`The server is running on port ${PORT}`);
    
})