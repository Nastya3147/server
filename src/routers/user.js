const express=require("express");
const router=new express.Router();
const Users = require("./../models/user");
const jsonParser = express.json();
const config = require('../config');
const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');
const auth = require("./../middleware/auth");



router.get('/me', auth, async (req, res) => {

    res.send(req.user);
});
router.post("/create",async (req, res) => {

    try {
            const user = new Users({
                name: req.body.name,
                surname: req.body.surname,
                tel: req.body.tel,
                password: req.body.password,
                vik: req.body.vik,
                height: req.body.height,
                weight: req.body.weight,
                sex: req.body.sex,
                zvych: req.body.zvych,
                hol: req.body.hol,
            });

            console.log( 'Users.findOne({tel: req.body.tel})');

                await user.save();
            const token = await user.generateAuthToken();
            res.status(201).send({user, token});


        } catch (e) {
            res.status(400).send()
        }



});




router.post("/login", jsonParser, async(req, res) => {

    try {
        const user= await Users.findOneByCredentials(req.body.tel,req.body.password);
        const token=await user.generateAuthToken();
        res.send({user,token});

    }catch (e) {
        res.status(400).send()
    }
});

router.get("/found/:id", async (req, res) => {

    try{
        let user = await Users.findById(req.params.id);
        res.status(200).send(user);
    } catch(error) {
        res.send(error.message);
    }


});

router.patch("/:id",  async (req, res) =>  {

    try{
        const user = await Users.findById(req.params.id);
        const updates = ['name', 'surname', 'tel', 'zvych','hol','weight','height','vik','sex'];
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        res.status(200).send(user);

    } catch(e){
        res.status(400).send(e.message);
    }


});


const multer = require('multer')
// const upload = multer({dest:  '/Diplom/server/uploads'})
// var upload = multer({
//     dest:  '/Diplom/server/uploads',
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });
var storage = multer.diskStorage({
    destination: '/Diplom/uploads',
    filename: function (req, file, cb) {
        switch (file.mimetype) {
            case 'image/jpeg':
                ext = '.jpeg';
                break;
            case 'image/png':
                ext = '.png';
                break;
        }
        cb( null, file.fieldname + '-' + Date.now() + ext);
    }
});

var upload = multer({storage: storage});
router.patch("/upload_files/:id", upload.single("file"),async ( req, res)=>{
    const user = await Users.findById(req.params.id);
    console.log('*****************')

    // console.log(user);
    const updates = ['img'];
    updates.forEach((update) => user[update] = req.file.filename);
    await user.save();

});

router.post("/logout", auth, async(req, res) => {

    try{
        console.log(req.user.tokens)
        console.log(req.token)
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token;
        });
        await req.user.save();
        console.log(req.user)
        res.send('exit');

    }catch (e) {
        res.status(500).send(e.message)
    }
});



module.exports = router;