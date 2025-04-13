import { Button, Typography, Divider } from "@mui/material";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";

export default function OrgDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const privateOrg = useRouteLoaderData("private-org-details");
  const publicOrg = useRouteLoaderData("public-org-details");
  const org = privateOrg || publicOrg;

  async function handleDelete() {
    const response = await fetch(
      `https://localhost:7262/api/Organizations/${params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      console.log("delete failed");
    } else {
      navigate("/user/organizations");
    }
  }

  return (
    <div className="org-details-page">
      {localStorage.getItem("email") === "admin@example.com" && (
        <div className="org-actions">
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => navigate("edit")}
            className="edit-btn"
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            onClick={handleDelete}
            className="delete-btn"
          >
            Delete
          </Button>
        </div>
      )}

      <div className="org-header">
        <img
          src={`https://localhost:7262/${org.logoUrl}`}
          alt={org.name}
          className="org-logo-large"
        />
        <div className="org-info">
          <Typography variant="h4" className="org-name">
            {org.name}
          </Typography>
          <Typography variant="subtitle1" className="org-college">
            {org.college}
          </Typography>
        </div>
      </div>

      <Divider className="divider" />

      <div className="org-section">
        <Typography variant="h5" className="section-title">
          Description
        </Typography>
        <Typography variant="body1" className="org-description">
          {org.description}
        </Typography>
      </div>

      <Divider className="divider" />

      <div className="org-section">
        <Typography variant="h5" className="section-title">
          Contact Information
        </Typography>
        <div className="contact-info">
          <Typography variant="body1">
            <strong>Email:</strong> {org.email}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {org.contactNumber}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const response = await fetch(
    `https://localhost:7262/api/Organizations/${params.id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Response("Failed to fetch organization", {
      status: response.status,
    });
  }

  const resData = await response.json();
  return resData;
}