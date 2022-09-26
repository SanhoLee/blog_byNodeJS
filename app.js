var express = require('express');
var path = require('path');
var cookieparser = require('cookie-parser');
var http = require('http');
var createError = require('http-errors');
var logger = require('morgan');
var dotenv = require('dotenv');
dotenv.config();

const globalRouter = require('./router/globalRouter');
const routes = require('./routes');

// auto reload modules..
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
const refreshTimeInterval = 100;
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", ()=>{
  setTimeout(()=>{
    liveReloadServer.refresh(routes.home);
  }, refreshTimeInterval);
})

var app = express();
app.use(connectLiveReload());

var httpServer = http.createServer(app);

// set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

// middlewares...
app.use(logger('dev'));  // HTTP request logger.
app.use(cookieparser());

// built-in middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.urlencoded({extended:false}));


app.use(routes.home, globalRouter);


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


// todo,,, http 서버를 bin 폴더를 만들어 분리해야 할 필요가 있음...(2022.09.26)
// httpServer.on --> handling event which is fired..
// this is using for listening port number and error handling...
httpServer.listen(process.env.PORT);
httpServer.on('error', cbFunc_Server_error);
httpServer.on('listening', cbFunc_Server_listen);


function cbFunc_Server_listen(){
   console.log(`now, This is fired by httpServer listening event ,,,,, `);
 }

 function cbFunc_Server_error(error){
  console.log(`error code : ${error.code} `);

}