import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { Button } from "@mui/material";
import OrgCard from "../components/OrgCard";
import Carousel from "../components/Carousel";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [org, setOrg] = useState([]);
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

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
  }, []);

  useEffect(() => {
    async function fetchOrg() {
      try {
        const response = await fetch(
          "https://localhost:7262/api/Organizations"
        );

        if (!response.ok) {
          console.error(`Error: ${response.statusText} (${response.status})`);
          return;
        }

        const resData = await response.json();
        setOrg(resData);
      } catch (error) {
        console.error("Error fetching org:", error);
      }
    }

    fetchOrg();
  }, []);

  useEffect(() => {
    async function fetchNews() {
      const response = await fetch("https://localhost:7262/api/News");

      if (response.ok) {
        setNews(await response.json());
      }
    }

    fetchNews();
  }, []);

  return (
    <div className="home-container">
      <Carousel news={news} />

      <div>
        <div className="event-wrapper" style={{ padding: 0 }}>
          {events.slice(0, 4).map((evt) => (
            <Link
              key={evt.eventID}
              to={
                localStorage.getItem("token")
                  ? `/user/events/${evt.eventID}`
                  : `/events/${evt.eventID}`
              }
              style={{ textDecoration: "none", color: "inherit" }}
              className="card-link"
            >
              <Card
                name={evt.name}
                startDate={evt.startTime}
                image={evt.photoUrl}
                orgId={evt.organizationID}
              />
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            onClick={() =>
              navigate(
                localStorage.getItem("token") ? "/user/events" : "/events"
              )
            }
            sx={{ fontSize: "16px", marginTop: "10px" }}
          >
            view more events
          </Button>
        </div>
      </div>

      <div>
        <h2>Organizations</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {org.slice(0, 4).map((each) => (
            <OrgCard
              key={each.organizationID}
              name={each.name}
              image={each.logoUrl}
              to={
                localStorage.getItem("token")
                  ? `/user/organizations/${each.organizationID}`
                  : `/organizations/${each.organizationID}`
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
