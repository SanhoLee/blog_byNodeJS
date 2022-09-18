var express = require('express')
var app = express()
var path = require('path')
var cookieparser = require('cookie-parser');

var logger = require('morgan')
const port = 4000

// middlewares...
app.use(logger('dev'))  // HTTP request logger.
app.use(cookieparser())

// built-in middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))) // 'public' 아래에 있는 static 파일에 접근할 수 있게 된다.



app.get('/', (req,res) =>{
  res.send('Hello world!!! ')

  console.log(req.cookies)
})



app.listen(port, ()=>{
  console.log(`The app listening on port ${port}`)
})