import { useState, useEffect } from "react";
import { getBlogs } from "../utility/apiGetCalls";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import BlogCard from "../components/BlogCard";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    async function fetchAndSetBlogs() {
      const data = await getBlogs();
      if (data) {
        setBlogs(data);
      }
    }

    fetchAndSetBlogs();
  }, []);

  const handleMenuClick = (event, blogId) => {
    setAnchorEl(event.currentTarget);
    setSelectedBlogId(blogId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBlogId(null);
  };

  const handleDelete = async () => {
    handleMenuClose();

    try {
      const res = await fetch(
        `https://localhost:7262/api/Blogs/${selectedBlogId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.ok) {
        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog.blogId !== selectedBlogId)
        );
        console.log(`Blog with ID ${selectedBlogId} deleted successfully.`);
      } else {
        console.error("Failed to delete blog:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <>
      {blogs.map((blog) => (
        <BlogCard
          key={blog.blogId}
          blog={blog}
          onOptionsClick={handleMenuClick}
        />
      ))}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1, color: "red" }} />
          <span style={{ color: "red" }}>Delete Post</span>
        </MenuItem>
      </Menu>
    </>
  );
}
