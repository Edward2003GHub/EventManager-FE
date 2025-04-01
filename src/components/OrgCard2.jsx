import { Link } from "react-router-dom";

export default function OrgCard2({ description, name, to }) {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "black" }}>
      <div className="org-card2">
        <img
          src="https://picsum.photos/id/1/200/300"
          alt=""
          width="75px"
          height="75px"
          style={{ borderRadius: "50%" }}
        />
        <div style={{ padding: "0 16px", margin: "0 0 16px 0", flexGrow: 1 }}>
          <h2 style={{marginTop: 0}}>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}
