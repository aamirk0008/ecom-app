const express = require('express');
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const userRoutes = require('./view/user.view')

const productRoutes = require('./view/product.view')


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to E-commerce App')
})

app.use('/v1', userRoutes)
app.use('/v1', productRoutes)

const uri = process.env.SECRET_KEY

mongoose.connect(uri).then(() => {
    console.log('Connected to ecom-app database successfully');
    
}).catch((err) => {
    console.log('Error connecting to Database:', err);
})

const port = process.env.PORT

app.listen(port, () =>{
    console.log(`The server is running on port ${port}`);
    
})