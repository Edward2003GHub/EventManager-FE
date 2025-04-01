import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrgDetails() {
  const params = useParams();
  const [org, setOrg] = useState([]);

  useEffect(() => {
    async function orgIdDetail() {
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

      const resData = await response.json();

      if (response.ok) {
        setOrg(resData);
      } else {
        console.log("notGG");
      }
    }

    orgIdDetail();
  }, [params.id]);
  return (
    <>
      <div style={{ maxWidth: "1330px", margin: "auto", padding: "35px" }}>
        <div style={{ display: "flex" }}>
          <img src="https://picsum.photos/id/1/200/300" alt="org-img" style={{borderRadius: "50%", width: "90px", height: "90px"}} />
          <div style={{marginLeft: "20px"}}>
            <h1 style={{margin: 0}}>{org.name}</h1>
            <p style={{margin: 0}}>{org.college}</p>
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
