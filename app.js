var express = require('express');
var path = require('path');
var cookieparser = require('cookie-parser');
var http = require('http');
var createError = require('http-errors');
var logger = require('morgan');
var dotenv = require('dotenv');

var app = express();
var httpServer = http.createServer(app);
dotenv.config();

// set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

// middlewares...
app.use(logger('dev'));  // HTTP request logger.
app.use(cookieparser());

// built-in middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // 'public' 아래에 있는 static 파일에 접근할 수 있게 된다.
app.use(express.urlencoded({extended:false}));



app.get('/', (req,res) =>{
  res.render('index',{title: 'Hey', message: "Hello world !!"});
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handling...
app.use((err,req,res,next)=>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === process.env.NODE_ENV ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
})





httpServer.listen(process.env.PORT);

// httpServer.on --> handling event which is fired..
// httpServer.on('error', callbackFunc1);
httpServer.on('error', cbFunc_Server_error);
httpServer.on('listening', cbFunc_Server_listen);

function cbFunc_Server_listen(){
   console.log(`now, This is fired by httpServer listening event ,,,,, `);
 }

 function cbFunc_Server_error(error){
  console.log(`error code : ${error.code} `);

}