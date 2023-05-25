import React, { useState } from "react";
import "../../Css/Footer.css";
const Footer = () => {
  const [heart, setHeart] = useState(false);

  var clickHeart = () => {
    if (heart == false) {
      console.log("vis");

      document.getElementById("Heart").classList.remove("fa-heart-o");
      document.getElementById("Heart").classList.add("fa-heart");
      setHeart(true);
    } else {
      console.log("hid");
      document.getElementById("Heart").classList.remove("fa-heart");
      document.getElementById("Heart").classList.add("fa-heart-o");

      setHeart(false);
    }
  };
  return (
    <footer>
      <div className="cp">
        <div className="left ff">© Copy Write CC</div>
        <div className="mid ff" onClick={clickHeart}>
          Made with &nbsp;
          <i className="gold fa fa-heart-o" id="Heart" />
          &nbsp; by
          <span className="gold">&nbsp; StackHackers </span>
        </div>
        <div className="right ff">SSIP Azadi Hackathon</div>
      </div>
    </footer>
  );
};

export default Footer;
