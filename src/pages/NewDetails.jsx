import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function NewDetails() {
  const params = useParams();
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNewById() {
      const response = await fetch(
        `https://localhost:7262/api/News/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await response.json();
      setNews(resData);
    }

    fetchNewById();
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Change to false for 24-hour format
    });
  };

  return (
    <div
      style={{
        maxWidth: "1330px",
        margin: "auto",
        padding: "35px",
        backgroundColor: "white",
      }}
    >
      <h1 style={{ margin: 0 }}>{news.title}</h1>
      <p style={{ marginTop: 0 }}>Posted {formatDate(news.createdDate)}</p>
      <div style={{ width: "100%", overflow: "hidden", margin: "20px 0" }}>
        <div style={{ textAlign: "center", maxWidth: "850px", margin: "auto" }}>
          <img
            src={`https://localhost:7262/${news.photoUrl}`}
            alt="news-img"
            style={{ minWidth: "inherit", margin: "0px", width: "100%" }}
          />
        </div>
      </div>
      <div style={{ margin: "auto", maxWidth: "850px" }}>
        <div
          dangerouslySetInnerHTML={{ __html: news.content }}
          style={{ padding: "20px", backgroundColor: "rgb(248, 248, 248)" }}
        />
      </div>
    </div>
  );
}
