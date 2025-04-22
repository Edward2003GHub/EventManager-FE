import { IconButton, Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default function BlogDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    async function getBlogById() {
      try {
        const res = await fetch(
          `https://localhost:7262/api/Blogs/${params.id}`
        );
        if (res.ok) {
          const resData = await res.json();
          setBlog(resData);
        } else {
          console.log(res.status);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getBlogById();
  }, [params.id]);

  if (!blog) return <p align="center">Loading...</p>;

  const handleDelete = async () => {
    handleMenuClose();

    try {
      const res = await fetch(
        `https://localhost:7262/api/Blogs/${blog.blogId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.ok) {
        navigate("..");
      } else {
        console.error("Failed to delete blog:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "35px",
          maxWidth: "800px",
          margin: "auto",
          padding: "10px",
        }}
      >
        <div
          style={{
            padding: "1.5rem",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "1rem",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            fontFamily: "Arial, sans-serif",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            {/* User Info */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  backgroundColor: "green",
                  color: "white",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  flexShrink: 0,
                }}
                aria-label={`Avatar of ${blog.userName}`}
              >
                {blog.userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "1.5rem" }}>
                  {blog.userName}
                </div>
                <div style={{ fontSize: "0.875rem", color: "#ccc" }}>
                  {formatDate(blog.timePosted)}
                </div>
              </div>
            </div>

            {/* Options Icon */}
            {blog.userId === localStorage.getItem("userId") && (
              <IconButton
                aria-label="Options"
                onClick={(e) => handleMenuClick(e)}
                sx={{ alignSelf: "flex-start" }}
              >
                <MoreHorizIcon />
              </IconButton>
            )}
          </div>

          {/* Blog Content */}
          <div
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.6,
              marginBottom: "1rem",
              whiteSpace: "pre-line",
            }}
          >
            <h3>{blog.title}</h3>
            {blog.content}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Button color="success" variant="contained">
              0&nbsp; <ThumbUpAltIcon />
            </Button>
            <Button
              color="success"
              disabled
              onClick={() => navigate(`/user/blogs/${blog.blogId}`)}
            >
              {blog.comments.length || 0}&nbsp; <ChatIcon />
            </Button>
          </div>
        </div>
        <div>
          <h5>Messages</h5>
          <div
            style={{
              padding: "1.5rem",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "1rem",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              fontFamily: "Arial, sans-serif",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            {blog.comments.length === 0 && (
              <span>There's no comments for this blog!</span>
            )}
          </div>
        </div>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem>
          <EditIcon sx={{ mr: 1, color: "green" }} />
          <span style={{ color: "green" }}>Edit Post</span>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1, color: "red" }} />
          <span style={{ color: "red" }}>Delete Post</span>
        </MenuItem>
      </Menu>
    </>
  );
}
