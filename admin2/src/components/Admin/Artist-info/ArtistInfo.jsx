import React from "react";
import { useState,useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import "../../../Css/ArtistInfo.css";
const ArtistInfo = (props) => {
  const { admin, id, backend, islogin } = props;

  const [showpart, setShowpart] = useState(false);
  const [sp, setsp] = useState("Show all participants");
  const [adminapr, setAdminapr] = useState(false);
  const [aprbtn,setAprbtn]=useState("Approved");
  const nav = useNavigate();
  const [artist, setArtist] = useState({
    gname: "--",
    name: [
      {
        name: "--",
        gender: "--",
        email: "--",
        phoneNo: "--",
      },
    ],
    tnartist: 0,
    eventId: "--",
    eventName: "--",
    TOP: "--",
    FOICD: "--",
    DOA: "--",
    applyDay: "--",
    applyMonth: "--",
    applyYear: "--",
    fulltime: "--",
    gphoto: "#",
    img: "#",
    adhar: "#",
    sign: "#",
    PEON: "--",
    officer: "--",
    commisioner: "--",
    isCardAlloted: false,
  });
  const [lead, setLead] = useState({
    name: "--",
    gender: "--",
    email: "--",
    phoneNo: "--",
  });
  const form = useRef();
  const form2 = useRef();


  const getartist = async () => {
    const res = await fetch(`${backend}/api/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setArtist(data);
    setLead(data.name[0]);
    if (admin == "clerk" && data.PEON == "Approved") {
      setAdminapr(true);
    } else if (admin == "dydo" && data.officer == "Approved") {
      setAdminapr(true);
    } else if (admin == "commisioner" && data.commisioner == "Approved") {
      setAdminapr(true);
    }
  };
  const showpt = () => {
    if (showpart) {
      setShowpart(false);
      setsp("Show all participants");
    } else {
      setShowpart(true);
      setsp("Hide participants");
    }
  };
  const reject = async () => {
    if (
      window.confirm(
        "Are you want to REJECT? If you reject than this data will be delete..."
      )
    ) {
      const res = await fetch(`${backend}/api/getuser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      alert(data.status);
    }
  };
  const approve = async () => {
    if (window.confirm("approve?")) {
      const res = await fetch(`${backend}/api/approve/${admin}/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status != "ok") {
        alert(data.status);
      } else {
        setAdminapr(true);
      }
    }
  };
  const sendmail=async ()=>{
    await emailjs.sendForm('service_z80kdsc', 'template_1g6p4vm', form.current, "tAnIMRTGjOth0eHFS")
    .then((result) => {
        console.log(result.text);
        alert("Mail is send")
        return true
    }, (error) => {
        console.log(error.text);
        return false
    });
  }
  const sendmailc= async ()=>{
    await emailjs.sendForm('service_z80kdsc', 'template_1g6p4vm', form.current, "tAnIMRTGjOth0eHFS")
    .then((result) => {
        console.log(result.text);
        alert("Mail is send")
        return true
    }, (error) => {
        console.log(error.text);
        return false
    });
  }
  useEffect(() => {
    if (!islogin) {
      nav("/signIn");
    } else {
      // if(admin=="clerk"){
      //   setAprbtn("Send Email For Verification")
      // }
      setTimeout(() => {
        console.log(id);
        getartist();
      }, 1000);
    }
    sendmail();
  }, []);
  return (
    <div>
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
            <div className="ol-l">Event Name</div>
          </div>
          <div className="i-r">{artist.eventName}</div>
        </div>
        <div className="i-field">
          <div className="i-l">
            <div className="ol-l">Leader Name</div>
          </div>
          <div className="i-r">{lead.name}</div>
        </div>
        <div className="i-field">
          <div className="i-l">
            <div className="ol-l">Group Name</div>
          </div>
          <div className="i-r">{artist.gname}</div>
        </div>
        <div className="i-field">
          <div className="i-l">
            <div className="ol-l">Contact Number</div>
          </div>
          <div className="i-r">{lead.phoneNo}</div>
        </div>
        <div className="i-field">
          <div className="i-l">
            <div className="ol-l">Email Address</div>
          </div>
          <div className="i-r">{lead.email}</div>
        </div>
        <div className="i-field">
          <div className="i-l">
            <div className="ol-l">No. of Artist</div>
          </div>
          <div className="i-r m-info">
            <div>
              <p>{artist.tnartist}</p>
              <button onClick={showpt} className="sm">
                {sp}
              </button>
            </div>
            <div style={{ display: `${showpart ? "unset" : "none"}` }}>
              {artist.name.map((ob) => {
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
        {/* <div className="i-field">
          <div className="i-l">
            <div className="ol-l">Performance Theme</div>
          </div>
          <div className="i-r">Cultural</div>
        </div> */}

        <div className="i-field">
          <div className="i-l">
            <div className="ol-l">Awards / Honors</div>
          </div>
          <div className="i-r">{artist.DOA}</div>
        </div>
        <div className="i-field">
          <div className="i-l">
            <div className="ol-l">Performed Before</div>
          </div>
          <div className="i-r">{artist.FOICD}</div>
        </div>
        <div className="i-field">
          <div className="i-l">
            <div className="ol-l">Group Picture</div>
          </div>
          <div className="i-r i-r-dp">
            <img src={artist.gphoto} alt="" />
          </div>
        </div>
        <div className="i-field">
          <div className="i-l">
            <div className="ol-l">Leader Picture</div>
          </div>
          <div className="i-r i-r-dp">
            <img src={artist.img} alt="" />
          </div>
        </div>
        <div className="i-field">
          <div className="i-l">
            <div className="ol-l">Leader's Aadhar</div>
          </div>
          <div className="i-r i-r-ad">
            <img src={artist.adhar} alt="" />
          </div>
        </div>
        <div className="i-field">
          <div className="i-l">
            <div className="ol-l">Leader's Signature</div>
          </div>
          <div className="i-r i-r-s">
            <img src={artist.sign} alt="" />
          </div>
        </div>
        <center className="wpp">
          

          <div className="forbtn" >
            <div
              className="btn submit"
              onClick={approve}
              style={{ display: `${!adminapr ? "unset" : "none"}` }}
            >
              Approve
            </div>
          </div>
          <div className="forbtn" >
            <div
              className="btn submit"
              onClick={sendmail}
              // style={{ display: `${!adminapr ? "unset" : "none"}` }}
            >
              Send Mail for Verify
            </div>
          </div>


        {/* //COMPULSUR */}
          <div className="forbtn">
            <div
              className="btn reset"
              onClick={reject}
              style={{ display: `${!adminapr ? "unset" : "none"}` }}
            >
              Reject
            </div>
          </div>
        </center>
        {/* <div className="i-field">
          <div className="i-l"></div>
          <div className="i-r"></div>
        </div> */}
        <form style={{display:"none"}} ref={form} >
          <label>Name</label>
          <input type="text" value={"virengirigoswami3@gmail.com"} onChange={()=>{}} name="user_name" /><br />
          <label>Email</label>
          <input type="email" value={"khuntpriyansh@gmail.com"} onChange={()=>{}} name="user_email" /><br />
          <label>Message</label>
          <textarea value={"your from is seen and you have to come after 3 days.  sedule_ofline_meet: https://calendly.com/lodhiyaamin88/verification-process?month=2023-02"} onChange={()=>{}} name="message" /><br />
          <input type="submit" value="Send" />
        </form>
        <form style={{display:"none"}} ref={form2}>
          <label>Name</label>
          <input type="text" value={"virengirigoswami3@gmail.com"} onChange={()=>{}} name="user_name" /><br />
          <label>Email</label>
          <input type="email" value={"khuntpriyansh@gmail.com"} onChange={()=>{}} name="user_email" /><br />
          <label>Message</label>
          <textarea value={"Congratulations! You have cleared all the required steps till now. Proceeding further, you are required to appear for the offline audition. Please schedule your slot through the following link: https://calendly.com/lodhiyaamin88/audition-commissioner "} onChange={()=>{}} name="message" /><br />
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
};

export default ArtistInfo;
