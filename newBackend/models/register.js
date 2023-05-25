const mongoose=require('mongoose')

const registeruser=new mongoose.SchemaTypeOptions({
    name:{
        type:String,
        required:true
    },
    gname:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
   email:{
        type:String,
        required:true
    } ,
    
    tnartist:{
        type:Number,
        required:true
    },
    TOP:{
        type:String,
        // required:true
    },
    FOICD:{
        type:String,
        required:true
    },
    DOA:{
        type:String,
        required:true
    }
    ,img:{
        type:String,
        required:true
    },
    adhar:{
        type:String,
        required:true
    },
    sign:{
        type:String,
        required:true
    },
    PEON:{
        type:String,
        required:true

    },
    officer:{
        type:String,
        required:true
    },
    commisioner:{
        type:String,
        required:true
    },
   date:{
    type:String
   },
   fulltime:{
    type:String
   }
})

const registerdata=mongoose.model('registeruser',registeruser)

module.exports=registerdata;