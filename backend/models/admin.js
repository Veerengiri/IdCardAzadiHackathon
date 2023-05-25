const mongoose=require('mongoose');

const Schemaadmin=new mongoose.Schema({
  
    role:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    // name:{
    //     type:String,
    //     required:true
    // },
    // dp:{
    //     type:String,
    //     required: true
    // }
    

})

module.exports=mongoose.model('adminlogin',Schemaadmin);