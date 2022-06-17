const express=require("express");
const router=new express.Router();
const Tasks = require("./../models/tasks");
const jsonParser = express.json();
const config = require('../config');
const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');
const auth = require("./../middleware/auth");
// router.post("/create", async (req, res)=>{
//     console.log(req.body.title);
//     const task = new Tasks({title: req.body.title, date:req.body.date});
//
//     try{
//         await task.save();
//         res.status(201).send(task);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
//
// });
router.post("/create", auth, async (req, res) => {
    console.log('req.user.id')
   console.log(req.user.id)

    var today = new Date();

    var birthDate = new Date(req.user.vik);
    var age1 = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age1--;
    }
    console.log(age1);
    const task = new Tasks({title: req.body.title,  date:req.body.date, hol:req.user.hol, age:age1, owner: req.user.id});
    try{
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
router.get("/", auth, async (req, res) => {

        try {
            const tasks = await Tasks.find({owner: req.user.id});
            // if (!tasks.length) {
            //     res.status(404).send();
            // }
            res.status(200).send({tasks: tasks});
        } catch {
            res.status(500).send();
        }
});
// router.get("/:id", auth, async (req, res) => {
//
//     try {
//         const tasks = await Tasks.find({_id: req.params["id"], owner: req.user.id});
//         // if (!tasks.length) {
//         //     res.status(404).send("not found");
//         // }
//         res.status(200).send(tasks);
//     } catch {
//         res.status(500).send();
//     }
// });
//
router.patch("/:id",  async (req, res) =>  {
 console.log('xxxxxxxxxxx')
    try{

        const task = await Tasks.findOneAndUpdate({_id: req.params.id,},
            {title: req.body.title},
            {new: true,useFindAndModify: false});
        if(!task){
            res.status(404).send("not found");
        }
        res.status(200).send(task);

    } catch(e){
        res.status(400).send(e.message);
    }


});
// });
// router.get("/", async (req, res) => {
//     try {
//         const tasks = await Tasks.find();
//         res.status(200).send({tasks: tasks});
//     } catch(error) {
//         res.status(401).send(error.message);
//     }
// })
module.exports = router;