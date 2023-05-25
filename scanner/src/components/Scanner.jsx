import React, { useState } from "react";
import "./scanner.css";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import sound from "../s1.mp3";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useNavigate } from "react-router-dom";import AddCardIcon from '@mui/icons-material/AddCard';import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import Loading from './Loading'
const mongoose = require("mongoose");

function Scanner(props) {
  const { backend, islogin,setIslogin,mId } = props;
  let colTheme = document.getElementById("light-t");
  if (colTheme) {
    console.log(colTheme);
  }
  const [theme, setTheme] = useState("dark-t");
  const themeSwitch = () => {
    // console.log("light");
    if (theme === "dark-t") {
      setTheme("light-t");
    } else {
      setTheme("dark-t");
    }
  };
  const nav = useNavigate();
  const logout = ()=>{
    localStorage.clear();
    setIslogin(false);
    nav("/signIn")
  }
  useEffect(() => {
    
    document.body.id = theme;
  }, [theme]);

  
  const [data, setdata] = useState({});
  const [load,setLoad]=useState(false);
  const [id, setId] = useState("");
  const [war, setWar] = useState("Invalid");
  const [open,setOpen]=useState(false);
  const [part, setPart] = useState([
    {
      name: "-",
      gender: "-",
      email: "-",
      phoneNo: "-",
    },
  ]);

  const toggle = () => {};

  const handlesubmit = async () => {
    setLoad(true);
    document.getElementById("scanner").style.display = "none";
    document.getElementById("checkdt").style.display = "none";
    document.getElementById("cardt").style.display = "none";
    document.getElementById("war").style.display = "none";

    if (id == "") {
      alert("invalid id");
      return;
    }
    const res = await fetch(`${backend}/check/${id}`, { method: "GET" });
    const data = await res.json();
    if (data.status == "ok") {
      setdata(data.data);
      setLoad(false);
      setPart(data.data.participants);
      setTimeout(() => {
        document.getElementById("cardt").style.display = "unset";
      }, 500);
    } else {
      setWar(data.status);
      setTimeout(() => {
        document.getElementById("war").style.display = "unset";
      }, 500);
      // alert(data.status);
    }
  };
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      // Scanner will be initialized in DOM inside element with id of 'reader'
      qrbox: {
        width: 250,
        height: 250,
      }, // Sets dimensions of scanning box (set relative to reader element width)
      fps: 20, // Frames per second to attempt a scan
    });
    function scane() {
      document.getElementById('scid').style.display="none";
      document.getElementById("scanner").style.display = "unset";
      document.getElementById("checkdt").style.display = "none";
      document.getElementById("cardt").style.display = "none";
      document.getElementById("war").style.display = "none";
      scanner.render(success, error);
      setTimeout(() => {
        document.getElementById('scid').style.display="flex";
      }, 3000);
    }
    document.getElementById("btn").onclick = scane;
    let resl = "afjkf";
    const success = (result) => {
      play();
      resl = result;
      // change here for defrente qrcode
      resl = resl.substring(6);
      scanner.clear();
      handlesubmit2(resl);
    };
    const clerscanner = ()=>{scanner.clear()};
    document.getElementById('scaneclear').onclick=clerscanner;
    function play() {
      new Audio(sound).play();
    }
    function error(err) {
      console.error(err);
      // Prints any errors to the console
    }
    const handlesubmit2 = async (resl) => {
      setLoad(true)
      setId(resl)
      // let resl = document.getElementById('getid').innerText;
      if (resl == "") {
        alert("invalid id");
        return;
      }
      if (!mongoose.Types.ObjectId.isValid(resl)) {
        setWar("Duplicate Id...");
        setTimeout(() => {
          document.getElementById("war").style.display = "unset";
        }, 500);
        return;
      }
      const res = await fetch(`${backend}/check/${resl}`, { method: "GET" });
      const data = await res.json();
      if (data.status == "ok") {
        setdata(data.data);
        setLoad(false);
        setPart(data.data.participants);
        setTimeout(() => {
          document.getElementById("cardt").style.display = "unset";
        }, 500);
      } else {
        setWar(data.status);
        setTimeout(() => {
          document.getElementById("war").style.display = "unset";
        }, 500);
        // alert(data.status);
      }
    };
  });
  useEffect(() => {
    if (!islogin) {
      nav("/signIn"); 
    } else {
      document.getElementById("checkdt").style.display = "none";
      document.getElementById("cardt").style.display = "none";
      document.getElementById("war").style.display = "none";
      // document.getElementById('qrcodebtn').style.display="none";
      setOpen(true);
    }
  }, []);
  function checkid() {
    document.getElementById('scaneclear').click();
    setTimeout(() => {
      setId("");
      document.getElementById("checkdt").style.display = "unset";
      document.getElementById("scanner").style.display = "none";
      document.getElementById("cardt").style.display = "none";
    }, 500);
  }
  const verify = async (status)=>{
    if(mId==""){
      logout();
    }
    // mId,id,status,time
    const res = await fetch(`${backend}/scan/detail`,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        mId,
        status,
        icard:id,
        time:Date.now().toString(),
      })
    })
    const data =await res.json();
    if(data.status=="ok"){
      document.getElementById("checkdt").style.display = "none";
      document.getElementById("cardt").style.display = "none";
      document.getElementById("war").style.display = "none";
    }else{
      alert(data.status);
    }
  }
  return (
    <div className="main" style={{display:`${open?"flex":"none"}`}}>
      <nav>
        {/* <div className="nav-links">
          <LightModeOutlinedIcon id="light" onClick={themeSwitch} />
        </div> */}
        <div id="logo">
          <AddCardIcon /> MyId
        </div>
        <button  id="tm" onClick={themeSwitch}>
  <LightModeOutlinedIcon id="light" onClick={themeSwitch} />
        </button>
        <button className="btn" id="lo" onClick={()=>{
          window.localStorage.clear();
          setIslogin(false);
          setTimeout(() => {
            
            nav("/signIn");
          }, 500);
        }}>
          {islogin ? "LogOut" : "SignIn"}
        </button>
      </nav>

      <div id="optn">
        <button className="btn" id="btn">Scan QR Code &nbsp; <QrCodeScannerIcon /> </button>
        <button className="btn" id="scid" onClick={checkid}>
          Check By Id  &nbsp;<DocumentScannerIcon />
        </button>
        <button id="scaneclear" style={{display:"none"}}>clearscaner</button>
      </div>
      <div id="checkdt" className="checkdt">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlesubmit();
          }}
        >
          <input
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
            type="text"
            placeholder="Enter Id here"
          />
          <button type="submit" id="gbt">GO</button>
        </form>
      </div>
      <div id="ctrrrr">
        <h1 id="war">{war}</h1>
      </div>
      <div id="scanner">
        <div id="reader"></div>
        <div id="result"></div>
        {/* <button id='qrcodebtn'>get Details</button> */}
      </div>
      
      <div style={{display:`${load?"flex":"none"}`,minHeight:"50vh",justifyContent:'center',alignItems:'center'}}><Loading/></div>
      <div id="cardt">
         <div>
          <h1 id="ress">Valid Icard...</h1>
        <header className="event-sec">
          <div className="e-title">
            Details
            <span id="golden"> Of </span>
            Group
          </div>
        </header>
        <div className="a-info">
          <div className="i-field">
            <div className="i-l">
              <div className="ol-l">Group Picture</div>
            </div>
            <div className="i-r i-r-dp">
              <img src={data.groupImg} alt="" />
            </div>
          </div>
          <div className="i-field">
            <div className="i-l">
              <div className="ol-l">Leader Picture</div>
            </div>
            <div className="i-r i-r-dp">
              <img src={data.LeaderImg} alt="" />
            </div>
          </div>
          <div className="i-field">
            <div className="i-l">
              <div className="ol-l">Event Name</div>
            </div>
            <div className="i-r">{data.eventName}</div>
          </div>
          <div className="i-field">
            <div className="i-l">
              <div className="ol-l">Leader Name</div>
            </div>
            <div className="i-r">{data.LeaderName}</div>
          </div>
          <div className="i-field">
            <div className="i-l">
              <div className="ol-l">Group Name</div>
            </div>
            <div className="i-r">{data.gname}</div>
          </div>

          <div className="i-field">
            <div className="i-l">
              <div className="ol-l">No. of Artist</div>
            </div>
            <div className="i-r m-info">
              <div>
                <p>Artists count : {data.NoArtist}</p>
              <br />
              <br />
              </div>
              <div id="colmn">
                {part.map((ob) => {
                  return (
                    <div>
                      <p>name: {ob.name}</p>
                      <p>gender: {ob.gender}</p>
                      <p>email: {ob.email}</p>
                      <p>phoneNo: {ob.phoneNo}</p>
                      <br />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div id="optn2">
            <button className="btn" onClick={()=>{verify(true)}}>Verify</button>
            <button className="btn" onClick={()=>{verify(false)}} style={{backgroundColor:'red'}}>Invalid</button>
          </div>
        </div>
        
        </div>
      </div>
      
      
    </div>
  );
}

export default Scanner;
