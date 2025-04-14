import { Button } from "@mui/material";
import Input2 from "./Input2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrgs } from "../utility/apiGetCalls";

export default function EventForm({ event, method }) {
  const navigate = useNavigate();
  const params = useParams();
  const [org, setOrg] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);

    fd.set("organizationID", selectedOrgId);

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

  useEffect(() => {
    async function fetchAndSetOrgs() {
      const data = await getOrgs();
      if (data) {
        setOrg(data);
      }
    }

    fetchAndSetOrgs();
  }, []);

  useEffect(() => {
    if (event?.organizationID) {
      setSelectedOrgId(event.organizationID);
    }
  }, [event]);

  return (
    <div className="event-form-container">
      <h2 className="event-form-header">{method === "POST" ? "Create Event" : "Edit Event"}</h2>
      <form
        onSubmit={handleSubmit}
        className="event-form"
      >
        <div className="form-grid">
          <div className="form-column">
            <Input2
              label="Event Name"
              type="text"
              name="Name"
              defaultValue={event?.name || ""}
              fullWidth
            />
            <Input2
              label="Description"
              type="text"
              name="Description"
              multiline
              rows={10}
              defaultValue={event?.description || ""}
              fullWidth
            />
          </div>
          
          <div className="form-column">
            <Input2
              label="Start Time"
              type="datetime-local"
              name="StartTime"
              InputLabelProps={{ shrink: true }}
              defaultValue={event?.startTime.split(".")[0] || ""}
              fullWidth
            />
            <Input2
              label="End Time"
              type="datetime-local"
              name="EndTime"
              InputLabelProps={{ shrink: true }}
              defaultValue={event?.endTime.split(".")[0] || ""}
              fullWidth
            />
            
            <div className="form-control">
              <label>Organization</label>
              <select
                value={selectedOrgId}
                onChange={(e) => setSelectedOrgId(e.target.value)}
                required
                className="org-select"
              >
                <option value="">Select an organization</option>
                {org.map((o) => (
                  <option key={o.organizationID} value={o.organizationID}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>
            
            <Input2
              label="Event Photo"
              InputLabelProps={{ shrink: true }}
              type="file"
              name="EventPhoto"
              fullWidth
            />
            <Input2
              label="Photo URL"
              type="text"
              name="PhotoUrl"
              defaultValue={event?.photoUrl || ""}
              fullWidth
            />
          </div>
        </div>
        
        <Button 
          variant="contained" 
          type="submit"
          className="submit-btn"
          color="success"
        >
          {method === "POST" ? "Create Event" : "Update Event"}
        </Button>
      </form>
    </div>
  );
}
