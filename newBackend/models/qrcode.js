const mongoose = require("mongoose");

const scan = new mongoose.Schema({
    mId:{
        type:String,
        required: true,
    },
    status:{
        type: Boolean,
        required:true
    },
    icard:{
        type:String,
        required: true,
    },
    time:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('scan',scan);