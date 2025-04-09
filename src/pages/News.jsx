import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";

export default function News() {
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
      <div style={{ maxWidth: "1330px", padding: "35px", margin: "auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {news.map((n) => (
            <NewsCard
              key={n.id}
              image={n.photoUrl}
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
