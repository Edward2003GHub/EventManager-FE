import { Button } from "@mui/material";
import Input2 from "./Input2";
import { useNavigate, useParams } from "react-router-dom";

export default function NewForm({ n, method }) {
  const navigate = useNavigate();
  const params = useParams();

  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);

    let url = "https://localhost:7262/api/News";

    if (method === "PATCH") {
      url = `https://localhost:7262/api/News/${params.id}`;
    }

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: fd,
    });

    if (!response.ok) {
      console.log("newNewFail");
    } else {
      navigate("/user/news");
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
        label="Title"
        type="text"
        name="Title"
        defaultValue={n?.title || ""}
      />
      <Input2
        label="Content"
        type="text"
        name="Content"
        defaultValue={n?.content || ""}
      />
      <Input2 type="file" name="NewsPhoto" />
      <Input2
        label="Photo Url"
        type="text"
        name="PhotoUrl"
        defaultValue={n?.photoUrl || ""}
      />
      <Button variant="contained" type="submit">
        {method === "POST" ? "Add News" : "Edit News"}
      </Button>
    </form>
  );
}
