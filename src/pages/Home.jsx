import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { Button } from "@mui/material";
import OrgCard from "../components/OrgCard";
import Carousel from "../components/Carousel";
import { getEvents, getNews, getOrgs } from "../utility/apiGetCalls";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [org, setOrg] = useState([]);
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAndSetEvents() {
      const data = await getEvents();
      if (data) {
        setEvents(data);
      }
    }

    fetchAndSetEvents();
  }, []);

  useEffect(() => {
    async function fetchAndSetOrgs() {
      const data = await getOrgs();
      if (data) {
        setOrg(data);
      }
    }

    fetchAndSetOrgs();
  }, []);

  useEffect(() => {
    async function fetchAndSetNews() {
      const data = await getNews();
      if (data) {
        setNews(data);
      }
    }

    fetchAndSetNews();
  }, []);

  return (
    <div className="home-container">
      <Carousel news={news} />

      <div>
        <h2>Latest Events</h2>
        <div className="event-wrapper">
          {events.slice(0, 4).map((evt) => (
            <Link
              key={evt.eventID}
              to={
                localStorage.getItem("token")
                  ? `/user/events/${evt.eventID}`
                  : `/events/${evt.eventID}`
              }
              style={{ textDecoration: "none", color: "inherit" }}
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
            color="success"
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
