
 const express =require("express");
let app=express();

 const bodyParser = require('body-parser')
 const cors = require('cors')
 const morgan = require('morgan')

 app.use(morgan('combined'))
 app.use(bodyParser.json())
 app.use(cors())
require('./db/mongoose');
 var favicon = require('serve-favicon')

 app.use(express.static(__dirname + '/dist'));
 // app.use(favicon(__dirname + '/dist/favicon.ico'));
 app.use(favicon(__dirname + '/dist/favicon.ico'));
 // const userRouter = require("./routers/user");
 // const taskRouter = require("./routers/tasks");
 app.use(express.json());
 // app.use('/uploads', express.static('/Diplom/uploads'));
 // app.use('/user', userRouter);
 app.use(require("./routers/tasks"));
 // const PORT=process.env.PORT || 5000
 // app.listen(PORT,  err=> {
 //  if(err) throw err;
 //  console.log(`Example app listening on port ${PORT}!`)
 // })
 const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
 });
 // app.listen(8081, function () {
 //  console.log('Example app listening on port 3000!')
 // })




