export default function Carousel({ news }) {
  if (!news || news.length === 0) return null;

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {news.slice(0, 5).map((_, index) => (
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
        {news.slice(0, 5).map((n, index) => (
          <div
            key={n.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            
            <img
              src={n.photoUrl ? `https://localhost:7262/${n.photoUrl}` : "/Images/emptyPhoto.png"}
              className="d-block w-100 carousel-img"
              alt={`Slide ${index + 1}`}
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/id/1015/1200/400";
              }}
            />
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: "20px",
              }}
              className="carousel-caption d-none d-md-block"
            >
              <h6 style={{ color: "black" }}>{n.title}</h6>
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
