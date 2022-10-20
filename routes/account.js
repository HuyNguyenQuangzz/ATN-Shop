var express = require('express')
const AccountModel = require('../models/AccountModel')
var router = express.Router()

// //set trang chủ (homepage)
// router.get('/', (req, res) => {
//   //render ra trang index ở trong thư mục views
//   res.render('index')
// })

router.post('/register', (req, res, next) => {
    var usename = req.body.usename
    var password = req.body.password

    AccountModel.findOne({
        username: username
    })
        .then(data => {
            if (data) {
                res.json('This user already exists')
            } else {
                return AccountModel.create({
                    username: username,
                    password: password
                })
            }
        })
        .then(data => {
            res.json('Create account succeed!')
        })
        .catch(err => {
            res.status(500).json('Create account failed!')
        })
})

router.post('/login', (req, res, next)=>{
    var username = req.body.username
    var password = req.body.password

    AccountModel.findOne({
        username: username,
        password: password
    })
    .then(data =>{
        if(data){
            res.json('Login successfuly!')
        }else{
            res.status(300).json('Account incorrect or not exists!')
        }
    })
    .catch(err=>{
        res.status(500).json('Have a errror in server')
    })
})

module.exports = router
