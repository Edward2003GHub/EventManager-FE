import { IconButton, Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getComments } from "../utility/apiGetCalls";
import Input2 from "../components/Input2";
import SendIcon from "@mui/icons-material/Send";

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
  const [comments, setComments] = useState([]);
  const [commentEmpty, setCommentEmpty] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    let hasError = false;

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (!data.content.trim()) {
      setCommentEmpty(true);
      hasError = true;
    } else {
      setCommentEmpty(false);
    }

    if (hasError) return;

    try {
      const res = await fetch(
        `https://localhost:7262/api/Comments/${params.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            content: data.content,
          }),
        }
      );

      if (!res.ok) {
        console.log(res.status);
      } else {
        event.target.reset();
        getAllComments();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getAllComments = async () => {
    const data = await getComments(params.id, localStorage.getItem("token"));
    if (data) {
      setComments(data);
    }
  };

  useEffect(() => {
    getAllComments();
  }, [params.id]);

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
          maxWidth: "1330px",
          margin: "auto",
          padding: "35px",
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
              {comments.length}&nbsp; <ChatIcon />
            </Button>
          </div>
        </div>
        <div>
          <h5>Comments</h5>
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
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {comments.length === 0 && (
                <span>Be the first one to add comment!</span>
              )}
              {comments.map((comment) => (
                <div key={comment.id}>
                  <div style={{ display: "flex", gap: "15px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "green",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        color: "white",
                        fontSize: "30px",
                      }}
                    >
                      {comment.commentatorName.charAt(0)}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "3px",
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "rgb(228, 228, 228)",
                          padding: "6px",
                          borderRadius: "8px",
                        }}
                      >
                        <div style={{ fontWeight: "bolder", fontSize: "25px" }}>
                          {comment.commentatorName}
                        </div>
                        <div style={{ fontSize: "20px" }}>
                          {comment.content}
                        </div>
                      </div>
                      <div
                        style={{
                          color: "rgb(156, 156, 156)",
                          fontSize: "13px",
                        }}
                      >
                        {formatDate(comment.timeCommented)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            left: "200px",
            width: "1330px",
            maxWidth: '1330px',
            margin: 'auto',
            display: "flex",
            gap: "10px",
            background: "white",
            padding: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Input2
            style={{ flex: 1 }}
            label="Add comment"
            name="content"
            error={commentEmpty}
            errorText="Please add comment first."
          />
          <Button type="submit" variant="contained" color="success">
            <SendIcon />
          </Button>
        </div>
      </form>

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
