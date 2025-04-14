import { Button } from "@mui/material";
import Input2 from "./Input2";
import { useNavigate, useParams } from "react-router-dom";

export default function OrgForm({ org, method }) {
  const navigate = useNavigate();
  const params = useParams();

  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);

    let url = "https://localhost:7262/api/Organizations";

    if (method === "PATCH") {
      url = `https://localhost:7262/api/Organizations?Id=${params.id}`;
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
      console.log("newOrgFail");
    } else {
      navigate("/user/organizations");
    }
  }

  return (
    <div className="org-form-container">
      <h2 className="org-form-header">{method === "POST" ? "Create Organization" : "Edit Organization"}</h2>
      <form onSubmit={handleSubmit} className="org-form">
        <div className="form-grid">
          <div className="form-column">
            <Input2
              label="Organization Name"
              type="text"
              name="Name"
              defaultValue={org?.name || ""}
              fullWidth
            />
            <Input2
              label="College"
              type="text"
              name="College"
              defaultValue={org?.college || ""}
              fullWidth
            />
            <Input2
              label="Contact Number"
              type="tel"
              name="ContactNumber"
              defaultValue={org?.contactNumber || ""}
              fullWidth
            />
            <Input2
              label="Email"
              type="email"
              name="Email"
              defaultValue={org?.email || ""}
              fullWidth
            />
          </div>
  
          <div className="form-column">
            <Input2
              label="Description"
              type="text"
              name="Description"
              multiline
              rows={10}
              defaultValue={org?.description || ""}
              fullWidth
            />
            <div className="file-input-group">
              <Input2
                InputLabelProps={{ shrink: true }}
                label="Organization Logo"
                type="file"
                name="Logo"
                fullWidth
              />
            </div>
          </div>
        </div>
  
        <Button 
          variant="contained" 
          type="submit"
          className="submit-btn"
          color="success"
        >
          {method === "POST" ? "Create Organization" : "Update Organization"}
        </Button>
      </form>
    </div>
  );
}
