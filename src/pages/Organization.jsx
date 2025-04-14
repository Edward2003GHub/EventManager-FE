import { useEffect, useState } from "react";
import { Button, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import OrgCard from "../components/OrgCard";
import { getOrgs } from "../utility/apiGetCalls";

export default function Organization() {
  const navigate = useNavigate();
  const [orgs, setOrgs] = useState([]);
  const [groupedOrgs, setGroupedOrgs] = useState({});

  useEffect(() => {
    async function fetchAndSetOrgs() {
      const resData = await getOrgs();
      if (resData) {
        setOrgs(resData);
      }

      // Group organizations by category
      const grouped = resData.reduce((acc, org) => {
        const category = org.category || "Other";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(org);
        return acc;
      }, {});
      setGroupedOrgs(grouped);
    }

    fetchAndSetOrgs();
  }, []);

  return (
    <div className="organizations-page">
      <div className="organizations-header">
        <Typography variant="h4" component="h1" className="page-title">
          University Organizations
        </Typography>
        {localStorage.getItem("email") === "admin@example.com" && (
          <Button
            variant="contained"
            color="success"
            startIcon={<Add />}
            onClick={() => navigate("new")}
            className="add-org-btn"
          >
            Add Organization
          </Button>
        )}
      </div>

      {Object.keys(groupedOrgs).length === 0 ? (
        <Typography className="no-orgs-message">
          No organizations found
        </Typography>
      ) : (
        <div className="org-categories">
          {Object.entries(groupedOrgs).map(([category, orgs]) => (
            <div key={category} className="org-category">
              <Typography variant="h5" className="category-title">
                {category}
              </Typography>
              <Divider className="category-divider" />
              <div className="orgs-grid">
                {orgs.map((org) => (
                  <OrgCard
                    key={org.organizationID}
                    name={org.name}
                    image={org.logoUrl}
                    to={org.organizationID}
                    description={org.description}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
