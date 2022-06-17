const mongoose = require('./../db/mongoose');
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

let  userSchema =new Schema({
    name:{type:String,
        required:true,
    },
    zvych:{type:String,
    },
    hol:{type:String,
    },
    sex:{type:String,
    },

    vik:{type:String,
    },
    height:{type:String,
    },
    weight:{type:String,
    },
    surname:{type:String,
        required:true,
    },
    tel:{required:true,type:String},
    password:{
        required:true,
        type:String,

           },
img:{type:String},

    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]



});
const bcrypt=require("bcrypt");

userSchema.pre('save',async function (next) {
    try {
        const user=this;
        if(user.isModified('password')){
            user.password=await bcrypt.hash(user.password,8);
        }
    }
    catch (e){
        console.log(e.message);

    }
})
userSchema.statics.findOneByCredentials=async (tel,password)=>{
    try{
        // console.log('user');
    const user=await User.findOne({tel});
    console.log(user);
    if(!user){
        throw new Error('Incorrect tel');
    }
    const isMatch=  await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Incorrect password');

    }
    return user
    }
    catch (e){
        console.log(e.message);

    }
};
userSchema.methods.generateAuthToken=async function(){
   try{
   const user=this;
    const token=jwt.sign({_id:user._id.toString()},'kdweueksdsjfij');
    user.tokens=user.tokens.concat({token});
    user.save();
       console.log(token);
    return token;}
    catch (e){
       console.log(e.message)
    }
};
userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};
userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner"
});
const User =mongoose.model('User',userSchema);
module.exports = mongoose.model('User');

