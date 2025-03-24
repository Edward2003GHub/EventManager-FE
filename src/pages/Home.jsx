import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { Button } from "@mui/material";

export default function Home() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("https://localhost:7262/api/Events", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error(`Error: ${response.statusText} (${response.status})`);
          return;
        }

        const resData = await response.json();
        setEvents(resData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="home-container">
      <img
        src="https://bau.edu.jo/bauliveportal/attch/13052_1.jpg"
        alt="bau-photo"
      />
      <div>
        <div className="event-wrapper">
          {events.map((evt) => (
            <Link
              key={evt.eventID}
              to={`/dashboard/events/${evt.eventID}`}
              style={{ textDecoration: "none", color: "inherit" }}
              className="card-link"
            >
              <Card name={evt.name} startDate={evt.startTime} />
            </Link>
          ))}
        </div>
        <div style={{display: "flex", justifyContent: "flex-end"}}>
          <Button variant="outlined" onClick={() => navigate("/dashboard/events")} sx={{fontSize: "10px"}}>view more events</Button>
        </div>
      </div>

      <div>
        <h2>Organizations</h2>
        <p>list of organizations</p>
      </div>

      <div>
        <h2>Latest News</h2>
        <p>list of organizations</p>
      </div>
    </div>
  );
}
