import { Link } from "react-router-dom";

export default function NewsCard({ title, date, isUpdated, image, content, to }) {
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
    <Link to={to} style={{ textDecoration: "none", color: "black" }}>
      <div className="news-card">
        <div
          className="news-img"
          style={{ backgroundImage: `url(https://localhost:7262/${image})` }}
        ></div>
        <div className="news-padding">
          <h3>{title}</h3>
          <p className="news-detail">
            {(isUpdated ? "Updated: " : "Created: ") + formatDate(date)}
          </p>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </Link>
  );
}
