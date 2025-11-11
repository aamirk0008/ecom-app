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

        if (password !== user.password) {
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

module.exports = {
    signup,
    login
}