import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../Css/Event.css";
import Loading from "../../Fixed/Loading";
const ProgressCheck = (props) => {
  const {backend,islogin,userId,setRegId}=props;
  const [events,setEvents]=useState([]);
  const [nodata,setNodata]=useState(false);
  const [cp,setCp]=useState([]);
  const nav= useNavigate();
  const getinfo=async ()=>{
    const res = await fetch(`${backend}/api/progress/${userId}`,{
      method:"GET",
      headers:{
        "content-type":"application/json"
      }
    })
    const data=await res.json();
    let newdata = data.events;
    if(newdata.length==0){
      setNodata(true);
    }
    setEvents(newdata);
    let cpl = [];
    for(let i=0;i<newdata.length;i++){
      cpl.push("Check Progress");
    }
    setCp(cpl);
  }
  useEffect(()=>{
    if(islogin){
      getinfo();
    }else{
      nav("/");
    }
  },[])
  return (
    <section className="pro-sec" id="H4" style={{height:"auto"}}>
      {events.length==0 && !nodata? <div style={{marginTop:"200px"}}><Loading/></div> : nodata?<div>data not found</div>: events.map((ev,index)=>{
        return <div className="prog">
          <p>EventName : {ev.eventName}</p>
        
        <div className="btn" onClick={(d)=>{
          d.preventDefault();
          setRegId(ev._id);
          let cpl = cp;
          cpl[index]="Checking...";
          setCp(cpl);
          setTimeout(() => {
            nav("/icard");
          }, 2000);
        }}>{cp[index]}</div>
      </div>
      })}
    </section>
  );
};

export default ProgressCheck;
