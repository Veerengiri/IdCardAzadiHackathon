import { useEffect, useContext, useState } from "react";
// import { useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";
import "../../Css/Event.css";
import Loading from "./Loading";
const Events = (props) => {
  const {backend,islogin}=props;
  const user = "admin";
  const [events, setEvents] = useState([]);
  
 const getevents = async () => {
    const res = await fetch(`${backend}/api/getevent`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    let final = data.events;
    for (let i = 0; i < final.length; i++) {
      let month = final[i].eventMonth;
      let month2 = "-";
      switch (month) {
        case "01":
          month2 = "Jan";
          break;
        case "02":
          month2 = "Feb";
          break;
        case "03":
          month2 = "Mar";
          break;
        case "04":
          month2 = "Apr";
          break;
        case "05":
          month2 = "May";
          break;
        case "06":
          month2 = "Jun";
          break;
        case "07":
          month2 = "Jul";
          break;
        case "08":
          month2 = "Aug";
          break;
        case "09":
          month2 = "Sept";
          break;
        case "10":
          month2 = "Oct";
          break;
        case "11":
          month2 = "Nov";
          break;
        case "12":
          month2 = "Dec";
          break;
      }
      final[i].eventMonth = month2;
    }
    setEvents(final);
  };
  const deleteEvent = async (id) => {
    if (window.confirm("delete?")) {
      const res = await fetch(`${backend}/api/devent/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      alert(data.status);
    }
  };
  const nav = useNavigate();
  useEffect(() => {
    if(!islogin){
      nav("/singIn");
    }
    getevents();
  }, []);
  return (
    <div className="eee">
      <div>
        <header className="event-sec">
          <center>
            <div className="e-title">
              Current
              <span id="golden"> List Of </span>
              Events
            </div>
          </center>
        </header>
        <section>
          <div className="e-list">
            {events.length===0? <div style={{width:"100vw"}} ><Loading/></div> :events.map((cr) => {
              return (
                <div
                >
                  <div className="card">
                    <div className="card-img">
                      <img src={cr.image} />
                      <div className="time">
                        {cr.eventDay} <br /> {cr.eventMonth}
                      </div>
                    </div>
                    <div className="card-info">
                      <div className="info-loc">{cr.destination}</div>
                      <div className="info-t">{cr.name}</div>
                      <div className="info-des">
                        {cr.desc} <br />
                      </div>
                      {/* <div className="join btn">Join Now</div> */}
                    </div>
                    <button
                      id="del"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteEvent(cr._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Events;
