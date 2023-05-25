const mongoose = require("mongoose");

const info = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    data:{
        type:Number,
        required: true,
    }
})
module.exports = mongoose.model('info',info);