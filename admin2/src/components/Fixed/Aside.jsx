import React from "react";
import AddCardIcon from "@mui/icons-material/AddCard";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FestivalOutlinedIcon from "@mui/icons-material/FestivalOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import FestivalIcon from "@mui/icons-material/Festival";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import EventIcon from "@mui/icons-material/Event";
import { Mycontext } from "./App";
import "../../Css/Aside.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect,useContext } from "react";
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { IconButton } from "@mui/material";import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
const Aside = (props) => {
  const {setIslogin,admin,id}=props;
  const nav= useNavigate();
  const logout=()=>{
    setIslogin(false);
    localStorage.clear();
    setTimeout(() => {
      nav("/signIn");
    }, 500);
  }
  // const ft =()=>{
  //   document.getElementById('aside').style.marginLeft="0"
  // }
  // const close = ()=>{
  //   document.getElementById('aside').style.marginLeft="-270px"
  // }
  const {setToggle}=useContext(Mycontext);
  const navfun=(des)=>{
    if(document.getElementById('toggelaside').style.visibility==="hidden"){
      setToggle(true);
      document.getElementById('aside').style.marginLeft="-270px"
    }
    nav(des);
  }

  return (
    <>
      <aside id="aside">
        <header>
          <div className="lg">

          <AddCardIcon id="logo" className="gold" />
          My-ID
          </div>
          <IconButton id="closebtn" onClick={()=>{document.getElementById('aside').style.marginLeft="-270px";
            document.getElementById('toggelaside').style.visibility="visible"
            }}> <CloseIcon /> </IconButton>
        </header>
        <section className="profile">
          <div className="dp">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3870/3870822.png"
              alt=""
            />
          </div>
          <div className="name">{id}</div>
          <div className="type gray" style={{color:"var(--gray2"}}>{admin}</div>
        </section>
        <section className="menu-links">
          <div className="g-1">
            <div className="title">Main</div>
            <p onClick={()=>{navfun("/")}} className="links" >
              <DashboardOutlinedIcon />
              Index
            </p>
          </div>
          <div className="g-2">
            <div className="title">General</div>
            <p onClick={()=>{navfun("/admin/event-list")}} className="links" >
              <FestivalOutlinedIcon />
              Event-List
            </p>
            <p onClick={()=>{navfun("/admin/charts")}} className="links">
              <InsertChartOutlinedIcon />
              Charts
            </p>
          </div>
          <div className="g-3">
            <div className="title">Add New</div>
            <p onClick={()=>{navfun("/admin/add/event")}} className="links" >
              <FestivalIcon />
              Add Events
            </p>
            <Link className="links" to="/addAdmin" style={{display:`${admin=="commisioner"?"flex":"none"}`}}>
             <ManageAccountsIcon />
              Add Admins
            </Link>
            <Link className="links" to="/addStaf" >
              <PersonAddIcon />
              Add Staff
            </Link>

            {/* <p className="links" >
              <EventIcon /> Add Bookmark
            </p> */}
          </div>
          <div className="g-4">
            <div className="title">Approvement</div>
            <p onClick={()=>{navfun("/admin/artist/table")}} className="links" >
              <PeopleIcon />
              Artists
            </p>

            <p onClick={()=>{navfun("/quarry")}}   className="links">
              <NewspaperIcon /> Querrys
            </p>
          </div>
          <div className="g-5">
            <div className="log-out" onClick={logout}>
              <LogoutIcon id="gold" /> LogOut
            </div>
          </div>
        </section>
      </aside>
    </>
  );
};

export default Aside;
