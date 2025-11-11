const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true
    // },
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 30
    },
    age: {
        type: Number,
        required: true,
        min: [10, "You must be at least 10 years old to register."],
        max: [100, "You must be under 100 years old to register."]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Your Email is not correct"] // standard email format
    },
     password: {
        type: String,
        required: true,
        match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        unique: true,
        min: 1000000000,
        max: 9999999999
    },
    role: {
        type: String,
        enum: ['user', 'admin']
    }
})


const User = mongoose.model('User', userSchema)

module.exports = User