import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Css/ArtistSignIn.css";
import "../../Css/ArtUp.css";
import AddCardIcon from "@mui/icons-material/AddCard";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
const Addmstaf = (props) => {
  const [role, setRole] = useState("Select Role");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [isopen, setIsopen] = useState(false);
  const { backend, islogin } = props;
  const nav = useNavigate();
  const createac = async (e) => {
    e.preventDefault();
    const res = await fetch(`${backend}/mstaf/reg`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        role,
        email: id,
        password,
        mobileNo: mobile,
      }),
    });
    const data = await res.json();
    alert(data.status);
    if (data.status == "ok") {
      nav("/");
    }
  };
  useEffect(() => {
    if (!islogin) {
      nav("/signIn");
    }
  }, []);
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
            <h1>Add Staff</h1>

            <form action="#">
              <h3>Role</h3>
              {/* <input type="text" placeholder="Enter your first and last name" /> */}
              <div id="sel-role">
                <p
                 
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsopen(true);
                  }}
                >
                  {role}
                </p>
                <div
                  
                  style={{ display: `${isopen ? "unset" : "none"}` }}
                >
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setRole("eventStaf");
                      setIsopen(false);
                    }}
                  >
                    EventStaf
                  </p>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setRole("hospital");
                      setIsopen(false);
                    }}
                  >
                    Hospital
                  </p>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setRole("busStation");
                      setIsopen(false);
                    }}
                  >
                    BusStation
                  </p>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setRole("railwayStation");
                      setIsopen(false);
                    }}
                  >
                    RailwayStation
                  </p>
                </div>
              </div>
              <br />
              <h3>Id</h3>
              <input
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
                type="text"
                placeholder="abcd123"
              />
              <h3>MobileNo</h3>
              <input
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
                type="text"
                placeholder="Enter mobile No"
              />
              <h3>Password</h3>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="●●●●●●●"
              />
              <button type="submit" className="btn" onClick={createac}>
                Create Account
              </button>
            </form>
            {/* <div className="b-box">
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
            </p> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Addmstaf;
