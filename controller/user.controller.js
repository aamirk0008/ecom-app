const { get } = require('mongoose')
const User = require('../model/user.model')

const signup = async (req, res) => {
    try {
        const data = req.body

        const userData = await User.create(data)

        res.status(201).json({
            message: 'User signed up successfully',
            user: userData
        })
    } catch (error) {
        console.log('Error occurred during signup:', error);
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const login = async (req, res) => {
    // Login logic to be implemented here
    try {
        const {email, password} = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            })
        }
        // Find user by email
        const user = await User.findOne({
            email: email
        })

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        if (!user.comparePassword(password)) {
            return res.status(401).json({
                message: 'Invalid password'
            })
        }
        res.status(200).json({
            message: 'User logged in successfully',
            user: user
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()

        if (users.length === 0) {
            return res.status(404).json({
                message: 'No users found'
            })
        }

        res.status(200).json({
            message: 'Users retrieved successfully',
            users: users
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })  
    }
}


const getById = async (req, res) => {
    try {
        const userId = req.params.id

        const user = await User.findOne(
            {_id: userId}
        )

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        res.status(200).json({
            message: 'User retrieved successfully',
            user: user
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const updatePass = async (req,res) => {
    try {
        const id = req.params.id
        const {password, newPassword} = req.body

        const user = await User.findOne(
            {_id: id}
        )

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        if (password !== user.password) {
            return res.status(401).json({
                message: 'Invalid password'
            })
        }   

        user.password = newPassword
        await user.save()
        res.status(200).json({
            message: 'Password updated successfully',
            user: user
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports = {
    signup,
    login,
    getAllUsers,
    getById,
    updatePass
}