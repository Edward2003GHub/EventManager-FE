import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { Button } from "@mui/material";
import OrgCard from "../components/OrgCard";
import NewsCard from "../components/NewsCard";

const org = [
  {
    id: "o1",
    title: "Orange",
    image: "https://picsum.photos/id/1/200/300",
  },
  {
    id: "o2",
    title: "Zain",
    image: "https://picsum.photos/id/1/200/300",
  },
];

const news = [
  {
    id: "n1",
    image: "https://picsum.photos/id/1/200/300",
    title: "Apply to be a Chief Appointed Official for the ASUC!",
    date: "Monday, March 24, 2025",
    postedBy: "Edward",
    description:
      "ASUC is seeking dynamic student leaders to be the next CFO, CLO, CTO, CCO, and CPO",
  },
];

export default function Home() {
  const [events, setEvents] = useState([]);
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

  return (
    <div className="home-container">
      <img
        src="https://bau.edu.jo/bauliveportal/attch/13052_1.jpg"
        alt="bau-photo"
      />
      <div>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
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
            <OrgCard key={each.id} image={each.image} title={each.title} />
          ))}
        </div>
      </div>

      <div>
        <h2>Latest News</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {news.map((each) => (
            <NewsCard
              key={each.id}
              image={each.image}
              title={each.title}
              date={each.date}
              postedBy={each.postedBy}
              description={each.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
