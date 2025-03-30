import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);

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
    <>
      <div className="event-wrapper" style={{margin: "auto"}}>
        {events.map((evt) => (
          <Link
          key={evt.eventID}  // Move the key here
          to={evt.eventID}
          style={{ textDecoration: "none", color: "inherit" }}
          className="card-link"
        >
          <Card name={evt.name} startDate={evt.startTime} />
        </Link>
        ))}
      </div>
    </>
  );
}
