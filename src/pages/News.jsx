import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function News() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

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
    <>
      {localStorage.getItem("email") === "admin@example.com" && (
        <div
          style={{
            maxWidth: "1330px",
            margin: "auto",
            padding: "20px 35px 0px 35px",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("new")}
          >
            Add Organization
          </Button>
        </div>
      )}
      <div style={{ maxWidth: "1330px", padding: "35px", margin: "auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {news.map((n) => (
            <NewsCard
              key={n.id}
              image={n.photoUrl.replace(/\\/g, "/")}
              title={n.title}
              date={n.updatedDate ? n.updatedDate : n.createdDate}
              isUpdated={!!n.updatedDate}
              content={n.content}
              to={n.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
