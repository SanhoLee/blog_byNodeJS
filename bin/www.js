// entry point

var app = require('../app');
var http = require('http');


var httpServer = http.createServer(app);
httpServer.listen(process.env.PORT);
httpServer.on('error', cbFunc_Server_error);
httpServer.on('listening', cbFunc_Server_listen);


function cbFunc_Server_listen(){
   console.log(`now, This is fired by httpServer listening event ,,,,, `);
 }

 function cbFunc_Server_error(error){
  console.log(`error code : ${error.code} `);

}