const express = require('express')
const app = express()

const logger = require('morgan')
const port = 4000

// middlewares...
app.use(logger('dev'))  // HTTP request logger.

app.get('/', (req,res) =>{
  res.send('Hello world!!! ')
})

app.listen(port, ()=>{
  console.log(`The app listening on port ${port}`)
})