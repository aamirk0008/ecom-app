const express = require('express')

const router = express.Router()

const User = require('../model/user.model')

//signUp route
router.post('/signup', async (req, res) => {
    try {
        const data = req.body

        const userData = await User.create(data)

        res.status(201).json({
            message: 'User signed up successfully',
            user: userData
        })
    } catch (error) {
        console.log('Error occurred during signup:', error);
    }
})

//login route
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body

        const data = await User.findOne({
            email: email,
        })

        if (data.password !== password) {
            return res.status(401).json({
                message: 'Invalid credentials'
            })
        }

        res.status(200).json({
            message: 'User logged in successfully',
            user: data
        })
    } catch (error) {
        console.log('Error occurred during login:', error);
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})  


module.exports = router