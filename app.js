var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var toyRouter = require('./routes/toy')
var customerRouter = require('./routes/customer')
var accountRouter = require('./routes/account')
// var accountRouter = require('./routes/login')
var apiRouter = require('./routes/api')

//account
// const AccountModel = require('./models/account')

var mongoose = require('mongoose')
var url =
    // 'mongodb://localhost:27017/toy'
'mongodb+srv://nqhuy88vp:Jimmynguyen67@cluster0.tcit1rn.mongodb.net/toy'

mongoose.connect(url, { useNewUrlParser: true }, err => {
    if (!err) {
        console.log('DB connect succeed !')
    } else {
        console.error(err)
    }
})

var hbs = require('hbs')
hbs.registerHelper('dateFormat', require('handlebars-dateformat'))
hbs.registerHelper('equal', require('handlebars-helper-equal'))

var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// Register
// app.post('/register', (req, res, next) => {
//     var usename = req.body.usename
//     var password = req.body.password

//     AccountModel.findOne({
//         username: username
//     })
//         .then(data => {
//             if (data) {
//                 res.json('This user already exists')
//             } else {
//                 return AccountModel.create({
//                     username: username,
//                     password: password
//                 })
//             }
//         })
//         .then(data => {
//             res.json('Create account succeed!')
//         })
//         .catch(err => {
//             res.status(500).json('Create account failed!')
//         })
// })
// Login
// app.post('/login', (req, res, next)=>{
//     var username = req.body.username
//     var password = req.body.password

//     AccountModel.findOne({
//         username: username,
//         password: password
//     })
//     .then(data =>{
//         if(data){
//             res.json('Login successfuly!')
//         }else{
//             res.status(400).json('Account incorrect or not exists!')
//         }
//     })
//     .catch(err=>{
//         res.status(500).json('Have a errror in server')
//     })
// })
//Module dùng cho trao đổi dữ liệu API với front-end
//Note: cần cài đặt package "cors" trước
//cmd: npm install cors
var cors = require('cors')
app.use(cors())


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/toy', toyRouter)
app.use('/customer', customerRouter)
app.use('/account', accountRouter)
// app.use('/login', accountRouter)
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

const port = process.env.PORT || 2002
app.listen(port, () => {
    console.log('http://localhost:2002')
})

module.exports = app