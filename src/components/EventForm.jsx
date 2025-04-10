import { Button } from "@mui/material";
import Input2 from "./Input2";
import { useNavigate } from "react-router-dom";

export default function EventForm({ event, method }) {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);

    const response = await fetch("https://localhost:7262/api/Events", {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // Don't manually set Content-Type when using FormData
      },
      body: fd,
    });

    if (!response.ok) {
      console.log("newEventFail");
    }

    navigate("/user/events");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "1330px",
        margin: "auto",
        gap: "10px",
        padding: "35px",
      }}
    >
      <Input2
        label="Name"
        type="text"
        name="Name"
        defaultValue={event?.name || ""}
      />
      <Input2
        label="Description"
        type="text"
        name="Description"
        defaultValue={event?.description || ""}
      />
      <Input2
        label="Start Time"
        type="datetime-local"
        name="StartTime"
        InputLabelProps={{ shrink: true }}
        defaultValue={event?.startTime || ""}
      />
      <Input2
        label="End Time"
        type="datetime-local"
        name="EndTime"
        InputLabelProps={{ shrink: true }}
        defaultValue={event?.endTime || ""}
      />
      <Input2 type="file" name="EventPhoto" />
      <Input2
        label="Photo Url"
        type="text"
        name="PhotoUrl"
        defaultValue={event?.photoUrl || ""}
      />
      <Button variant="contained" type="submit">
        Add Event
      </Button>
    </form>
  );
}
