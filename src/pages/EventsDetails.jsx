import { useEffect, useState } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Button, IconButton } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import OrgCard2 from "../components/OrgCard2";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
    <div>
      {eventData && (
        <div className="details">
          {localStorage.getItem("email") === "admin@example.com" && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <Button
              variant="contained"
              color="primary"
                onClick={() => {
                  navigate("edit");
                }}
              >
                <EditIcon />
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                <DeleteIcon />
              </Button>
            </div>
          )}
          <div className="detail-container">
            <div
              style={{ width: "100%", flex: 1, margin: "10px 30px 10px 10px" }}
            >
              <div
                className="detail-events-img"
                style={{
                  backgroundImage: eventData.photoUrl
                    ? `url(https://localhost:7262/${eventData.photoUrl.replace(
                        /\\/g,
                        "/"
                      )})`
                    : `url(/Images/emptyPhoto.png)`, // Default image URL
                }}
              ></div>
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
          <h1>Hosted by</h1>
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
