import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { Snackbar, Alert, Button, Typography } from "@mui/material";
import { EventNote, Add } from "@mui/icons-material";

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarUnreg, setSnackbarUnreg] = useState(false);

  const handleCloseRegistrationSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseUnregistrationSnackbar = () => {
    setSnackbarUnreg(false);
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("https://localhost:7262/api/Events");

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

    if (localStorage.getItem("registrationSuccess") === "true") {
      setSnackbarOpen(true);
      localStorage.removeItem("registrationSuccess");
    }

    if (localStorage.getItem("unregistrationSuccess") === "true") {
      setSnackbarUnreg(true);
      localStorage.removeItem("unregistrationSuccess");
    }
  }, []);

  return (
    <div className="events-page">
      <div className="events-header">
        <Typography variant="h4" component="h1" className="events-title">
          <EventNote className="title-icon" /> Upcoming Events
        </Typography>
        {localStorage.getItem("email") === "admin@example.com" && (
          <Button
            variant="contained"
            color="success"
            startIcon={<Add />}
            onClick={() => navigate("new")}
            className="add-event-btn"
          >
            Add Event
          </Button>
        )}
      </div>

      {events.length === 0 ? (
        <div className="no-events">
          <Typography variant="h6">No upcoming events</Typography>
          <Typography variant="body1">
            Check back later for new events!
          </Typography>
        </div>
      ) : (
        <div className="event-grid">
          {events.map((evt) => (
            <Link
              key={evt.eventID}
              to={
                localStorage.getItem("token")
                  ? `/user/events/${evt.eventID}`
                  : `/events/${evt.eventID}`
              }
              className="event-card-link"
            >
              <Card
                name={evt.name}
                startDate={evt.startTime}
                attendees={evt.attendees?.length || 0}
                orgId={evt.organizationID}
              />
            </Link>
          ))}
        </div>
      )}

      {/* Snackbars */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseRegistrationSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseRegistrationSnackbar}
          severity="success"
          variant="filled"
        >
          Registration successful!
        </Alert>
      </Snackbar>

      <Snackbar
        open={snackbarUnreg}
        autoHideDuration={3000}
        onClose={handleCloseUnregistrationSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseUnregistrationSnackbar}
          severity="success"
          variant="filled"
        >
          Unregistration successful!
        </Alert>
      </Snackbar>
    </div>
  );
}
