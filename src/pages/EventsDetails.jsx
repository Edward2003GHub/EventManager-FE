import { useEffect, useState } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Button } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import OrgCard2 from "../components/OrgCard2";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

export default function EventDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const publicData = useRouteLoaderData("public-event-details");
  const privateData = useRouteLoaderData("private-event-details");
  const [org, setOrg] = useState([]);
  const eventData = publicData || privateData;
  const [isRegistered, setIsRegistered] = useState(false);

  async function handleRegister() {
    try {
      if (localStorage.getItem("token")) {
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
      } else {
        navigate("/login");
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

  useEffect(() => {
    async function fetchOrgById() {
      const response = await fetch(
        `https://localhost:7262/api/Organizations/${eventData.organizationID}`
      );

      if (!response.ok) {
        console.log("fetch error");
      } else {
        setOrg(await response.json());
      }
    }

    fetchOrgById();
  }, []);

  async function handleDelete() {
    const response = await fetch(
      `https://localhost:7262/api/Events/${params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      console.log("delete failed");
    } else {
      navigate("/user/events");
    }
  }

  return (
    <div className="event-details-page">
      {eventData && (
        <div className="event-details-container">
          {localStorage.getItem("email") === "admin@example.com" && (
            <div className="admin-actions">
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("edit")}
                className="edit-btn"
              >
                <EditIcon /> Edit
              </Button>
              <Button 
                variant="contained" 
                color="error" 
                onClick={handleDelete}
                className="delete-btn"
              >
                <DeleteIcon /> Delete
              </Button>
            </div>
          )}
  
          <div className="event-header">
            <div className="event-image-container">
              <div
                className="event-image"
                style={{
                  backgroundImage: eventData.photoUrl
                    ? `url(https://localhost:7262/${eventData.photoUrl.replace(/\\/g, "/")})`
                    : `url(/Images/emptyPhoto.png)`,
                }}
              />
            </div>
            <div className="event-info">
              <h1 className="event-title">{eventData.name}</h1>
              
              <div className="event-meta">
                <div className="meta-item">
                  <DateRangeIcon className="meta-icon" />
                  <div>
                    <h3>Date and Time</h3>
                    <div className="date-time-group">
                      <span className="date-icon">📅</span>
                      <p className="date-text">
                        {format(new Date(eventData.startTime), "EEEE, MMMM d, yyyy")}
                      </p>
                      <span className="time-icon">🕒</span>
                      <p className="time-text">
                        {format(new Date(eventData.startTime), "h:mm a")} - {" "}
                        {format(new Date(eventData.endTime), "h:mm a")}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="meta-item">
                  <PeopleAltIcon className="meta-icon" />
                  <div>
                    <h3>Attendees</h3>
                    <p className="attendees-count">
                      {eventData.attendees.length} registered
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="event-section">
            <h2 className="section-title">Description</h2>
            <p className="event-description">{eventData.description}</p>
          </div>
  
          <div className="event-section">
            <h2 className="section-title">Hosted by</h2>
            <OrgCard2
              key={org.organizationID}
              image={org.logoUrl}
              description={org.description}
              to={
                localStorage.getItem("token")
                  ? `/user/organizations/${org.organizationID}`
                  : `/organizations/${org.organizationID}`
              }
              name={org.name}
            />
          </div>
  
          <div className="event-actions">
            <Button
              onClick={isRegistered ? handleUnregister : handleRegister}
              variant="contained"
              color={isRegistered ? "error" : "success"}
              startIcon={isRegistered ? <ExitToAppIcon /> : <HowToRegIcon />}
              className="register-btn"
            >
              {isRegistered ? "Unregister" : "Register"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export async function loader({ params }) {
  const response = await fetch(
    `https://localhost:7262/api/Events/${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Response("Failed to fetch event data", {
      status: response.status,
    });
  }

  return await response.json();
}
