const events = require('../models/events');
// const multer = require('multer');
// const multers3 = require('multer-s3');
const express = require('express');
const router = express.Router();
require('dotenv').config();
const aws = require('aws-sdk');
const newReg = require('../models/newReg');
const mongoose = require('mongoose');


const region = process.env.REGION;
const secretkey = process.env.SECRET_ACCESS_KEY;
const accesskey = process.env.ACCESS_KEY;
const bucketName = process.env.BUCKET; 
const s3 = new aws.S3({
    region,
    accessKeyId:accesskey,
    secretAccessKey:secretkey,
    signatureVersion:'v4',
});

async function generateUploadUrl(filetype){
    const imageName =((Date.now().toString())+'.'+filetype).toString();
    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })
    const uploadURL = await s3.getSignedUrlPromise('putObject',params);
    
    return uploadURL;
}
router.delete("/api/getuser/:id", async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ status: "id is not valid" });
    }
    try {
        const regform = await newReg.findByIdAndDelete(id);
        let resdata = true;
        
        let dimg = regform.gphoto;
        let dimgsplit = dimg.split('/');
        let file = dimgsplit[dimgsplit.length-1];
        const params1= ({
            Bucket: bucketName,
            Key: file
        })
        await s3.deleteObject(params1, (err, data) => {
            if (err) {
                resdata = false;
            }
        })

        dimg = regform.img;
        dimgsplit = dimg.split('/');
        file = dimgsplit[dimgsplit.length-1];
        const params2= ({
            Bucket: bucketName,
            Key: file
        })
        await s3.deleteObject(params2, (err, data) => {
            if (err) {
                resdata=false;
            } 
        })

        dimg = regform.adhar;
        dimgsplit = dimg.split('/');
        file = dimgsplit[dimgsplit.length-1];
        const params3= ({
            Bucket: bucketName,
            Key: file
        })
        await s3.deleteObject(params3, (err, data) => {
            if (err) {
                resdata = false;
            } 
        })

        dimg = regform.sign;
        dimgsplit = dimg.split('/');
        file = dimgsplit[dimgsplit.length-1];
        const params4= ({
            Bucket: bucketName,
            Key: file
        })
        await s3.deleteObject(params4, (err, data) => {
            if (err) {
                resdata = false;
            }
                
        })

        if(resdata){
            res.status(200).json({ status: "rejected successfully" });
        }else{
            res.status(200).json({ status: "server error" });
        }

    } catch (error) {
      res.status(404).json({ status: "error " });
    }
});
router.delete('/api/devent/:id',async (req,res)=>{
    try {
        const dt = await events.findByIdAndDelete(req.params.id);
        const url = dt.image;
        const urlsplit= url.split('/');
        const filename = urlsplit[urlsplit.length-1];
        let resdata = true;
        // const filename = "javaproject.text";
        const params= ({
            Bucket: bucketName,
            Key: filename
        })
        const delet = await s3.deleteObject(params, (err, data) => {
                if (err) {
                    resdata = false;
                }
        })
        const deleteventforms = await newReg.find({eventId:req.params.id});
        for(let i=0;i<deleteventforms.length;i++){
            const regform = await newReg.findByIdAndDelete(deleteventforms[i]._id);
            let dimg = regform.gphoto;
            let dimgsplit = dimg.split('/');
            let file = dimgsplit[dimgsplit.length-1];
            const params1= ({
                Bucket: bucketName,
                Key: file
            })
            await s3.deleteObject(params1, (err, data) => {
                if (err) {
                    resdata = false;
                }
            })

            dimg = regform.img;
            dimgsplit = dimg.split('/');
            file = dimgsplit[dimgsplit.length-1];
            const params2= ({
                Bucket: bucketName,
                Key: file
            })
            await s3.deleteObject(params2, (err, data) => {
                if (err) {
                   resdata=false;
                } 
            })

            dimg = regform.adhar;
            dimgsplit = dimg.split('/');
            file = dimgsplit[dimgsplit.length-1];
            const params3= ({
                Bucket: bucketName,
                Key: file
            })
            await s3.deleteObject(params3, (err, data) => {
                if (err) {
                   resdata = false;
                } 
            })

            dimg = regform.sign;
            dimgsplit = dimg.split('/');
            file = dimgsplit[dimgsplit.length-1];
            const params4= ({
                Bucket: bucketName,
                Key: file
            })
            await s3.deleteObject(params4, (err, data) => {
                if (err) {
                    resdata = false;
                }
                  
            })
        }
        if(resdata){
            res.json({status:"deleted successfully"})
        }else{
            res.json({status:"server error"});
        }
    } catch (error) {
        res.json({status:"error"});
    }
})
router.get('/api/geturl/:filetype',async (req,res)=>{
    try {
        const {filetype}=req.params;
        const url =await generateUploadUrl(filetype);
        res.json({status:'ok',url});
    } catch (error) {
        res.json({error});
    }
})

router.post('/api/addevent',async (req,res)=>{
    try {
       const {name,desc,image, eventDay,eventMonth,eventYear,destination }= req.body;
       const fulltime = Date.now().toString();
       const ent = await events.create({
        name,
        desc,
        eventDay,
        eventMonth,
        eventYear,
        destination,
        fulltime,
        image,
       })
       res.json({status:'ok'});
    } catch (error) {
        res.json({status:"error"});
    }
})
router.get("/api/getevent",async (req,res)=>{
    try {
        const evnt= await events.find();
        res.json({status:"ok",events:evnt});
    } catch (error) {
        res.json({status:"error"});
    }
})
module.exports = router;