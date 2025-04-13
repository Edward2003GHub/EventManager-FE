import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { getNews } from "../utility/apiGetCalls";

export default function News() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

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
