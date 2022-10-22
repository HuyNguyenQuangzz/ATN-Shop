var express = require('express')
var router = express.Router()

//set trang chủ (homepage)
router.get('/', (req, res) => {
  //render ra trang index ở trong thư mục views
  res.render('index')
})



// module.exports = router
// const express = require('express')
// const router = express.Router()

// router.get('/',  (req, res) => {
//     req.flash('message', 'Success!!');
//     res.render('index')
// })

// router.get('/users/dashboard', (req, res) => {
//     res.render('dashboard')
// })
module.exports = router