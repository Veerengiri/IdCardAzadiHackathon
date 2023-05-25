import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Css/ArtistSignIn.css";
import AddCardIcon from "@mui/icons-material/AddCard";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useEffect } from "react";
const ArtistSignIn = (props) => {
  const {backend,setIslogin,setUserId}=props;
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [signin,setSignin]=useState("Sign In")
  const nav = useNavigate();
  const handlesubmit = async ()=>{
    if(signin=="Just A Sec..."){
      return;
    }
    setSignin("Just A Sec...");
    const res= await fetch(`${backend}/api/login`,{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    });
    const data = await res.json();
    if(data.status=="ok"){
      setIslogin(true);
      setUserId(data.id);
      window.localStorage.setItem("handleId",data.id);
      setTimeout(() => {
        nav("/");
      }, 1000);
    }else{
      alert(data.status);
    }
    setSignin("Sign In")
  }
  const othenticate = async (jwt)=>{
    const res = await fetch(`${backend}/profile/${jwt}`,{method:"GET"});
    const data = await res.json();
    if(data.status=="ok"){
      setIslogin(true);
      setUserId(data.id);
      setTimeout(() => {
        nav("/");
      }, 1000);
    }
  }
  useEffect(()=>{
    const id  = window.localStorage.getItem("handleId");
    if(id){
      setIslogin(true);
      setUserId(id);
      nav("/");
      
    }
  },[])
  return (
    <>
      <section id="ArtSignIn">
        <div className="left">
          <img
            src="https://idcardgenrator.s3.ap-northeast-1.amazonaws.com/siteimage/art-log.png"
            alt=""
          />
        </div>
        <div className="right">
          <div className="data">
            <header>
              <AddCardIcon id="logo" className="gold" />
              My-ID
            </header>
            <h1>Welcome back!</h1>
            <h2>Please sign in to continue.</h2>
            <form action="#">
              <h3>Email</h3>
              <input type="text" placeholder="abcd123@xyz.com" value={email} onChange={(d)=>{setEmail(d.target.value)}}/>
              <h3>Password</h3>
              <input type="password" placeholder="●●●●●●●●●●●" value={password} onChange={(d)=>{setPassword(d.target.value)}}/>
              <button type="submit" className="btn" onClick={(e)=>{
                e.preventDefault();
                handlesubmit();
              }}>
                {signin}
              </button>
            </form>
            <div className="b-box">
              <div className="btn">
                Login With <FacebookRoundedIcon />
              </div>
              <div className="btn">
                Login With <TwitterIcon />
              </div>
            </div>
            <p>
              <span className="gray">Don't have an account?</span>
              <Link to="/signUp">Create an Account</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArtistSignIn;
