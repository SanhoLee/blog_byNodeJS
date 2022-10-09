// entry point
// ES6......
import app from '../app';
import http from 'http';

const cbFunc_Server_listen = () =>{
  console.log(`now, This is fired by httpServer listening event ,,,,, `);
 }

 const cbFunc_Server_error = (error)=>{
   console.log(`error code : ${error.code} `);
  }
  
  var httpServer = http.createServer(app);
  httpServer.listen(process.env.PORT);
  httpServer.on('error', cbFunc_Server_error);
  httpServer.on('listening', cbFunc_Server_listen);
