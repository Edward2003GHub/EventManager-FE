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
        defaultValue={org?.name || ""}
      />
      <Input2
        label="Description"
        type="text"
        name="Description"
        defaultValue={org?.description || ""}
      />
      <Input2
        label="College"
        type="text"
        name="College"
        defaultValue={org?.college || ""}
      />
      <Input2
        label="Contact Number"
        type="number"
        name="ContactNumber"
        defaultValue={org?.contactNumber || ""}
      />
      <Input2
        label="Email"
        type="email"
        name="Email"
        defaultValue={org?.email || ""}
      />
      <Input2
        InputLabelProps={{ shrink: true }}
        label="Logo"
        type="file"
        name="Logo"
      />
      <Input2
        label="Logo Url"
        type="text"
        name="LogoUrl"
        defaultValue={org?.logoUrl || ""}
      />
      <Button variant="contained" type="submit">
        {method === "POST" ? "Add Organization" : "Edit Organization"}
      </Button>
    </form>
  );
}
