import { Button } from "@mui/material";
import Input2 from "./Input2";

export default function EventForm({ event }) {
  return (
    <form method="post" style={{display: "flex", flexDirection: "column", maxWidth: "1330px", margin: "auto", gap: "10px", padding: "35px"}}>
      <Input2
        label="Name"
        type="text"
        name="name"
        defaultValue={event ? event.name : ""}
      />
      <Input2
        label="Description"
        type="text"
        name="description"
        defaultValue={event ? event.description : ""}
      />
      <Input2
        label="Start Time"
        type="text"
        name="startTime"
        defaultValue={event ? event.startTime : ""}
      />
      <Input2
        label="End Time"
        type="text"
        name="endTime"
        defaultValue={event ? event.endTime : ""}
      />
      <Input2
        type="file"
        name="eventPhoto"
        defaultValue={event ? event.eventPhoto : ""}
      />
      <Input2
        label="Photo Url"
        type="text"
        name="photoUrl"
        defaultValue={event ? event.photoUrl : ""}
      />
      <Button variant="contained" type="submit">Add Event</Button>
    </form>
  );
}
