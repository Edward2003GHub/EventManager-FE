import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { Button } from "@mui/material";
import OrgCard from "../components/OrgCard";
import { format } from "date-fns";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [org, setOrg] = useState([]);
  const [news, setNews] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);
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
      <div>
        <h2>Latest News</h2>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <img
            src={
              `https://localhost:7262/${hoveredImage}` ||
              "https://picsum.photos/id/1/200/300"
            } // Default image
            alt="news-img"
            style={{ flex: 1 }}
            height="350px"
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {news.slice(0, 4).map((n) => (
              <div key={n.id}>
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      width: "75px",
                    }}
                  >
                    <div
                      align="center"
                      style={{
                        flex: 1,
                        backgroundColor: "rgb(25, 118, 210)",
                        color: "white",
                        width: "100%",
                      }}
                    >
                      <span>
                        {n.updatedDate
                          ? format(new Date(n.updatedDate), "dd")
                          : format(new Date(n.createdDate), "dd")}
                      </span>
                    </div>
                    <div
                      align="center"
                      style={{
                        flex: 1,
                        width: "100%",
                        backgroundColor: "rgb(33, 91, 149)",
                        color: "white",
                      }}
                    >
                      <span>
                        {n.updatedDate
                          ? format(new Date(n.updatedDate), "MMM")
                          : format(new Date(n.createdDate), "MMM")}
                      </span>
                    </div>
                  </div>
                  <div
                    className="eachNewsLink"
                    onMouseEnter={() => setHoveredImage(n.photoUrl)} // Assuming `n.imageUrl` contains the URL of the image
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    {n.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
