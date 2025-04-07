import { Link } from "react-router-dom";

export default function OrgCard({ name, image, to }) {
  return (
    <Link to={to} className="org-link">
      <div className="org-card">
        <img
          src= {`https://localhost:7262/${image}`}
          alt=""
          width="77px"
          height="77px"
          style={{ borderRadius: "50%", marginBottom: "20px" }}
        />
        <p style={{fontWeight: "normal", margin: 0}}>{name}</p>
      </div>
    </Link>
  );
}
