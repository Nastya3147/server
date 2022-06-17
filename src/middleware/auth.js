const  jwt=require("jsonwebtoken");
const User=require("./../models/user");
const auth =async (req,res,next)=>{

    try{
         // console.log("aaaaaa")
        const token=req.header('Authorization').replace("Bearer ","");
        // console.log(token);
        // console.log("22222zzz")
        const decoded=jwt.verify(token, 'kdweueksdsjfij');
        //   const decoded=jwt.verify(token.split(' ')[1],'kdweueksdsjfij');

      //  console.log(decoded);
        const user =await User.findOne({_id:decoded._id, 'tokens.token':token});
        // console.log(user);

        if(!user){
            console.log("Bbbbbbbb")
            throw new Error()
        }
        req.user=user;
        req.token=token;
        next();
    }catch (e) {
        res.status(401).send({error:"Please authenticate"})
    }
}
module.exports=auth;