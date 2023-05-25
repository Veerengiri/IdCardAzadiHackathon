const mongoose = require("mongoose");

const mstaf = new mongoose.Schema({
    role:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    mobileNo:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('mstaf',mstaf);