import DateRangeIcon from "@mui/icons-material/DateRange";
import { format, parseISO } from "date-fns";

export default function Card({ name, startDate, image }) {
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
      <p className="org-name">Organization name</p>
    </div>
  );
}
