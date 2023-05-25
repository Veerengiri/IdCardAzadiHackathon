import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../../Css/App.css";
import "../Fixed/Menu";
import Menu from "../Fixed/Menu";
import Events from "../Fixed/Events";
import Footer from "../Fixed/Footer";
import EventForm from "../Artist/EventForm/EventForm";
import ProgressCheck from "../Artist/Progress/ProgressCheck";
import ArtistSignIn from "../Log/ArtistSignIn";
import ArtUp from "../Log/ArtUp";
import Icard from "../Artist/Progress/Icard";
import Error404 from "../Fixed/Error404";
import { dividerClasses } from "@mui/material";
import Home from "../Artist/Home/Home";
import About from "../Artist/Home/About";
import Contact from "../Artist/Home/Contact";
import LegendaryCursor from "legendary-cursor";
import Calendar from "../Calendar/Calendar";

window.addEventListener("load", () => {
  LegendaryCursor.init({
    // lineSize: 0.05,
    // opacityDecrement: 0.55,
    // speedExpFactor: 0.8,
    // lineExpFactor: 0.6,
    // sparklesCount: 65,
    // maxOpacity: 0.99,

    lineSize: 0,
    opacityDecrement: 0,
    speedExpFactor: 0.9,
    lineExpFactor: 0,
    sparklesCount: 30,
    maxOpacity: 0.000001, // should be a number between [0 ... 1]
    texture1:
      "https://idcardgenrator.s3.ap-northeast-1.amazonaws.com/siteimage/Screenshot+(426).png", // texture displayed on mouse hover
    texture2:
      "https://idcardgenrator.s3.ap-northeast-1.amazonaws.com/siteimage/Screenshot+(426).png", // texture displayed on mouse hover
    // texture2:         "http://path_to_texture",      // texture displayed on mouse click
    texture3:
      "https://idcardgenrator.s3.ap-northeast-1.amazonaws.com/siteimage/Screenshot+(426).png", // texture displayed on sparkles
  });
});
function App() {
  const [count, setCount] = useState(0);
  const [islogin, setIslogin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [eventId, setEventId] = useState(null);
  const [regId, setRegId] = useState(null);
  // const backend = "https://myid-veerengiri.vercel.app";
  const backend = "http://localhost:8080"
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/signIn"
            element={
              <ArtistSignIn
                backend={backend}
                setIslogin={setIslogin}
                setUserId={setUserId}
              />
            }
          />
          <Route path="/signUp" element={<ArtUp backend={backend} />} />
          <Route path="*" element={<Error404 />} />
          <Route
            path="/"
            element={
              <div id="art-site">
                <Menu islogin={islogin} setIslogin={setIslogin} />
                <Home />
                <About />
                <Footer />
              </div>
            }
          />
          <Route
            path="/progress"
            element={
              <div id="art-site">
                <Menu islogin={islogin} setIslogin={setIslogin} />
                <ProgressCheck
                  backend={backend}
                  islogin={islogin}
                  userId={userId}
                  setRegId={setRegId}
                />
                {/* <Footer /> */}
              </div>
            }
          />
          <Route
            path="/icard"
            element={
              <div id="art-site">
                <Menu islogin={islogin} setIslogin={setIslogin} />
                <Icard backend={backend} islogin={islogin} regId={regId} />
                {/* <Footer /> */}
              </div>
            }
          />
          <Route
            path="/events"
            element={
              <div id="art-site">
                <Menu islogin={islogin} setIslogin={setIslogin} />
                <Events
                  backend={backend}
                  islogin={islogin}
                  setEventId={setEventId}
                />
                {/* <Footer /> */}
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div id="art-site">
                <Menu islogin={islogin} setIslogin={setIslogin} />
                <Contact backend={backend} islogin={islogin} userId={userId} />
                {/* <Footer /> */}
              </div>
            }
          />
          <Route
            path="/cal"
            element={
              <div id="art-site">
                <Menu islogin={islogin} setIslogin={setIslogin} />
                <Calendar backend={backend} islogin={islogin} uId={userId} />
                {/* <Footer /> */}
              </div>
            }
          />
          <Route
            path="/regevent"
            element={
              <div id="art-site">
                <Menu islogin={islogin} setIslogin={setIslogin} />
                <EventForm
                  backend={backend}
                  islogin={islogin}
                  userId={userId}
                  eventId={eventId}
                />
                {/* <Footer /> */}
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
