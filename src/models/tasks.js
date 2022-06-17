const mongoose = require('./../db/mongoose');
const Tasks =mongoose.model('Task',{
    title : {
        type: String,
        // required:true
    },
    date : {
        type: String,
        // required:true,
    },
    hol : {
        type: String,
        // required:true,
    }, age : {
        type: String,
        // required:true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }

});
module.exports = mongoose.model('Task');