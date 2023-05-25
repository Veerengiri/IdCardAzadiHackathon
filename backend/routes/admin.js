const express=require('express');
const admin=require("../models/admin");
const info = require('../models/info'); 
const mstaf = require('../models/mstaf');
const newReg = require('../models/newReg');
const qrcode = require('../models/qrcode');
const routera=express.Router();

routera.post("/api/admin",async(req,res)=>{
    
  console.log(req.body);
  const {id,password}=req.body;


  const adminuser=await admin.findOne({id:id,password:password})
    if(adminuser)
    {
      res.json({status:"ok",role:adminuser.role});
    }
  else
  {
    res.json({status:"invalid data",error:"invalid data"})
  }
})
routera.post("/admin/reg",async (req,res)=>{
  try {
    const {role,email,password}=req.body;
    const dat = await admin.create({
      role,id:email,password
    })
    if(dat){
      res.json({status:"ok"});
    }else{
      res.json({status:"already exists..."});
    }
  } catch (error) {
    res.json({status:"error"});
  }
})
// REQUEST FOR CECKING...
routera.get('/check/:id',async (req,res)=>{
  const {id}=req.params;
  try {
    const data = await newReg.findById(id);
    if(data){
      if(data.commisioner=="Approved"){
        let obj = {
          gname: data.gname,
          LeaderName: data.name[0].name,
          NoArtist: data.tnartist,
          participants: data.name,
          eventName: data.eventName,
          groupImg: data.gphoto,
          LeaderImg: data.img,
        }
        res.json({status:'ok',data:obj});
      }else{
        res.json({status:"Duplicate Icard..."});
      }
    }else{
      res.json({status:"Duplicate Icard..."});
    }
  } catch (error) {
    res.json({status:'error'});
  }
})
routera.post('/scan/detail',async (req,res)=>{
  try {
    const {mId,status,icard,time}=req.body;
    await qrcode.create({
      mId,
      status,
      icard,
      time
    })
    res.json({status:"ok"})
  } catch (error) {
    res.json({status:"error"});
  }
})

// login managment
routera.post('/mstaf/login',async (req,res)=>{
  try {
    const {email,password}=req.body;
    const dt = await mstaf.findOne({email,password});
    if(dt){
      res.json({status:'ok',role:dt.role})
    }else{
      res.json({status:"error"})
    }
  } catch (error) {
    res.json({status:'error'});
  }
})
routera.post('/mstaf/reg',async (req,res)=>{
  try {
    const {role,email,password,mobileNo}=req.body;
    const dt = await mstaf.create({
      role,email,password,mobileNo
    })
    if(dt){
      res.json({status:"ok"})
    }else{
      res.json({status:"already axists"})
    }
  } catch (error) {
    
  }
})

routera.get('/report/tar',async (req,res)=>{
  try {
    const total = await newReg.countDocuments();
    const approved = await newReg.countDocuments({commisioner:'Approved'});
    const pending = await newReg.countDocuments({commisioner:"Pending"});
    const dt = await info.find({name:"rapps"});
    const rejected = dt.count;
    res.json({status:'ok',total,approved,pending,rejected});
  } catch (error) {
    res.json({status:'error'});
  }
})

module.exports=routera;