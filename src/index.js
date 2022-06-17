
 const express =require("express");
let app=express();

 const bodyParser = require('body-parser')
 const cors = require('cors')
 const morgan = require('morgan')

 app.use(morgan('combined'))
 app.use(bodyParser.json())
 app.use(cors())
require('./db/mongoose');
 const userRouter = require("./routers/user");
 const taskRouter = require("./routers/tasks");
 app.use(express.json());
 app.use('/uploads', express.static('/Diplom/uploads'));
 app.use('/user', userRouter);
 app.use('/tasks', taskRouter);
 app.listen(8081, function () {
  console.log('Example app listening on port 3000!')
 })




