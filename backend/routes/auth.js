const express=require('express');
const user=require('../models/user')
const jwt=require('jsonwebtoken')
const reg=require('../models/register');
const newReg = require('../models/newReg');
const router=express.Router();
const events = require('../models/events');
const chat = require('../models/chat');
const secretkey ="hackathon2023"
router.post('/api/register',async(req,res)=>{
    // console.log(req.body);
    try{
        const {email,password,name,mobileno}=req.body;

        const users=await user.create({
            name:name,
            email:email,
            password:password,
            mobileno:mobileno,
        })
        if(users)
        {
            res.json({status:"ok"})
        }
     
    }catch(err)
    {
         res.json({status:"error",error:"duplicate data"})
    }
})
router.post('/api/login',async(req,res)=>{
    const data = await user.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if (data) {
        const token = jwt.sign(
        {
            name: user.name,
            email: user.Email,
        },
        secretkey
        );
        res.json({ status: "ok", jwt: token,id:data._id });
    } else {
        res.json({ status: "error in password or email" });
    }
})
router.get('/profile/:token',async (req,res)=>{
    const {token}=req.params;
    try {
        jwt.verify(token,secretkey,async (err, use) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token' });
            } else {
                // Use user information to authorize access to resources
                const email = use.email;
                const userf = await user.findOne({email});
                if (userf) {
                    res.json({status:"ok",id:userf._id});
                } else {
                    res.status(401).json({ status: 'Unauthorized' });
                }
            }
        });
    } catch (error) {
        res.json({status:"error"});
    }
})
// CHART DATA
router.get('/chart/peryear', async (req,res)=>{
    try {
        const dt = await newReg.aggregate([
            {$group:{_id:'$applyYear',applications: {$sum:1}}},
            {$sort: {_id: 1}}
        ]);
        res.json({status:"ok",dt});
    } catch (error) {
        res.json({status:'error'});
    }
})
router.get('/chart/malefemale',async (req,res)=>{
    try {
        const dt = await newReg.aggregate([{
            $unwind: "$name"
        },
        {
            $group: {
                _id: "$applyYear",
                male: {
                    $sum: {
                        $cond: [
                            { $eq: ["$name.gender", "male"] },
                            1,
                            0
                        ]
                    }
                },
                female: {
                    $sum: {
                        $cond: [
                            { $eq: ["$name.gender", "female"] },
                            1,
                            0
                        ]
                    }
                }
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
        ]);
        res.json({status:"ok",dt});
    } catch (error) {
        res.json({status:"error"})
    }
})
router.get('/chart/eventwise',async (req,res)=>{
    try {
        const dt = await newReg.aggregate([
            {$group:{_id:'$eventName',applications: {$sum:1}}},
            {$sort: {_id: 1}}
        ]);
        res.json({status:"ok",dt});
    } catch (error) {
        res.json({status:'error'});
    }
})
router.get('/chart/eapy',async (req,res)=>{
    try {
        const dt = await newReg.aggregate([
            {
                $group: {
                    _id: { year: "$applyYear", eventName: "$eventName" },
                    applications: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.year",
                    eventData: { 
                        $push: { 
                            eventName: "$_id.eventName", 
                            applications: "$applications" 
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id",
                    eventData: 1
                }
            },
            {$sort: {year: 1}}
        ]);
        const dt2 = await newReg.aggregate([
            {
                $group: {
                    _id: '$eventName'
                }
            },
            {
                $project: {
                    _id: 0,
                    eventName: "$_id",
                    
                }
            },
        ])
        res.json({status:"ok",dt,dt2});
    } catch (error) {
        res.json({status:'error'});
    }
})
router.get('/api/regchartday', async (req,res)=>{
    try {
        const dt = await reg.aggregate([{$group:{_id: '$date',count: {$sum:1}}}]);
        res.json({status:"ok",dt});
    } catch (error) {
        res.json({status:'error'});
    }
})

router.get("/api/progress/:id",async (req,res)=>{
    try {
      const events = await newReg.find({userId:req.params.id}).select("eventName");
     
      res.json({status:"ok",events});
    } catch (error) {
      res.json({status:"error"});
    }
})
router.get("/api/getstatus/:id",async (req,res)=>{
    try {
        const status = await newReg.findById(req.params.id);
        if(status.commisioner=="Approved"){
            const event = await events.findById(status.eventId).select("-desc -_id -image -fulltime");
            res.json({pg:3,data: status,event});
        }else{
            if(status.officer=="Approved"){
                res.json({pg:2});
            }else if(status.PEON=="Approved"){
                res.json({pg:1});
            }else{
                res.json({pg:0});
            }
        }
    } catch (error) {
        res.json({status:"error"})
    }
})
router.delete("/chat/user/:id",async (req,res)=>{
    try {
        const chats =await chat.findByIdAndDelete(req.params.id);
        if(chats){
            res.send({status:"ok"});
        }else{
            res.json({status:"not deleted..."});
        }
    } catch (error) {
        res.json({status:"error"});
    }
})
router.get("/chat/user/:id",async (req,res)=>{
    try {
        const chats = await chat.find({userId:req.params.id}).sort({fulltime:1});
        res.send({status:"ok",chats});
    } catch (error) {
        res.json({status:"error"});
    }
})
router.post("/chat/user",async (req,res)=>{
    try {
        const {id,message}=req.body;
        const users=await user.findById(id);
        if(users){
            const chats =await chat.create({
                userId:id,
                message,
                status:false,
                fulltime:Date.now().toString()
            })
            res.json({status:"ok",chats})
        }else{
            res.json({status:"user not exist"});
        }
    } catch (error) {
        res.json({status:"error"});
    }
})
router.get("/chat/admin",async (req,res)=>{
    try {
        // const users = await chat.distinct('userId');
        const users = await chat.aggregate([
            {
                $group: {
                    _id: '$userId',
                    maxTime: {$max: '$fulltime'}
                }
            },
            {
                $sort: {
                    maxTime: -1
                }
            }
        ])
        let data= [];
        for(let i=0;i<users.length;i++){
            let name = await user.findById(users[i]._id).select("name");
            const obj = {
                ...users[i],
                name:name.name,
            }
            data.push(obj);
        }
        res.json({status:"ok",data});
    } catch (error) {
        res.json({status:"error"});
    }
})
router.post("/chat/admin",async (req,res)=>{
    try {
        const {id,message}=req.body;
        const users=await user.findById(id);
        if(users){
            const chats =await chat.create({
                userId:id,
                message,
                status:true,
                fulltime:Date.now().toString(),
            })
            res.json({status:"ok",chats})
        }else{
            res.json({status:"user not exist"});
        }
    } catch (error) {
        res.json({status:"error"});
    }
})
module.exports = router