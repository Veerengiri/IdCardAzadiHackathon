const mongoose = require("mongoose");

const chat = new mongoose.Schema({
    userId:{
        type:String,
        required: true,
    },
    message:{
        type:String,
        required: true,
    },
    status:{
        type: Boolean,
        required:true
    },
    fulltime:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('chat',chat);