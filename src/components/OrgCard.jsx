import { Link } from "react-router-dom";

export default function OrgCard({ name, to }) {
  return (
    <Link to={to} className="org-link">
      <div className="org-card">
        <img
          src="https://picsum.photos/id/1/200/300"
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
