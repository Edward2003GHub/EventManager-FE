export default function Carousel({ news }) {
  if (!news || news.length === 0) return null;

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {news.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : undefined}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {news.map((n, index) => (
          <div
            key={n.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={`https://localhost:7262/${n.photoUrl}`}
              className="d-block w-100"
              alt={`Slide ${index + 1}`}
              style={{ height: "600px", objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/id/1015/1200/400";
              }}
            />
            <div style={{backgroundColor: "white", borderRadius: "20px"}} className="carousel-caption d-none d-md-block">
              <h5 style={{color: "black"}}>{n.title}</h5>
              <div dangerouslySetInnerHTML={{ __html: n.content }} />
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
