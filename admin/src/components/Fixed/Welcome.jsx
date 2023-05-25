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
  return (
    <div>
      <center className="welcome">
       
        <h1>
          Welcome to <span className="gold">myID</span>
        </h1>
        <br />
        <br />
        <p>
        "Welcome to our web portal for generating ID cards for artists. Our portal provides a streamlined and efficient process for creating and approving ID cards. The workflow includes review and approval by a clerk, officer, and commissioner to ensure accuracy and authenticity. Once the ID card is approved, it will be promptly sent to the artist. We are dedicated to providing a quick and secure service for all of our artist clients. Thank you for choosing our web portal for your ID card needs."
        </p>
      </center>
    </div>
  );
};

export default Welcome;
