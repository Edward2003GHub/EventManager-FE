import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarUnreg, setSnackbarUnreg] = useState(false);

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

    // Check if registration was successful
    if (localStorage.getItem("registrationSuccess") === "true") {
      setSnackbarOpen(true);
      localStorage.removeItem("registrationSuccess"); // Clear flag after showing Snackbar
    }

    if (localStorage.getItem("unregistrationSuccess") === "true") {
      setSnackbarUnreg(true);
      localStorage.removeItem("unregistrationSuccess"); // Clear flag after showing Snackbar
    }
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div className="event-wrapper" style={{ margin: "auto" }}>
        {events.map((evt) => (
          <Link
            key={evt.eventID}
            to={`/user/events/${evt.eventID}`}
            style={{ textDecoration: "none", color: "inherit" }}
            className="card-link"
          >
            <Card name={evt.name} startDate={evt.startTime} />
          </Link>
        ))}
      </div>

      {/* Snackbar for Registration Success */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
          Registration successful!
        </Alert>
      </Snackbar>

      <Snackbar
        open={snackbarUnreg}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
          Unregistration successful!
        </Alert>
      </Snackbar>
    </>
  );
}