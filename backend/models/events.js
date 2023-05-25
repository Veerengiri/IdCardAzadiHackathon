const mongoose = require('mongoose');
 
const SchemaEvent = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    desc: {
        type:String,
        required:true
    },
    eventDay: {
        type:String,
        required:true
    },
    eventMonth:{
        type:String,
        required:true
    },
    eventYear:{
        type:String,
        required:true
    },
    image: {
        type:String,
        required:true
    },
    destination: {
        type:String,
        required:true
    },
    fulltime: {
        type:String,
        required:true
    },
})

module.exports = mongoose.model('events',SchemaEvent);