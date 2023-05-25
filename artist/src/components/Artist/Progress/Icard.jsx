import React, { useEffect, useRef } from "react";
import "../../../Css/Icard.css";
import "./Nicard.css";
import Qrcode from "./Qrcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import Tilt from "react-parallax-tilt";
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useReactToPrint } from "react-to-print";

const Icard = (props) => {
  const { backend, islogin, regId } = props;
  const [apr, setApr] = useState(false);
  const [carddata, setCarddata] = useState({
    _id: "-",
    userId: "-",
    gname: "-",
    name: [
      {
        name: "-",
        gender: "-",
        email: "-",
        phoneNo: "-",
      },
      {
        name: "-",
        gender: "-",
        email: "-",
        phoneNo: "-",
      },
    ],
    tnartist: 0,
    eventId: "-",
    eventName: "-",
    TOP: "-",
    FOICD: "-",
    DOA: "-",
    applyDay: "-",
    applyMonth: "-",
    applyYear: "-",
    fulltime: "-",
    gphoto: "#",
    img: "#",
  });

  const [edt, setedt] = useState({});
  const nav = useNavigate();
  //   const printDocument = async () => {

  // };
  const componentRef = useRef();
  const printDocument = useReactToPrint({
    content: () => componentRef.current,
  });

  // First, import the jsPDF library

  // Next, select the element with the ID "myicard"

  // const printDocument = () =>{
  //   let myIcard = document.getElementById('myPage');

  //   // Use html2canvas to render the element as an image
  //   html2canvas(myIcard).then(canvas => {
  //     // Get the image data from the canvas
  //     let imgData = canvas.toDataURL('image/png');

  //     // Create a new PDF document
  //     let pdf = new jsPDF();

  //     // Add the image data to the PDF
  //     pdf.addImage(imgData, 'PNG', 0, 0);

  //     // Download the PDF
  //     pdf.save("myicard.pdf");
  //   });
  // }
  const getuserdt = async () => {
    const res = await fetch(`${backend}/api/getstatus/${regId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    if (data.pg == 3) {
      setApr(true);
      setCarddata(data.data);
      setedt(data.event);
    }
    switch (data.pg) {
      case 0:
        document.getElementById("r0").style.boxShadow =
          "0.5px 0.5px 5px 6px rgba(0, 128, 0, 0.4)";
        break;
      case 1:
        document.getElementById("p1").style.backgroundColor = "rgb(15,180, 18)";
        document.getElementById("r1").style.backgroundColor = "rgb(15,180, 18)";
        document.getElementById("r1").style.boxShadow =
          "0.5px 0.5px 5px 6px rgba(0, 128, 0, 0.4)";

        break;
      case 2:
        document.getElementById("p1").style.backgroundColor = "rgb(15,180, 18)";
        document.getElementById("r1").style.backgroundColor = "rgb(15,180, 18)";
        document.getElementById("p2").style.backgroundColor = "rgb(15,180, 18)";
        document.getElementById("r2").style.backgroundColor = "rgb(15,180, 18)";
        document.getElementById("r2").style.boxShadow =
          "0.5px 0.5px 5px 6px rgba(0, 128, 0, 0.4)";
        break;
      case 3:
        document.getElementById("p1").style.backgroundColor = "rgb(15,180, 18)";
        document.getElementById("r1").style.backgroundColor = "rgb(15,180, 18)";
        document.getElementById("p2").style.backgroundColor = "rgb(15,180, 18)";
        document.getElementById("r2").style.backgroundColor = "rgb(15,180, 18)";
        document.getElementById("p3").style.backgroundColor = "rgb(15,180, 18)";
        document.getElementById("r3").style.backgroundColor = "rgb(15,180, 18)";

        document.getElementById("r3").style.boxShadow =
          "0.5px 0.5px 5px 6px rgba(0, 128, 0, 0.4)";
        // document.getElementById("btn").style.backgroundColor = "#7211c7"
        // setbtn(false)
        break;
    }
  };
  const showId = () => {
    document.getElementById("idcard").style.display = "flex";
    document.getElementById("hid-btn").style.display = "flex";
  };
  useEffect(() => {
    document.getElementById("idcard").style.display = "none";
    document.getElementById("hid-btn").style.display = "none";
    if (islogin) {
      getuserdt();
      // printDocument();
    } else {
      nav("/");
    }
  }, []);
  return (
    <div>
      <div style={{ padding: "20px" }}>
        <div id="progress" className="progresscontener">
          <Tilt
            glareEnable={true}
            glareColor="#ebe7ee47"
            glarePosition="all"
            tiltMaxAngleX="18"
            tiltMaxAngleY="12"
            className="progressbar"
          >
            <div className="prbox"></div>
            <p className="gold">Id Status</p>
            <div id="0">
              <div
                id="r0"
                className="roundfill"
                style={{ backgroundColor: "rgb(15,190, 18)" }}
              ></div>
              <div className="approved">Registerd</div>
            </div>
            <div id="p1" className="progressline"></div>
            <div>
              <div id="r1" className="roundfill"></div>
              <div className="approved">Approved by Clerk</div>
            </div>
            <div id="p2" className="progressline"></div>
            <div>
              <div id="r2" className="roundfill"></div>
              <div className="approved">Approved by DYDO</div>
            </div>
            <div id="p3" className="progressline"></div>
            <div>
              <div id="r3" className="roundfill"></div>
              <div className="approved">Approved by commisioner</div>
            </div>
          </Tilt>
          <button
            id="btn"
            className="btn"
            onClick={showId}
            style={{ display: `${apr ? "flex" : "none"}` }}
          >
            Generate Id
          </button>
        </div>
      </div>

      {/* <section className="ID" id="idcard" >
        <div className="card" id="myPage">
          <div className="content" >
            <div className="front" >
              <div className="id-info">
                <div className="id-TT">
                  <div className="dp">
                    <img
                      src={`${carddata.img}`}
                      alt=""
                    />
                  </div>
                  <h1>{carddata.name[0].name}</h1>
                  <h3>Artist</h3>
                </div>
                <div className="id-bot">
                  <div className="id-bl">
                    <h2>Group</h2>
                    <h2>Members</h2>
                    <h2>Gender</h2>
                   
                    <h2>Phone</h2>
                    <h2>EventName</h2>
                    <h2>Vanue</h2>
                    <h2 className="goldd" id="big">Event-Date</h2>
                  </div>
                  <div className="id-br">
                    <h2>: {carddata.gname}</h2>
                    <h2>: {carddata.tnartist}</h2>
                    <h2>: {carddata.name[0].gender}</h2>
             
                    <h2>: {carddata.name[0].phoneNo} </h2>
                    <h2>: {edt.name}</h2>
                    <h2>: {edt.destination}</h2>
                    <h2 id="big">: {edt.eventDay}-{edt.eventMonth}-{edt.eventYear}</h2>
                  </div>
                </div>
                <div className="ftr"></div>
              </div>
            </div>
            <div className="back" >
              <div className="fbtr"></div>
              <div className="bk-t">
                <Qrcode value={carddata._id} size={140} />
                <p style={{ color: "black", fontWeight: "700", margin: "13.5px 0" }}>ID : {carddata._id}</p>
              </div>
              <div className="bk-txt">
                <big> Terms and conditions </big>
                <small
                >This ID is given by the Ministry of Culture, Government of
                  India, required for attending events, can be used in hospitals,
                  bus & train.
                </small>
              </div>
            </div>
          </div>
        </div>
        <button onClick={printDocument} className="btn">
          Print
        </button>
      </section> */}

      <section className="ID print">
        <div id="idcard" ref={componentRef}>
          <div className="cardd" id="myPage">
            <div className="contentt parent">
              <div className="frontt">
                <div className="id-info">
                  <div className="id-TT">
                    <div className="dp">
                      <img src={`${carddata.img}`} alt="" />
                    </div>
                    <h1>{carddata.name[0].name}</h1>
                    <h3>Artist</h3>
                  </div>
                  <div className="id-bot">
                    <div className="id-bl">
                      <h2>Group</h2>
                      <h2>Members</h2>
                      <h2>Gender</h2>
                      {/* <h2>Mail</h2> */}
                      <h2>Phone</h2>
                      <h2>EventName</h2>
                      <h2>Vanue</h2>
                      <h2 className="goldd" id="big">
                        Event-Date
                      </h2>
                    </div>
                    <div className="id-br">
                      <h2>: {carddata.gname}</h2>
                      <h2>: {carddata.tnartist}</h2>
                      <h2>: {carddata.name[0].gender}</h2>
                      {/* <h2>: {carddata.name[0].email}</h2> */}
                      <h2>: {carddata.name[0].phoneNo} </h2>
                      <h2>: {edt.name}</h2>
                      <h2>: {edt.destination}</h2>
                      <h2 id="big">
                        : {edt.eventDay}-{edt.eventMonth}-{edt.eventYear}
                      </h2>
                    </div>
                  </div>
                  <div className="ftr"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="cardd" id="myPage">
            <div className="contentt parent">
              <div className="backk">
                <div className="fbtr"></div>
                <div className="bk-t">
                  <Qrcode value={carddata._id} size={110} />
                  <p
                    style={{
                      color: "black",
                      fontWeight: "700",
                      margin: "7px 0",
                    }}
                  >
                    ID : {carddata._id}
                  </p>
                </div>
                <div className="bk-txt">
                  <big> Terms and conditions </big>
                  <small>
                    This ID is given by the Ministry of Culture, Government of
                    India, required for attending events, can be used in
                    hospitals, bus & train.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bt-cont" id="hid-btn">
          <button onClick={printDocument} className="btn">
            Print
          </button>
        </div>
      </section>
    </div>
  );
};

export default Icard;
