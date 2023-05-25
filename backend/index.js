const express=require('express');
const router = require('./routes/auth');
const routera = require('./routes/admin');
const routeruser=require("./routes/regiuser");
const routerevent = require("./routes/events");
const cors= require('cors');
const app = express();
require("./db")

app.use(cors())
app.use(express.json());
app.use("/images",express.static("./images"))


app.use(router);
app.use(routera);
app.use(routeruser);
app.use(routerevent);
app.get('/',(req,res)=>{
    res.send("welcome to myid...");
});
const PORT = 8080 || process.env.PORT;
app.listen(PORT,()=>{
    console.log("listening on port 8080");
})
