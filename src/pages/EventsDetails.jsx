import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Button } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function EventDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [eventData, setEventData] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

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

  async function handleRegister() {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://localhost:7262/api/Attendees/${params.id}?userId=${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Registration failed:", errorMessage);
        return;
      } else {
        localStorage.setItem("registrationSuccess", "true");
        navigate("/user/events");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  async function handleUnregister() {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://localhost:7262/api/Attendees/${params.id}?userId=${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        localStorage.setItem("unregistrationSuccess", "true");
        navigate("/user/events");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  useEffect(() => {
    async function getAttendees() {
      const response = await fetch(
        `https://localhost:7262/api/Attendees/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("notGG");
      }

      const users = await response.json();
      const userExists = users.some(
        (user) => user.id === localStorage.getItem("userId")
      );
      setIsRegistered(userExists);
    }

    getAttendees();
  }, []);

  return (
    <div>
      {eventData && (
        <div className="details">
          <div className="detail-container">
            <div
              style={{ width: "100%", flex: 1, margin: "10px 30px 10px 10px" }}
            >
              <div className="detail-events-img"></div>
            </div>
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
          <h1>Description</h1>
          <p style={{ fontSize: "20px" }}>{eventData.description}</p>
          <hr />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={isRegistered ? handleUnregister : handleRegister}
              variant="contained"
              color={isRegistered ? "error" : "success"}
              startIcon={isRegistered ? <ExitToAppIcon /> : <HowToRegIcon />}
              sx={{ fontSize: "16px" }}
            >
              {isRegistered ? "Unregister" : "Register"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
