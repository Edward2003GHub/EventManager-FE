import { useEffect, useState } from "react";
import RoomsCard from "../components/RoomsCard";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    async function fetchRooms() {
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7262/api/Rooms", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const resData = await response.json();
      setRooms(resData);
    }

    fetchRooms();
  }, []);

  return (
    <>
      <div className="event-wrapper">
        {rooms.map((room, index) => (
          <RoomsCard
            key={room.id || index}
            name={room.name}
            description={room.description}
            seats={room.seats}
          />
        ))}
      </div>
    </>
  );
}
