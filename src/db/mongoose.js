const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/api",{
//     //useNewUrlParser:true,
//    // useCreateIndex:true,
//     useUnifiedTopology: true
// });
const conn_str = 'mongodb+srv://q:12345@cluster0.vjhcu.mongodb.net/api?retryWrites=true&w=majority'

mongoose.connect(
    conn_str,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },(err) => {
        if (err) {
            console.log("помилка підключення");
        } else {
            console.log("mongodb підключено" );
        }});
// mongoose.connect( "mongodb+srv://cluster0.vjhcu.mongodb.net/api" ,{
//     //useNewUrlParser:true,
//     // useCreateIndex:true,
//     useUnifiedTopology: true
// });
module.exports = mongoose;