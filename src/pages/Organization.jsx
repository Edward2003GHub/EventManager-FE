import { useEffect, useState } from "react";
import OrgCard2 from "../components/OrgCard2";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Organization() {
  const navigate = useNavigate();
  const [org, setOrg] = useState([]);

  useEffect(() => {
    async function fetchOrg() {
      const response = await fetch("https://localhost:7262/api/Organizations");
      const resData = await response.json();
      setOrg(resData);
    }

    fetchOrg();
  }, []);
  return (
    <>
      {localStorage.getItem("token") && (
        <div
          style={{
            maxWidth: "1330px",
            margin: "auto",
            padding: "20px 35px 0px 35px",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("new")}
          >
            Add Organization
          </Button>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "1330px",
          margin: "auto",
          padding: "35px",
        }}
      >
        {org.map((each) => (
          <OrgCard2
            key={each.organizationID}
            image={each.logoUrl}
            description={each.description}
            to={each.organizationID}
            name={each.name}
          />
        ))}
      </div>
    </>
  );
}
