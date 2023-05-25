import { useEffect, useContext, useState } from "react";
// import { useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";
import "../../Css/Event.css";
import Loading from "./Loading";
const Events = (props) => {
  const { backend, islogin, setEventId } = props;
  const nav = useNavigate();
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
  const handlejoin = (ev) => {
    if (islogin) {
      setEventId({
        id: ev._id,
        name: ev.name,
      });
      setTimeout(() => {
        nav("/regevent");
      }, 800);
    } else {
      nav("/signIn");
    }
  };
  useEffect(() => {
    getevents();
  }, []);
  return (
    <div className="eee" id="H3">
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
            {events.length == 0 ? (
              <div style={{ width: "100%" }}>
                <Loading />
              </div>
            ) : (
              events.map((cr) => {
                return (
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
                      <div
                        id="join"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          handlejoin(cr);
                        }}
                      >
                        Join Now
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Events;
