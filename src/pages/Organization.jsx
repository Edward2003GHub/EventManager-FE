import { useEffect, useState } from "react";
import OrgCard2 from "../components/OrgCard2";

export default function Organization() {
  const [org, setOrg] = useState([]);

  useEffect(() => {
    async function fetchOrg() {
      const response = await fetch("https://localhost:7262/api/Organizations", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const resData = await response.json();
      setOrg(resData);
    }

    fetchOrg();
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "1330px", margin: "auto", padding: "35px" }}>
      {org.map((each) => (
        <OrgCard2 description={each.description}/>
      ))}
    </div>
  );
}
