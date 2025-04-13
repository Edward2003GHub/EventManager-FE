import { format, parseISO } from "date-fns";
import { Button, Chip } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";
import { useEffect, useState } from "react";

export default function Card({ name, startDate, orgId }) {
  const [org, setOrg] = useState([]);
  useEffect(() => {
    async function fetchOrgById() {
      const response = await fetch(`https://localhost:7262/api/Organizations/${orgId}`);
      if(!response.ok) {
        console.log("fetchorgError");
      } else {
        setOrg(await response.json());
      }
    }
    fetchOrgById();
  }, []);
  const formattedDate = startDate
    ? format(parseISO(startDate), "EEE, MMM d, yyy 'at' h:mm a")
    : "N/A";
  const dayOfMonth = startDate ? format(parseISO(startDate), "d") : "--";
  const month = startDate ? format(parseISO(startDate), "MMM") : "---";

  return (
    <div className="event-card">
      <div className="event-date-badge">
        <span className="event-day">{dayOfMonth}</span>
        <span className="event-month">{month}</span>
      </div>

      <div className="event-content">
        <h3 className="event-title">{name}</h3>

        <div className="event-meta">
          <div className="event-info">
            <EventIcon fontSize="small" className="event-icon" />
            <span>{formattedDate}</span>
          </div>
          <div className="event-info">
            <GroupsIcon fontSize="small" className="event-icon" />
            <span>{org.name}</span>
          </div>
        </div>

        <Button
          variant="contained"
          className="event-button"
          sx={{
            backgroundColor: "#2e7d32",
            "&:hover": {
              backgroundColor: "#1b5e20",
            },
          }}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}
