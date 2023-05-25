import { useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

// import {Mycontext} from '../Fixed/App'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import "../../Css/Calendar.css";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

const Calendar = ({uId,backend,islogin}) => {
  
  const nav = useNavigate()
  // const {backend}=useContext(Mycontext);
  // const backend = "http://localhost:8080"
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [caldata,setCaldata]=useState([]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    const clickdt =""+selected.startStr;
    // console.log(selected.startStr);
    const datesar = clickdt.split('-');
    // const year = datesar[0];
    // const month = datesar[1];
    // const curdt = datesar[2];
    console.log(selected);
    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };
  const getdetailsandadd=async ()=>{
    const curcl = await fetch(`${backend}/api/celender/${uId}`)
    const data = await curcl.json();
    let newdata= data.celender;
    // console.log(newdata[0]);
      let ourdt = [];
      for(let i=0;i<newdata.length;i++){
        let ibj  = newdata[i];
        let nd = ibj.year+"-"+ibj.month+"-"+ibj.day;
        let no= {
          id: ibj._id,
          title:ibj.message,
          start: nd,
          end: nd,
          allDay: true,
        }
        ourdt.push(no);
      }
      setCaldata(ourdt);
      // console.log(ourdt);
      // for(let i=0;i<ourdt.length;i++){
      //   calendarApi.addEvent({
      //     id: `${selected.dateStr}-${title}`,
      //     title,
      //     start: selected.startStr,
      //     end: selected.endStr,
      //     allDay: selected.allDay,
      //   });
      // }
  }
  useEffect(()=>{
    if(!islogin){
      nav("/signIn");
    }else{
      getdetailsandadd();
    }
  },[])
  return (
    <Box m="20px" id="clder">
      <header className="event-sec">
        <center>
          <div className="e-title">
            Mark
            <span id="golden"> Events </span>
            in Calendar
          </div>
        </center>
      </header>

      <Box
        id="cdr"
        display="flex"
        justifyContent="space-evenly"
        color={"var(--color2d)"}
      >
        {/* CALENDAR */}
        <Box flex="1" ml="0">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            selectLongPressDelay={1}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2022-09-14",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-09-28",
              },
            ]}
          />
        </Box>
      </Box>
      {/* CALENDAR SIDEBAR */}
      <Box
        flex="1 1 20%"
        backgroundColor={"var(--dark3)"}
        p="15px"
        borderRadius="4px"
      >
        <Typography variant="h5">Events</Typography>
        <List backgroundColor={"var(--bc-w)"}>
          {currentEvents.map((event) => (
            <ListItem
              key={event.id}
              sx={{
                backgroundColor: "var(--gold2)",
                margin: "10px 0",
                borderRadius: "2px",
              }}
            >
              <ListItemText
                primary={event.title}
                secondary={
                  <Typography>
                    {formatDate(event.start, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Calendar;
