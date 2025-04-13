import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export default function OrgCard2({ description, name, image, to }) {
  return (
    <Link to={to} className="org-card2-link">
      <div className="org-card2">
        <img
          src={`https://localhost:7262/${image}`}
          alt={name}
          className="org-logo"
        />
        <div className="org-card2-content">
          <Typography variant="subtitle1" className="org-card2-title">
            {name}
          </Typography>
          <Typography variant="body2" className="org-card2-description">
            {description}
          </Typography>
        </div>
      </div>
    </Link>
  );
}