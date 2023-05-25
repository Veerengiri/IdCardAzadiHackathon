import React from "react";
import { useState } from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  Pie,
  ComposedChart,
} from "recharts";
import "../../../Css/Charts.css";



const pdata = [
  { numWin: 5, numOfArtist: 5, name: "KPD", TOP: "garba", date: "03/08/2023" },
  {
    numWin: 3,
    numOfArtist: 2,
    name: "Amin",
    TOP: "kathak",
    date: "08/02/2023",
  },
  { numWin: 7, numOfArtist: 1, name: "Ajit", TOP: "salsa", date: "24/01/2023" },
  {
    numWin: 2,
    numOfArtist: 9,
    name: "Viren",
    TOP: "bhangda",
    date: "15/08/2023",
  },
  {
    numWin: 0,
    numOfArtist: 7,
    name: "Saurav",
    TOP: "kathak",
    date: "19/6/2023",
  },
];

const comdata = [
  { siteUser: 380, month: "Jan", numOfEvent: 80, artist: 230 },
  { siteUser: 202, month: "Feb", numOfEvent: 20, artist: 30 },
  { siteUser: 584, month: "Mar", numOfEvent: 50, artist: 140 },
  { siteUser: 375, month: "Apr", numOfEvent: 110, artist: 427 },
  { siteUser: 444, month: "May", numOfEvent: 30, artist: 154 },
  { siteUser: 380, month: "Jun", numOfEvent: 0, artist: 0 },
  { siteUser: 680, month: "July", numOfEvent: 190, artist: 750 },
  { siteUser: 550, month: "Aug", numOfEvent: 20, artist: 42 },
  { siteUser: 492, month: "Sept", numOfEvent: 50, artist: 130 },
  { siteUser: 602, month: "Oct", numOfEvent: 10, artist: 23 },
  { siteUser: 829, month: "Nov", numOfEvent: 80, artist: 230 },
  { siteUser: 770, month: "Dec", numOfEvent: 50, artist: 170 },
];
const danceForm = [
  {
    yr: 2016,
    katthak: 44,
    Bharatnatyam: 2,
    Kuchipudi: 13,
    Odisi: 78,
    garba: 59,
  },
  {
    yr: 2017,
    katthak: 8,
    Kuchipudi: 2,
    Kuchipudi: 24,
    Odisi: 27,
    garba: 71,
  },
  {
    yr: 2018,
    katthak: 88,
    Bharatnatyam: 22,
    Kuchipudi: 75,
    Odisi: 27,
    garba: 67,
  },
  {
    yr: 2019,
    katthak: 14,
    Bharatnatyam: 82,
    Kuchipudi: 28,
    Odisi: 7,
    garba: 37,
  },
  {
    yr: 2020,
    katthak: 44,
    Bharatnatyam: 2,
    Kuchipudi: 53,
    Odisi: 78,
    garba: 59,
  },
  {
    yr: 2021,
    katthak: 8,
    Kuchipudi: 2,
    Bharatnatyam: 24,
    Odisi: 27,
    garba: 71,
  },
];

const Charts = (props) => {
  const {backend,islogin}=props;
  const [apydata,setApydata]=useState([]);
  const [mfdata,setMfdata]=useState([]);
  const [ewdata,setEvdata]=useState([]);
  const [eapy,setEapy]=useState([]);
  const nav= useNavigate();
  const getapplicationperyear = async ()=>{
    const res  = await fetch(`${backend}/chart/peryear`,{
      method:"GET",
      headers:{
        "content-type":"application/json"
      }
    })
    const data =await res.json();
    setApydata(data.dt);
  }
  const getmalefemale= async ()=>{
    const res  = await fetch(`${backend}/chart/malefemale`,{
      method:"GET",
      headers:{
        "content-type":"application/json"
      }
    })
    const data =await res.json();
    setMfdata(data.dt);
  }
  const geteventwise=async ()=>{
    const res  = await fetch(`${backend}/chart/eventwise`,{
      method:"GET",
      headers:{
        "content-type":"application/json"
      }
    })
    const data =await res.json();
    setEvdata(data.dt);
  }
  const geteapy = async ()=>{
    const res  = await fetch(`${backend}/chart/eapy`,{
      method:"GET",
      headers:{
        "content-type":"application/json"
      }
    })
    const data =await res.json();
    let original = data.dt;
    let devent = data.dt2;
    for(let i=0;i<original.length;i++){
      let obj = {

      }
      for(let j=0;j<devent.length;j++){
        obj = {...obj,event:'yes'};
      }
    }
  }
  useEffect(()=>{
    if(!islogin){
      nav("/signIn");
    }else{

      getapplicationperyear();
      getmalefemale();
      geteventwise();
    }
    // geteapy();
  },[])
  return (
    <>
      <header className="event-sec">
        <center>
          <div className="e-title">
            Current
            <span id="golden"> List Of </span>
            Events
          </div>
        </center>
      </header>
      <section id="charts">
        
        
        {/* <div id="ch2">
          <h1>Area Chart</h1>
          <p>Chart Of Artist Wining Competition</p>
          <ResponsiveContainer width="100%" aspect={1.5}>
            <AreaChart
              data={pdata}
              margin={{ left: -35, right: 7, top: 13, bottom: 5 }}
            >
              <YAxis stroke="#bfbfbf" />
              
              <Tooltip />
              <Legend />
              <XAxis
                dataKey="name"
                stroke="#bfbfbf"
                interval="preserveStartEnd"
              />
              <Area
                
                dataKey="numOfArtist"
                strokeWidth={2}
                type="monotone"
                stroke="#f54c40"
                fill="#f54c40"
              />
              <Area
                
                dataKey="numWin"
                strokeWidth={2}
                type="monotone"
                stroke="#285cf7"
                fill="#285cf7"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div> */}
        {/* <div id="ch3">
          <h1>Multi Area Chart</h1>
          <p>Chart by number participants in each art form per year </p>
          <ResponsiveContainer width="100%" aspect={2.2}>
            <AreaChart
              data={eapy}
              stackOffset="expand"
              margin={{
                top: 15,
                right: 12.5,
                left: 12,
                bottom: 10,
              }}
            >
              <CartesianGrid />
              <XAxis
                dataKey="year"
                interval="preserveStartEnd"
                stroke="#bfbfbf"
              />

              <Tooltip />
              <Legend />

              <Area
                type="monotone"
                dataKey="katthak"
                stackId="1"
                stroke="#285cf7"
                fill="#285cf7"
              />
              <Area
                type="monotone"
                dataKey="garba"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="Odisi"
                stackId="1"
                stroke="#f54c40"
                fill="#f54c40"
              />
              <Area
                type="monotone"
                dataKey="Kuchipudi"
                stackId="1"
                stroke="#9e3dff"
                fill="#9e3dff"
              />
              <Area
                type="monotone"
                dataKey="Kuchipudi"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div> */}
        <div id="ch1">
                  <h1>Line Chart</h1>
                  <p>Chart of applications per year</p>
                  <ResponsiveContainer width="100%" aspect={1.5}>
                    <LineChart
                      data={apydata}
                      margin={{ left: -35, right: 7, top: 13, bottom: 5 }}
                    >
                      <YAxis stroke="#bfbfbf" />
                      <CartesianGrid strokeDasharray="5 3" stroke="#757575" />
                      <Tooltip />
                      <Legend />
                      <XAxis
                        dataKey="_id"
                        stroke="#bfbfbf"
                        interval="preserveStartEnd"
                      />
                      <Line
                        /*type="monotone"*/
                        dataKey="applications"
                        strokeWidth={2}
                        stroke="#ffc107"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
        <div id="ch4">
          <h1>Bar Chart</h1>
          <p>Chart by Artist Gender ratio per year</p>
          <ResponsiveContainer width="100%" aspect={1.5}>
            <BarChart
              data={mfdata}
              margin={{ left: 5, right: 7, top: 13, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" stroke="#bfbfbf" />
              {/* <YAxis dataKey="max" /> */}
              <Tooltip />
              <Legend />
              <Bar dataKey="male" stackId="a" fill="#8884d8" />
              <Bar dataKey="female" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div id="ch4">
          <h1>Bar Chart</h1>
          <p>Chart of applications per event</p>
          <ResponsiveContainer width="100%" aspect={1.5}>
            <BarChart
              data={ewdata}
              margin={{ left: 5, right: 7, top: 13, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" stroke="#bfbfbf" />
              {/* <YAxis dataKey="max" /> */}
              <Tooltip />
              <Legend />
              <Bar dataKey="applications" stackId="a" fill="#8884d8" />
              
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div id="ch5">
          <h1>Composed Chart</h1>
          <p>Chart of site viewers , Event Count , Registrations</p>
          <ResponsiveContainer width="100%" aspect={1.5}>
            <ComposedChart
              data={comdata}
              margin={{ left: -15, right: 10, top: 15, bottom: 5 }}
            >
            
              <XAxis dataKey="month" scale="band" stroke="#bfbfbf" />
              <YAxis stroke="#bfbfbf" />
             
              <Legend />
              <Area
                type="monotone"
                dataKey="artist"
                fill="#285cf7"
                stroke="#285cf7"
                strokeWidth={3}
              />
              <Bar dataKey="numOfEvent" barSize={20} fill="#ff2d55" />
             
              <Line
                type="monotone"
                dataKey="siteUser"
                stroke="#4cd964"
                strokeWidth={3}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>{" "}
    </>
  );
};

export default Charts;
