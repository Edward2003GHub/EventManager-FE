import DateRangeIcon from "@mui/icons-material/DateRange";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";

export default function Card({ orgId, name, startDate, image }) {
  const [org, setOrg] = useState([]);

  useEffect(() => {
    async function fetchOrgById() {
      const response = await fetch(`https://localhost:7262/api/Organizations/${orgId}`);

      if (!response.ok) {
        console.log("fetch error");
      } else {
        setOrg(await response.json());
      }
    }

    fetchOrgById();
  }, []);
  const formattedStartDate = startDate
    ? format(parseISO(startDate), "EEEE, MMM d, yyyy 'at' h:mm a")
    : "N/A";

  return (
    <div className="card">
      <div>
        <img src={!image ? "/Images/emptyPhoto.png" : `https://localhost:7262/${image}`} alt="event-img" />
        <h3>{name}</h3>
      </div>
      <p className="date">
        <DateRangeIcon fontSize="5px" />
        {formattedStartDate}
      </p>
      <p className="org-name">{org.name}</p>
    </div>
  );
}
