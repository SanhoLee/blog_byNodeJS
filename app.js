const express = require('express')
const app = express()
const path = require('path')

const logger = require('morgan')
const port = 4000

// middlewares...
app.use(logger('dev'))  // HTTP request logger.


// built-in middlewares
app.use(express.static(path.join(__dirname, 'public'))) // 'public' 아래에 있는 static 파일에 접근할 수 있게 된다.
app.use(express.json());

app.get('/', (req,res) =>{
  res.send('Hello world!!! ')
})



app.post('/sanho', (req,res) =>{
  var myJson = {};
  myJson.name = "sanho Lee";
  myJson.prop = {
    age : 33,
    height : 184,
    hobby : "programming"
  }

  req.body = {myJson}
  console.log(req.body)
  console.log(`${req.body.myJson.name} is ${req.body.myJson.prop.age} years old...`)

  res.end()



})
app.listen(port, ()=>{
  console.log(`The app listening on port ${port}`)
})