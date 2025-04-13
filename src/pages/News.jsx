import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

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
    <div className="news-page">
      <div className="news-header">
        <Typography variant="h4" component="h1" className="page-title">
          University News
        </Typography>
        {localStorage.getItem("email") === "admin@example.com" && (
          <Button
            variant="contained"
            color="success"
            startIcon={<Add />}
            onClick={() => navigate("new")}
            className="add-news-btn"
          >
            Add News
          </Button>
        )}
      </div>

      {news.length === 0 ? (
        <Typography className="no-news-message">
          No news articles found
        </Typography>
      ) : (
        <div className="news-list">
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
      )}
    </div>
  );
}