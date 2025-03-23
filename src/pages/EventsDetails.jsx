import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        <div>
          <h1>{eventData.name}</h1>
          <p>{eventData.description}</p>
          <p>Start Time: {new Date(eventData.startTime).toLocaleString()}</p>
          <p>End Time: {new Date(eventData.endTime).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
