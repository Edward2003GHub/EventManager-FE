import DateRangeIcon from "@mui/icons-material/DateRange";
import { format, parseISO } from "date-fns";

export default function Card({ name, startDate }) {
  const formattedStartDate = startDate
    ? format(parseISO(startDate), "EEEE, MMM d, yyyy 'at' h:mm a")
    : "N/A";

  return (
    <div className="card">
      <div>
        <img src="https://picsum.photos/id/1/200/300" alt="event-img" />
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
