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
    <div className="news-form-container">
      <form onSubmit={handleSubmit} className="news-form">
        <div className="form-header">
          <h2 className="form-title">
            {method === "POST" ? "Create News Article" : "Edit News Article"}
          </h2>
        </div>
  
        <div className="form-content">
          <Input2
            label="Article Title"
            type="text"
            name="Title"
            defaultValue={n?.title || ""}
            fullWidth
          />
  
          <Input2
            label="Content"
            type="text"
            name="Content"
            multiline
            rows={12}
            defaultValue={n?.content || ""}
            fullWidth
          />
  
          <div className="image-input-group">
            <Input2
              InputLabelProps={{ shrink: true }}
              label="Featured Image"
              type="file"
              name="NewsPhoto"
              fullWidth
            />
            <Input2
              label="Image URL"
              type="text"
              name="PhotoUrl"
              defaultValue={n?.photoUrl || ""}
              fullWidth
            />
          </div>
  
          <Button 
            variant="contained" 
            type="submit"
            className="submit-btn"
            color="success"
          >
            {method === "POST" ? "Publish News" : "Update Article"}
          </Button>
        </div>
      </form>
    </div>
  );
}
