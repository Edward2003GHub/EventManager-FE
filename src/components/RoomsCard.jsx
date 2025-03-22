export default function RoomsCard({ name, description, seats }) {
  return (
    <a
      href="#"
      style={{ textDecoration: "none", color: "inherit" }}
      className="card-link"
    >
      <div className="card">
        <h2>{name}</h2>
        <p className="des">{description}</p>
      </div>
    </a>
  );
}
