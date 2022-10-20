const express = require('express')
const ToyModel = require('../models/ToyModel')
const router = express.Router()

//view all: select * from student
router.get('/', (req, res) => {
   ToyModel.find((err, data) => {
      if (!err) {
         res.json(data)
      }
   })
})

//view by id : select * from student where _id = 'id'
router.get('/:id', (req, res) => {
   ToyModel.findById(req.params.id, (err, data) => {
      if (!err) {
         res.json(data)
      }
   })
})

//delete: delete from student where _id = 'id'
router.delete('/:id', (req, res) => {
   ToyModel.findByIdAndDelete(req.params.id, (err) => {
      if (!err) {
         //res.send("Delete student succeed !")
         res.json({ "message": "delete toy succceed" })
      }
   })
})

//add: insert (...) values (...) into student 
router.post('/', (req, res) => {
   ToyModel.create(req.body, (err, data) => {
      if (!err) {
         res.json(data)
      }
   })
})

//update: update from student where _id = "id"
router.put('/:id', (req, res) => {
   ToyModel.findByIdAndUpdate(req.params.id, req.body,
      (err, data) => {
         if (!err) {
            res.json(data)
         }
      })
})

module.exports = router