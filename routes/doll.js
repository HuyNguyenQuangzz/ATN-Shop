const express = require('express')
const DollModel = require('../models/DollModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    DollModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/doll')
    })
})


router.get('/', (req, res) => {
    DollModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/student
            res.render('doll/index', { doll: data })
        }
    })
})

router.get('/view', (req, res) => {
    DollModel.find((err, data) => {
        if (!err) {
            res.render('doll/view', { doll: data })
        }
    })
})

router.get('/outlook', (req, res) => {
    DollModel.find((err, data) => {
        if (!err) {
            res.render('doll/outlook', { doll: data })
        }
    })
})

router.get('/list', (req, res)=>{
    DollModel.find((err, data)=>{
        if(!err){
            res.render('doll/list', {doll : data})
        }
    })
})

router.get('/delete/:id', (req, res) => {
    DollModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete doll Succeed !");
            res.redirect("/doll");
        }
    })
})

router.get('/about', (req, res) => {
    res.render("doll/about");
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("doll/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    DollModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add doll succeed !')
            res.redirect("/doll")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    DollModel.findById(req.params.id, (err, data) => {
        if (!err) {
            res.render("doll/update", { doll: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var doll = req.body;
    DollModel.findByIdAndUpdate(id, doll, (err) => {
        if (!err) {
            console.log("Update toy succeed !")
            res.redirect("/toy")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    DollModel.findById(req.params.id, (err, doll) => {
        if (!err) {
            res.render('doll/info', { doll: doll })
        }
    })
})

//search function
router.post('/search', (req, res) => {
    DollModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('doll/index', { doll: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    DollModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('doll/index', { doll: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    DollModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('doll/index', { doll: data })
            }
        })
})
module.exports = router
