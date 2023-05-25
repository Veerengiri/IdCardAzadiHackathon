import React,{useEffect, useRef,useState} from "react";
import "../../../Css/Contact.css";
import "../../../Css/EventForm.css";
import FestivalOutlinedIcon from "@mui/icons-material/FestivalOutlined";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import { useNavigate } from "react-router-dom";
import FestivalIcon from '@mui/icons-material/Festival';

const Contact = (props) => {
  const inputRefTest = useRef(null);
  const ikUploadRefTest = useRef(null);
  const [ename,setEname]=useState("");
  const [edate,setEdate]=useState("");
  const [edes,setEdes]=useState("");
  const [edest,setEdest]=useState("");
  const [eimg,setEimg]=useState(null);
  // const [imgsourse,setImagesourse]=useState('');
  const [filenam,setFileName]=useState("");
  const [submit,setSubmit]=useState("Add Event");
  const {backend,islogin}=props;

  const uploadfile = async ()=>{
    let fn  = filenam.split('.');
    let filetyep = fn[fn.length-1];
    const res = await fetch(`${backend}/api/geturl/${filetyep}`);
    const data = await res.json();
    const url=data.url;
    await fetch(url,{
      method:"PUT",
      headers:{
        "content-type":"multipart/form-data"
      },
      body:eimg[0]
    })
    const imgurl = url.split('?')[0];
    // setImagesourse(imgurl)
    return imgurl;
  }
  const handlesubmit = async (e)=>{
    e.preventDefault();
    const eventDay=edate.substring(8).toString();
    const eventMonth=edate.substring(5,7).toString();
    const eventYear=edate.substring(0,4).toString();
    
    setSubmit("Just A Sec...")
    const img = await uploadfile();
    const image = img.toString();
    const res =await fetch(`${backend}/api/addevent`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:ename,
        desc:edes,
        image,
        eventDay,
        eventMonth,
        eventYear,
        destination:edest
      })
    })
    const data = await res.json();
    alert(data.status);
    if(data.status=="ok"){
      setEname("");
      setEdes("");
      setEdest("");
      setEimg(null);
      setEdate("");
      document.getElementById('eventphoto').value="";
    }
    setSubmit("Add Event");
  }
  const nav= useNavigate();
  useEffect(()=>{
    if(!islogin){
      nav("/signIn");
    }
  })
  return (
    <div>
      <header className="event-sec">
        <div className="e-title">
          Add
          <span id="golden"> New </span>
          Events
        </div>
      </header>
      <div className="message">
        <form action="" className="contactus">
          <div className="input">
            <label className="icon">
              <FestivalOutlinedIcon />
            </label>
            <input value={ename} onChange={(e)=>{ setEname(e.target.value) }} type="text" className="name" placeholder="Event Name" />
          </div>
          <div className="input">
            <label className="icon">
              <DateRangeRoundedIcon />
            </label>
            <input value={edate} onChange={(e)=>{setEdate(e.target.value);console.log(e.target.value)}} type="date" className="name" placeholder="" />
          </div>
          <div className="input">
            <label className="icon">
              <AddLocationAltRoundedIcon />
            </label>
            <input value={edest} onChange={(e)=>{setEdest(e.target.value)}} type="text" className="name" placeholder="Event Location" />
          </div>
          <div className="input">
            <label className="icon">
                <FestivalIcon />
            </label>
            <input onChange={(e)=>{
              setEimg(e.target.files);
              setFileName(e.target.value);
            }} type="file"  id="eventphoto"/>
            {/* <button onClick={uploadfile}>Upload</button> */}
          </div>
          {/* <img src={imgsourse} style={{height:'350px',width:'500px',display:`${imgsourse?"unset":"none"}`}} alt="" /> */}
          <div className="inmsg">
            <label className="icon msicon">
              <DescriptionRoundedIcon />
            </label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="msg"
              placeholder="Event Description"
              value={edes}
              onChange={(e)=>{
                setEdes(e.target.value);
              }}
            />
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
