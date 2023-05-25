import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../Css/Artist.css";
import Loading from '../../Fixed/Loading'
import ArtistInfo from "./ArtistInfo";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const Artists = (props) => {
  // const admin = "clerk";
  const { backend, admin, setId, islogin } = props;
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [sdate, setSdate] = useState("");
  const pagesize = 5;
  const [start, setStart] = useState(0);
  const [totalpage, setTotalpage] = useState(0);
  const [arr, setArr] = useState([]);
  const [issearch, setIssearch] = useState(false);
  const [tsort, setTsort] = useState("get");
  const [isdata, setIsdata] = useState(true);
  const [finaluser, setfinaluser] = useState([]);
  const [aprfil, setAprfil] = useState(false);
  const [aop, setAop] = useState("approved");
  const nav = useNavigate();

  let ar = [];
  const countdoc = async (apr) => {
    const res = await fetch(`${backend}/count/${apr}/${admin}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const count = await res.json();
    const tp = Math.ceil(count.count / pagesize);
    ar = [];
    for (let i = 0; i < tp; i++) {
      ar.push(i);
    }
    setArr(ar);
    setTotalpage(tp);
  };
  const getuser = async (start, tsort) => {
    setIssearch(false);
    setSearch("");
    setSdate("");
    const data = await fetch(
      `${backend}/${tsort}/${admin}/${start}/${pagesize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await data.json();
    if (res.admindata.length == 0) {
      setIsdata(false);
      setUser([]);
    } else {
      setIsdata(true);
      setUser(res.admindata);
      setfinaluser(res.admindata);
    }
    // console.log(res.admindata);
  };
  const getuseraprfil = async (start, ap) => {
    setIssearch(false);
    setSearch("");
    setSdate("");
    const data = await fetch(
      `${backend}/get/${ap}/${admin}/${start}/${pagesize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await data.json();
    if (res.admindata.length == 0) {
      setIsdata(false);
      setUser([]);
    } else {
      setIsdata(true);
      setUser(res.admindata);
      setfinaluser(res.admindata);
    }
    // console.log(res.admindata);
  };
  const getsearch = async (src) => {
    setIssearch(true);
    const data = await fetch(`${backend}/get/${admin}/${src}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    if (res.admindata.length == 0) {
      setIsdata(false);
      setUser([]);
    } else {
      setIsdata(true);
      setUser(res.admindata);
    }
  };
  const searchByDate = async (dt) => {
    setIssearch(true);
    const data = await fetch(`${backend}/date/${admin}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dt,
      }),
    });
    const res = await data.json();
    if (res.admindata.length == 0) {
      setIsdata(false);
      setUser([]);
    } else {
      setIsdata(true);
      setUser(res.admindata);
    }
  };

  const getapproved = async () => {
    setAprfil(true);
    setAop("approved");
    countdoc("approved");
    getuseraprfil(0, "approved");
    setTsort("get");
  };
  const getpending = async () => {
    setAprfil(true);
    setAop("pending");
    countdoc("pending");
    getuseraprfil(0, "pending");
    setTsort("get");
  };

  const sortbyName = async () => {
    setAprfil(false);
    setTsort("name");
    getuser(0, "name");
  };
  const sortbyTime = async () => {
    setAprfil(false);
    setTsort("time");
    getuser(0, "time");
  };
  const sortbyTimed = async () => {
    setAprfil(false);
    setTsort("timed");
    getuser(0, "timed");
  };
  let pgno = 0;
  const opendetail = (info) => {
    setId(info._id);
    setTimeout(() => {
      nav("/admin/artinfo");
    }, 500);
  };

  useEffect(() => {
    if (!islogin) {
      nav("/signIn");
    } else {
      countdoc("all");
      getuser(0, "get");
    }
  }, []);
  return (
    <div>
      <header className="event-sec">
        <center>
          <div className="e-title">
            List Of
            <span id="golden"> Artist </span>
            To Validate
          </div>
        </center>
      </header>
      <div className="t-box">
        <div className="filter" id="filter">
          <div className="fil-title">Filter By Dance</div>
          <div
            className="hid-sec"
            id="hid-sec"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div>
              <button
                onClick={sortbyName}
                style={{
                  backgroundColor: `${
                    tsort == "name" ? "var(--gold2)" : "unset"
                  }`,
                }}
              >
                SortbyName{" "}
              </button>
              <button
                onClick={sortbyTime}
                style={{
                  backgroundColor: `${
                    tsort == "time" ? "var(--gold2)" : "unset"
                  }`,
                }}
              >
                Sortbytime{" "}
              </button>
              <button
                onClick={sortbyTimed}
                style={{
                  backgroundColor: `${
                    tsort == "timed" ? "var(--gold2)" : "unset"
                  }`,
                }}
              >
                Sortbytime-dsc
              </button>
            </div>
            <input
              placeholder="seach by date"
              // style={{ backgroundColor: "transparent", color: "white" }}
              className="ftr-src"
              type="date"
              value={sdate}
              onChange={(e) => {
                e.preventDefault();
                searchByDate(e.target.value);
                setSdate(e.target.value);
                console.log(e.target.value);
              }}
            />
            <input
              className="ftr-src"
              value={search}
              onChange={(e) => {
                e.preventDefault();
                getsearch(e.target.value);
                setSearch(e.target.value);
              }}
              placeholder="search here"
              type="search"
            />
            <button
              onClick={() => {
                setTsort("get");
                setAprfil(false);
                getuser(0, "get");
              }}
            >
              reset
            </button>

            <button
              onClick={() => {
                setAprfil(false);
                countdoc("all");
                getuser(0, "get");
              }}
              style={{
                backgroundColor: `${
                  aprfil && aop == "all" ? "var(--gold2)" : "unset"
                }`,
              }}
            >
              All
            </button>
            <button
              onClick={getapproved}
              style={{
                backgroundColor: `${
                  aprfil && aop == "approved" ? "var(--gold2)" : "unset"
                }`,
              }}
            >
              Approved
            </button>
            <button
              onClick={getpending}
              style={{
                backgroundColor: `${
                  aprfil && aop == "pending" ? "var(--gold2)" : "unset"
                }`,
              }}
            >
              Pending
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Lead Name</th>
              <th>Event Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {user.length != 0 ? (
              user.map((us) => {
                return (
                  <tr
                    onClick={(d) => {
                      d.preventDefault();
                      opendetail(us);
                    }}
                  >
                    <td>{us.gname}</td>
                    <td>{us.name[0].name}</td>
                    <td>{us.eventName}</td>
                    <td>
                      <p href="#">{us.name[0].email}</p>
                    </td>
                    <td>
                      {us.applyDay + "/" + us.applyMonth + "/" + us.applyYear}
                    </td>
                    <td
                      className="pd"
                      style={{
                        display: `${admin == "clerk" ? "flex" : "none"}`,
                      }}
                    >
                      {us.PEON}
                    </td>
                    <td
                      className="pd"
                      style={{
                        display: `${admin == "dydo" ? "flex" : "none"}`,
                      }}
                    >
                      {us.officer}
                    </td>
                    <td
                      className="pd"
                      style={{
                        display: `${admin == "commisioner" ? "flex" : "none"}`,
                      }}
                    >
                      {us.commisioner}
                    </td>
                  </tr>
                );
              })
            ) : (
              <div > <Loading/> </div>
            )}
          </tbody>
          <p style={{ display: `${!isdata ? "unset" : "none"}` }}>No data</p>
        </table>
        <div
          style={{
            display: `${issearch ? "none" : "flex"}`,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "var(--color2d)" }}>Pages: </h2>
          {arr.map((e) => {
            return (
              <button
                onClick={(f) => {
                  setStart(e * pagesize);
                  console.log(e);
                  if (!aprfil) {
                    getuser(e * pagesize, "get");
                  } else {
                    getuseraprfil(e * pagesize, aop);
                  }
                }}
                style={{
                  margin: "5px",
                  padding: "5px",
                  background: `${
                    e * pagesize == start ? "white" : "var(--gold2)5,.3)"
                  }`,
                }}
                key={e}
              >
                {e + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* <br />
      <br />
      <div style={{display:`${showartist?"unset":"none"}`}}>
        <ArtistInfo artist={artistdetail} lead = {lead}/>
      </div> */}
    </div>
  );
};

export default Artists;
