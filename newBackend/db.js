const mongoose= require("mongoose");
const mongourl= "mongodb+srv://meshohack:paas1264@mesho.1umopoj.mongodb.net/images";


mongoose.connect(mongourl)
.then(()=>{
    console.log("Connected to mongourl");
})