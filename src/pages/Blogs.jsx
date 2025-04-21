import { useState, useEffect } from "react";
import { getBlogs } from "../utility/apiGetCalls";
import { IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchAndSetBlogs() {
      const data = await getBlogs();
      if (data) {
        setBlogs(data);
      }
    }

    fetchAndSetBlogs();
  }, []);

  console.log(blogs);

  return (
    <>
      {blogs.map((blog) => (
        <div
          key={blog.blogId}
          style={{
            maxWidth: "800px",
            margin: "20px auto",
            padding: "20px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "15px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            fontFamily: "Arial, sans-serif",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              marginBottom: "10px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: "green",
                  color: "white",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {blog.userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div>
                  <span style={{ fontWeight: "500", fontSize: "25px" }}>
                    {blog.userName}
                  </span>
                </div>
                <span style={{ fontSize: "15px" }}>{formatDate(blog.timePosted)}</span>
              </div>
            </div>
            <IconButton aria-label="delete" sx={{ alignSelf: "flex-start" }}>
              <MoreHorizIcon />
            </IconButton>
          </div>

          <div
            style={{
              marginTop: "20px",
              marginBottom: "15px",
              fontSize: "20px",
              lineHeight: "1.5",
            }}
          >
            {blog.content}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                backgroundColor: "#2563eb",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              👍 0 Likes
            </button>
            <button
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                backgroundColor: "#4b5563",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              💬 {blog.comments.length} Comments
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
