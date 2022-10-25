const express = require('express')
const CustomerModel = require('../models/CustomerModel')
const router = express.Router()

router.get('/', (req, res) => {
    CustomerModel.find((err, data) => {
        if (!err) {
            res.render('customer/index', { customer: data })
        }
    })
})

router.get('/view', (req, res) => {
    CustomerModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/student
            res.render('customer/view', { customer: data })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    CustomerModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete customer succeed !");
            res.redirect("/customer");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("customer/new");
})

router.post('/add', (req, res) => {
    CustomerModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add customer succeed !')
            res.redirect("/customer")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    CustomerModel.findById(req.params.id, (err, data) => {
        if (!err) {
            res.render("customer/update", { customer: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var customer = req.body;
    CustomerModel.findByIdAndUpdate(id, customer, (err) => {
        if (!err) {
            console.log("Update customer succeed !")
            res.redirect("/customer")
        }   
    })
})

//Detail
router.get('/detail/:id', (req, res) => {
    CustomerModel.findById(req.params.id, (err, customer) => {
        if (!err) {
            res.render('customer/detail', { customer: customer })
        }
    })
})


//search function
router.post('/search', (req, res) => {
    CustomerModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('customer/index', { customer: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    CustomerModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('customer/index', { customer: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    CustomerModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('customer/index', { customer: data })
            }
        })
})

//delete all data customer
router.get('/drop', (req, res) => {
    CustomerModel.deleteMany({}, () => {
        console.log("Delete all data customer succeed !")
        res.redirect('/customer')
    })
})

module.exports = router
