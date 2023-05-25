import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import "../../Css/Menu.css";
import { useContext } from "react";
import { Mycontext } from "./App";
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
        <div className="search">
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
          <button onClick={(e)=>{e.preventDefault();
          document.getElementById('aside').style.marginLeft="0";
            document.getElementById('toggelaside').style.visibility="hidden"
            }} >ToggleAside</button>
        </div>
        <div className="nav-links">
          <LightModeOutlinedIcon id="light" onClick={themeSwitch} />
          <MarkEmailUnreadOutlinedIcon id="mail" />
          <NotificationsActiveOutlinedIcon id="noti" />
          <img
            src="https://avatars.githubusercontent.com/u/58349765?s=400&u=22e094b356d4541a0372f11782d1263e0cbdcb56&v=4"
            alt=""
          />
          <input type="color" id="color" className="colorpicker" />
        </div>
      </nav>
    </>
  );
};

export default Menu;
