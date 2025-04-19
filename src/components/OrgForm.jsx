import { Button } from "@mui/material";
import Input2 from "./Input2";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function OrgForm({ org, method }) {
  const navigate = useNavigate();
  const params = useParams();

  const [orgEmpty, setOrgEmpty] = useState(false);
  const [collegeEmpty, setCollegeEmpty] = useState(false);
  const [numberEmpty, setNumberEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [desEmpty, setDesEmpty] = useState(false);
  const [photoEmpty, setPhotoEmpty] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    let hasError = false;

    if (!data.Name.trim()) {
      setOrgEmpty(true);
      hasError = true;
    } else {
      setOrgEmpty(false);
    }

    if (!data.Description.trim()) {
      setDesEmpty(true);
      hasError = true;
    } else {
      setDesEmpty(false);
    }

    if (!data.College.trim()) {
      setCollegeEmpty(true);
      hasError = true;
    } else {
      setCollegeEmpty(false);
    }

    if (!data.ContactNumber.trim()) {
      setNumberEmpty(true);
      hasError = true;
    } else {
      setNumberEmpty(false);
    }

    if (!data.Email.trim()) {
      setEmailEmpty(true);
      hasError = true;
    } else {
      setEmailEmpty(false);
    }

    const orgPhotoFile = fd.get("Logo");

    if (method === "POST" && (!orgPhotoFile || orgPhotoFile.size === 0)) {
      setPhotoEmpty(true);
      hasError = true;
    } else {
      setPhotoEmpty(false);
    }

    if (hasError) return;

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
      <h2 className="org-form-header">
        {method === "POST" ? "Create Organization" : "Edit Organization"}
      </h2>
      <form onSubmit={handleSubmit} className="org-form">
        <div className="form-grid">
          <div className="form-column">
            <Input2
              label="Organization Name"
              type="text"
              name="Name"
              defaultValue={org?.name || ""}
              error={orgEmpty}
              errorText="Please fill this field"
              fullWidth
            />
            <Input2
              label="College"
              type="text"
              name="College"
              defaultValue={org?.college || ""}
              error={collegeEmpty}
              errorText="Please fill this field"
              fullWidth
            />
            <Input2
              label="Contact Number"
              type="tel"
              name="ContactNumber"
              defaultValue={org?.contactNumber || ""}
              error={numberEmpty}
              errorText="Please fill this field"
              fullWidth
            />
            <Input2
              label="Email"
              type="email"
              name="Email"
              defaultValue={org?.email || ""}
              error={emailEmpty}
              errorText="Please fill this field"
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
              error={desEmpty}
              errorText="Please fill this field"
              fullWidth
            />
            <div className="file-input-group">
              <Input2
                InputLabelProps={{ shrink: true }}
                label="Organization Logo"
                type="file"
                name="Logo"
                error={photoEmpty}
                errorText="Please pick an image"
                fullWidth
              />
            </div>
          </div>
        </div>

        <Input2 style={{display: "none"}} name="LogoUrl" defaultValue={org?.logoUrl || ""} />

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
