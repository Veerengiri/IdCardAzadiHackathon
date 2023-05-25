import React from "react";
import { Link } from "react-router-dom";
import "../../Css/ArtistSignIn.css";
import "../../Css/ArtUp.css";
import AddCardIcon from "@mui/icons-material/AddCard";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
const ArtUp = () => {
  return (
    <>
      <section id="ArtSignIn">
        <div className="left">
          <img
            src="https://idcardgenrator.s3.ap-northeast-1.amazonaws.com/siteimage/auppp.png"
            alt=""
            id="Aup"
          />
        </div>
        <div className="right">
          <div className="data">
            <header>
              <AddCardIcon id="logo" className="gold" />
              My-ID
            </header>
            <h1>Get Started</h1>
            <h2>It's free to SignUp and only takes a minute.</h2>
            <form action="#">
              <h3>Firstname & Lastname</h3>
              <input type="text" placeholder="Enter your first and last name" />
              <h3>Email</h3>
              <input type="text" placeholder="abcd123@xyz.com" />
              <h3>Password</h3>
              <input type="password" placeholder="●●●●●●●●●●●" />
              <button type="submit" className="btn">
                Create Account
              </button>
            </form>
            <div className="b-box">
              <div className="btn">
                SignUp With <FacebookRoundedIcon />
              </div>
              <div className="btn">
                SignUp With <TwitterIcon />
              </div>
            </div>
            <p>
              <span className="gray">Already have an account?</span>
              <Link to="/signIn">Sign In</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArtUp;
