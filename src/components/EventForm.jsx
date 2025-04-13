import { Button } from "@mui/material";
import Input2 from "./Input2";
import { useNavigate, useParams } from "react-router-dom";

export default function EventForm({ event, method }) {
  const navigate = useNavigate();
  const params = useParams();

  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);

    let url = "https://localhost:7262/api/Events";

    if (method === "PATCH") {
      url = `https://localhost:7262/api/Events?Id=${params.id}`;
    }

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // Don't manually set Content-Type when using FormData
      },
      body: fd,
    });

    if (!response.ok) {
      console.log("newEventFail");
    } else {
      navigate("/user/events");
    }
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
        multiline
        rows={10}
        defaultValue={event?.description || ""}
      />
      <Input2
        label="Start Time"
        type="datetime-local"
        name="StartTime"
        InputLabelProps={{ shrink: true }}
        defaultValue={event?.startTime.split(".")[0] || ""}
      />
      <Input2
        label="End Time"
        type="datetime-local"
        name="EndTime"
        InputLabelProps={{ shrink: true }}
        defaultValue={event?.endTime.split(".")[0] || ""}
      />
      <Input2
        label="Event Photo"
        InputLabelProps={{ shrink: true }}
        type="file"
        name="EventPhoto"
      />
      <Input2
        label="Photo Url"
        type="text"
        name="PhotoUrl"
        defaultValue={event?.photoUrl || ""}
      />
      <Button variant="contained" type="submit">
        {method === "POST" ? "Add Event" : "Edit Event"}
      </Button>
    </form>
  );
}
