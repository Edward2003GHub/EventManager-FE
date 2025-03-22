export default function Card({ name, startDate, endDate, des, attendees, roomId }) {
  return (
    <a
      href="#"
      style={{ textDecoration: "none", color: "inherit" }}
      className="card-link"
    >
      <div className="card">
        <h2>{name}</h2>
        <p className="date">Start date: {startDate}</p>
        <p className="date">End date: {endDate}</p>
        <p className="des">{des}</p>
        <p>{attendees}</p>
      </div>
    </a>
  );
}
