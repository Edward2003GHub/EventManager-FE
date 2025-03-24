import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Button } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";

export default function EventDetails() {
  const params = useParams();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    async function getEventById() {
      const response = await fetch(
        `https://localhost:7262/api/Events/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await response.json();

      if (response.ok) {
        setEventData(resData);
      } else {
        console.log("Failed to fetch event data");
      }
    }

    getEventById();
  }, [params.id]);

  return (
    <div>
      {eventData && (
        <div className="details">
          <div className="detail-container">
            <img src="https://picsum.photos/id/1/200/300" alt="event-photo" />
            <div className="detail-title-date">
              <h1>{eventData.name}</h1>
              <div className="detail-date-con">
                <DateRangeIcon sx={{ fontSize: "15px" }} />
                <div className="detail-date">
                  <h3>Date and Time</h3>
                  <p>{new Date(eventData.startTime).toLocaleString()} to</p>
                  <p>{new Date(eventData.endTime).toLocaleString()}</p>
                </div>
              </div>
              <div className="detail-date-con">
                <PeopleAltIcon sx={{ fontSize: "15px" }} />
                <div className="detail-date">
                  <h3>Attendees</h3>
                  <p>{eventData.attendees.length}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h3>Description</h3>
          <p>{eventData.description}</p>
          <hr />
          <div style={{display: "flex", justifyContent: "flex-end"}}>
            <Button
              variant="contained"
              color="success"
              startIcon={<HowToRegIcon />}
              sx={{fontSize: "10px"}}
            >
              Register
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
