import { Button } from "@mui/material";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";

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
    <>
      <div style={{ maxWidth: "1330px", margin: "auto", padding: "35px" }}>
        {localStorage.getItem("token") && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                navigate("edit");
              }}
            >
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
        <div style={{ display: "flex" }}>
          <img
            src={`https://localhost:7262/${org.logoUrl}`}
            alt="org-img"
            style={{ borderRadius: "50%", width: "90px", height: "90px" }}
          />
          <div style={{ marginLeft: "20px" }}>
            <h1 style={{ margin: 0 }}>{org.name}</h1>
            <p style={{ margin: 0 }}>{org.college}</p>
          </div>
        </div>
        <h3>Description</h3>
        <p>{org.description}</p>
        <h3>Info</h3>
        <p>{org.email}</p>
        <p>{org.contactNumber}</p>
      </div>
    </>
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
