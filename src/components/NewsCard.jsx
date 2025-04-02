export default function NewsCard({ title, cdate, udate, content }) {
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
    <a href="#" style={{ textDecoration: "none", color: "black" }}>
      <div className="news-card">
        <div
          className="news-img"
          style={{ backgroundImage: "url(https://picsum.photos/id/1/200/300)" }}
        ></div>
        <div className="news-padding">
          <h3>{title}</h3>
          <p className="news-detail">{"Created: " + formatDate(cdate)}</p>
          <p className="news-detail">{"Updated: " + formatDate(udate)}</p>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </a>
  );
}