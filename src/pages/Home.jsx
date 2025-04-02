import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { Button } from "@mui/material";
import OrgCard from "../components/OrgCard";
import NewsCard from "../components/NewsCard";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [org, setOrg] = useState([]);
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

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
  }, []);

  useEffect(() => {
    async function fetchOrg() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://localhost:7262/api/Organizations",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
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
      const response = await fetch("https://localhost:7262/api/News", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setNews(await response.json());
      }
    }

    fetchNews();
  }, []);

  return (
    <div className="home-container">
      <img
        src="https://bau.edu.jo/bauliveportal/attch/13052_1.jpg"
        alt="bau-photo"
      />
      <div>
        <div style={{ display: "flex", gap: "20px" }}>
          {events.map((evt) => (
            <Link
              key={evt.eventID}
              to={`/dashboard/events/${evt.eventID}`}
              style={{ textDecoration: "none", color: "inherit" }}
              className="card-link"
            >
              <Card name={evt.name} startDate={evt.startTime} />
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard/events")}
            sx={{ fontSize: "16px", marginTop: "10px" }}
          >
            view more events
          </Button>
        </div>
      </div>

      <div>
        <h2>Organizations</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {org.map((each) => (
            <OrgCard
              key={each.organizationID}
              name={each.name}
              to={`/dashboard/organizations/${each.organizationID}`}
            />
          ))}
        </div>
      </div>

      <div>
        <h2>Latest News</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {news.map((each) => (
            <NewsCard
              key={each.id}
              title={each.title}
              cdate={each.createdDate}
              udate={each.updatedDate}
              content={each.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
