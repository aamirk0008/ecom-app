const router = require('express').Router();

const { signup, login, getAllUsers, getById, updatePass} = require('../controller/user.controller')

router.post('/signup', signup)

router.post('/login', login)

router.get('/getAllUsers', getAllUsers)

router.get('/getById/:id', getById)

router.patch('/updatePass/:id', updatePass)

module.exports = router