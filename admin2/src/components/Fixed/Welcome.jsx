import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/App.css";
const Welcome = (props) => {
  const nav = useNavigate();
  const {islogin}=props;
  useEffect(()=>{
    if(!islogin){
      nav("/signIn");
    }
  },[])
  //   particlesJS.load('particles-js', 'assets/particles.json', function() {
  // console.log('callback - particles.js config loaded');
// });
  return (
    <div id="particles-js">
      <center className="welcome">
       
        <h1>
          Welcome to <span className="gold">myID</span>
        </h1>
      
        <br />
        <div className="ppp">

        <p>
        Welcome to our web portal for generating ID cards for artists. </p>
        <p> Our portal provides a streamlined and efficient process for creating and approving ID cards.  The workflow includes review and approval by a clerk, officer, and commissioner to ensure accuracy and authenticity. </p> <p>
           Once the ID card is approved, it will be promptly sent to the artist. We are dedicated to providing a quick and secure service for all of our artist clients.  </p><p> Thank you for choosing our web portal for your ID card needs.
        </p>
          
        </div>
      </center>
    </div>
  );
};

export default Welcome;
