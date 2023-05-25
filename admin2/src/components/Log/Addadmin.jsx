import React,{useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Css/ArtistSignIn.css";
import "../../Css/ArtUp.css";
import AddCardIcon from "@mui/icons-material/AddCard";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
const Addadmin = (props) => {
    const [role,setRole]=useState("Select Role");
    const [id,setId]=useState("");
    const [password,setPassword]=useState("");
    const [isopen,setIsopen]=useState(false)
    const {backend,islogin,admin}=props;
    const nav = useNavigate();
    const createac =async (e)=>{
        e.preventDefault()
        if(role=="Select Role"|| id==""|| password==""){alert("invalid info"); return}
        const res= await fetch(`${backend}/admin/reg`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                role,
                email:id,
                password
            })
        })
        const data = await res.json();
        alert(data.status);
        if(data.status=="ok"){
            nav('/');
        }
    }
    useEffect(()=>{
      if(islogin && admin=="commisioner" ){
        
      }else{
        nav("/");
      }
    },[])
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
            <h1>Add Admin</h1>
            
            <form action="#">
              <h3>Role</h3>
              {/* <input type="text" placeholder="Enter your first and last name" /> */}
             <div id="sel-role">

              <p  style={{cursor:'pointer'}} onClick={()=>{
                setIsopen(true)
              }}>{role}</p>
              <div  style={{display:`${isopen?"unset":"none"}`}}>
                <p style={{cursor:'pointer'}} onClick={()=>{setRole("clerk"); setIsopen(false) }}>Clerk</p>
                <p style={{cursor:'pointer'}} onClick={()=>{setRole("dydo"); setIsopen(false) }}>dydo</p>
                <p style={{cursor:'pointer'}} onClick={()=>{setRole("commisioner"); setIsopen(false) }}>Commisioner</p>
              </div>
              </div>
              <br />
              {/* <h3>Profile picture</h3>
              <input  value={id} onChange={(e)=>{setId(e.target.value)}} type="file" placeholder="abcd123" /> */}
              <h3>Id</h3>
              <input value={id} onChange={(e)=>{setId(e.target.value)}} type="text" placeholder="abcd123" />
              <h3>Password</h3>
              <input value={password} onChange={(e)=>{setPassword(e.target.value)}}  type="password" placeholder="●●●●●●●" />
              <button type="submit" className="btn" onClick={createac}>
                Create Account
              </button>
            </form>
     
          </div>

        </div>
      </section>
    </>
  );
};

export default Addadmin;
