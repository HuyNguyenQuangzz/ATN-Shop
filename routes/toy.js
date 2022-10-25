const express = require('express')
const ToyModel = require('../models/ToyModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    ToyModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/toy')
    })
})


router.get('/', (req, res) => {
    ToyModel.find((err, data) => {
        if (!err) {
            res.render('toy/index', { toy: data })
        }
    })
})

router.get('/view', (req, res) => {
    ToyModel.find((err, data) => {
        if (!err) {
            res.render('toy/view', { toy: data })
        }
    })
})

router.get('/outlook', (req, res) => {
    ToyModel.find((err, data) => {
        if (!err) {
            res.render('toy/outlook', { toy: data })
        }
    })
})

router.get('/list', (req, res)=>{
    ToyModel.find((err, data)=>{
        if(!err){
            res.render('toy/list', {toy : data})
        }
    })
})

router.get('/delete/:id', (req, res) => {
    ToyModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete Toy Succeed !");
            res.redirect("/toy");
        }
    })
})

router.get('/about', (req, res) => {
    res.render("toy/about");
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("toy/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    ToyModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add toy succeed !')
            res.redirect("/toy")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    ToyModel.findById(req.params.id, (err, data) => {
        if (!err) {
            res.render("toy/update", { toy: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var toy = req.body;
    ToyModel.findByIdAndUpdate(id, toy, (err) => {
        if (!err) {
            console.log("Update toy succeed !")
            res.redirect("/toy")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    ToyModel.findById(req.params.id, (err, toy) => {
        if (!err) {
            res.render('toy/info', { toy: toy })
        }
    })
})

//search function
router.post('/search', (req, res) => {
    ToyModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('toy/index', { toy: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    ToyModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('toy/index', { toy: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    ToyModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('toy/index', { toy: data })
            }
        })
})
module.exports = router