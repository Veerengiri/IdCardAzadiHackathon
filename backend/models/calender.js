const mongoose=require('mongoose');

const calender=new mongoose.Schema({
    uId:{type:String,required:true},
    date:{type:String ,required:true},
    month:{type:String,required:true},
    year:{type:String,required:true},
    message:{type:String,required:true},
})
module.exports=mongoose.model('calender',calender);