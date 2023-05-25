import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import "../../Css/Menu.css";import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';import CloseIcon from '@mui/icons-material/Close';
import { useContext } from "react";
import { Mycontext } from "./App";
import { Link } from "react-router-dom";
const Menu = () => {
  let colTheme = document.getElementById("light-t");
  if (colTheme) {
    console.log(colTheme);
    // document.documentElement.style.setProperty('--gold1', 'green');
    // let colo = document.getElementById('light-t');
    // console.log(colo)
    // colo.style.setProperty('--dark1',`${colTheme}`)
  }
  const [theme, setTheme] = useState("light-t");
  const {toggle}=useContext(Mycontext);
  const themeSwitch = () => {
    // console.log("light");
    if (theme === "dark-t") {
      setTheme("light-t");
    } else {
      setTheme("dark-t");
    }
  };
  useEffect(() => {
    document.body.id = theme;
  }, [theme]);

  let colorInput = document.getElementById("color");
  if (colorInput) {
    colorInput.addEventListener("input", () => {
      // document.getElementById("colorVal").innerHTML = colorInput.value;
      let cl = colorInput.value;
      console.log(cl);
    });
  }
  useEffect(()=>{
    console.log(toggle)
    if(toggle==true){
      document.getElementById('toggelaside').style.display="unset"
      document.getElementById('toggelaside').style.visibility="visible"
    }
  })

  return (
    <>
      <nav>
        <div style={{visibility:'hidden',pointerEvents:"none"}} className="search">
          <input
            type="search"
            name=""
            placeholder="Search for anything ..."
            id=""
          />
          <SearchIcon />
          {/* <button id="toglemenu">Menu</button> */}
        </div>
        <div id="toggelaside">
          <IconButton className="toggg" onClick={(e)=>{e.preventDefault();
             document.getElementById('aside').style.marginLeft="0";
            document.getElementById('toggelaside').style.visibility="hidden"
            }} >

              <MenuIcon />
               </IconButton>
        </div>
        <div className="nav-links">
          <IconButton>
          <LightModeOutlinedIcon id="light" onClick={themeSwitch} />
          </IconButton>
        <Link to="/quarry">
            <IconButton>

          <MarkEmailUnreadOutlinedIcon id="mail" />
          </IconButton>
          </Link>
          {/* <IconButton>
            
          <NotificationsActiveOutlinedIcon id="noti" />
          </IconButton> */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/3870/3870822.png"
            alt=""
          />
          {/* <input type="color" id="color" className="colorpicker" /> */}
        </div>
      </nav>
    </>
  );
};

export default Menu;
