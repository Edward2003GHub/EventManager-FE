export default function NewsCard({
  image,
  title,
  date,
  postedBy,
  description,
}) {
  return (
    <a href="#" style={{textDecoration: "none", color: "black"}}>
      <div className="news-card">
        <div className="news-img" style={{backgroundImage: `url(${image})`}}></div>
        <div className="news-padding">
          <h3>{title}</h3>
          <p className="news-detail">{date}</p>
          <p className="news-detail">{postedBy}</p>
          <p>{description}</p>
        </div>
      </div>
    </a>
  );
}
