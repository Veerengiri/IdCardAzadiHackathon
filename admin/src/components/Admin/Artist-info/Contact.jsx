import React from "react";
import "./Contact.css";
import "./EventForm.css";
import Person2Icon from "@mui/icons-material/Person2";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import FestivalIcon from "@mui/icons-material/Festival";
import FestivalOutlinedIcon from "@mui/icons-material/FestivalOutlined";
import NumbersIcon from "@mui/icons-material/Numbers";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { height } from "@mui/system";
import Loading from "../../Fixed/Loading";
const Contact = (props) => {
  const {backend,islogin,userId}=props;
  
  const [chats,setChats]=useState([]);
  const [message,setMessage]=useState("");
  const [submit,setSubmit]=useState("Submit");
  const nav = useNavigate();
  const getchat= async ()=>{
    const res = await fetch(`${backend}/chat/user/${userId.id}`,{method:"GET"});
    const data = await res.json();
    setChats(data.chats);
    const mb =document.getElementById('messagebox');
    mb.scrollTo(0,mb.scrollHeight);
   
  }
  const handlesubmit = async ()=>{

    if(message==""){
      alert("invalid message");
      return;
    }
    if(submit!="Submit"){
      return;
    }
    setSubmit("Submiting...")
    const res = await fetch(`${backend}/chat/admin`,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        id:userId.id,
        message
      })
    });
    const data = await res.json();
    if(data.status=="ok"){
      setChats([...chats,data.chats]);
      setTimeout(() => {
        
        const mb =document.getElementById('messagebox');
        mb.scrollTo(0,mb.scrollHeight);
      }, 500);
      setMessage("");
    }else{
      alert(data.status);
    }
    setSubmit("Submit");
  }
  const deletchat = async (id,index)=>{
    const res = await fetch(`${backend}/chat/user/${id}`,{method:"DELETE"});
    const data = await res.json();
    if(data.status=="ok"){
      getchat();
    }else{
      alert(data.status);
    }
  }
  useEffect(()=>{
    if(islogin){
      getchat();
      window.scrollTo(0,400);
    }else{
      nav("/")
    }
  },[])
  return (
    <div id="H5" style={{minHeight:'100vh',marginBottom:"10px"}}>
      <header className="event-sec" style={{position:"sticky",top:"70px"}}>
        <div className="e-title">
          Artist {" "}
          <span id="golden">{userId.name}</span> {" "}
          Quarry
        </div>
      </header>
      <div className="message">
        <div style={{display:'flex',flexDirection:'column',height:"40vh",overflow:"scroll"}} id="messagebox" >
          {chats.length==0?<Loading/> : chats.map((ct,index)=>{
            return <div style={{display:'flex',justifyContent:`${ct.status?"end":"start"}`}}>
              <p style={{margin:"10px",padding:"10px",backgroundColor:`${!ct.status?"rgb(255,255,255,.2)":"rgb(0,255,0,.2)"}`,maxWidth:"60vw",borderRadius:"5px"}}>{ct.message} {" "}
               <span style={{cursor:"pointer",display:`${!ct.status?"none":"unset"}`}} onClick={()=>{deletchat(ct._id,index)}}>❎</span></p>
            </div>
          })}
        </div>
        
        <form action="" className="contactus" style={{position:"sticky",bottom:"10px",marginTop:"-16px"}}>
          <div className="input" >
            <label className="icon">
              {" "}
              <NumbersIcon />
            </label>
            <input type="text" value={message} onChange={(e)=>{setMessage(e.target.value)}} className="name" placeholder="Reply" />
          </div>
          <div className="forbtn">
            <div className="btn" onClick={handlesubmit}>{submit}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
