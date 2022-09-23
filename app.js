var express = require('express');
var path = require('path');
var cookieparser = require('cookie-parser');
var http = require('http');
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

// error handling...
app.use((err,req,res,next)=>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

  console.log('err.status : ' , err.status);
})

httpServer.listen(process.env.PORT);

// httpServer.on --> handling event which is fired..
// httpServer.on('error', callbackFunc1);~~need to correct
// httpServer.on('listening',callbackFunc2);~~need to correct