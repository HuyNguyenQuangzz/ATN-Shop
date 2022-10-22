const express = require('express')
const TranformerModel = require('../models/TranformerModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    TranformerModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/tranformer')
    })
})


router.get('/', (req, res) => {
    TranformerModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/student
            res.render('tranformer/index', { tranformer: data })
        }
    })
})

router.get('/view', (req, res) => {
    TranformerModel.find((err, data) => {
        if (!err) {
            res.render('tranformer/view', { tranformer: data })
        }
    })
})

router.get('/outlook', (req, res) => {
    TranformerModel.find((err, data) => {
        if (!err) {
            res.render('tranformer/outlook', { tranformer: data })
        }
    })
})

router.get('/list', (req, res)=>{
    TranformerModel.find((err, data)=>{
        if(!err){
            res.render('tranformer/list', {tranformer : data})
        }
    })
})

router.get('/delete/:id', (req, res) => {
    TranformerModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete tranformer Succeed !");
            //var message = "Delete student succeed !";
            //redirect về trang /student (URL không phải view)
            res.redirect("/tranformer");
        }
    })
})

router.get('/about', (req, res) => {
    res.render("tranformer/about");
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("tranformer/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    //Cách 1: dùng "save"
    // var student = new StudentModel(req.body)
    // student.save((err) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Add student succeed !")
    //         res.redirect("/student")
    //     }
    // })
    //Cách 2: dùng "create"
    TranformerModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add tranformer succeed !')
            res.redirect("/tranformer")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    TranformerModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/student)
            //gửi kèm dữ liệu của object student để load vào form edit
            //student (tên) , data (dữ liệu)
            res.render("tranformer/update", { tranformer: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var tranformer = req.body;
    TranformerModel.findByIdAndUpdate(id, tranformer, (err) => {
        if (!err) {
            console.log("Update tranformer succeed !")
            res.redirect("/tranformer")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    TranformerModel.findById(req.params.id, (err, tranformer) => {
        if (!err) {
            res.render('tranformer/info', { tranformer: tranformer })
        }
    })
})

//search function
router.post('/search', (req, res) => {
    TranformerModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('tranformer/index', { tranformer: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    TranformerModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('tranformer/index', { tranformer: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    TranformerModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('tranformer/index', { tranformer: data })
            }
        })
})
module.exports = router