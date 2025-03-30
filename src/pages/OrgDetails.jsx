import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function OrgDetails() {
  const params = useParams();
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
        console.log(resData);
      } else {
        console.log("notGG");
      }
    }

    orgIdDetail();
  }, []);
  return;
}
