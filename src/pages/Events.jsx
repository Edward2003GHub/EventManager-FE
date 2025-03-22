import Card from "../components/Card";
import Input2 from "../components/Input2";
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
      <div className="event-wrapper">
        {events.map((evt) => (
          <Card
            key={evt.eventID}
            name={evt.name}
            startDate={evt.startTime}
            endDate={evt.endTime}
            des={evt.description}
            attendees={evt.attendees}
          />
        ))}
      </div>
    </>
  );
}
