import { useState, useEffect } from "react";
import { getBlogs } from "../utility/apiGetCalls";
import { Button, Fab, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import BlogCard from "../components/BlogCard";
import { Modal, Fade, Backdrop, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Input2 from "../components/Input2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const [titleEmpty, setTitleEmpty] = useState(false);
  const [contentEmpty, setContentEmpty] = useState(false);

  const open = Boolean(anchorEl);

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => {
    setTitleEmpty(false);
    setContentEmpty(false);
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);

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

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    let hasError = false;

    if (!data.title.trim()) {
      setTitleEmpty(true);
      hasError = true;
    } else {
      setTitleEmpty(false);
    }

    if (!data.content.trim()) {
      setContentEmpty(true);
      hasError = true;
    } else {
      setContentEmpty(false);
    }

    if (hasError) return;

    const payload = {
      title: data.title,
      content: data.content,
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("name"),
      timePosted: new Date().toISOString(),
    };

    try {
      const res = await fetch("https://localhost:7262/api/Blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const newBlog = await res.json();
        setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
        setModalOpen(false);
      } else {
        console.error("Failed to add blog:", res.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          maxWidth: "800px",
          margin: "auto",
          padding: "10px",
        }}
      >
        {blogs.map((blog) => (
          <BlogCard
            key={blog.blogId}
            blog={blog}
            onOptionsClick={handleMenuClick}
          />
        ))}
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

      {localStorage.getItem("token") && (
        <Fab
          color="success"
          aria-label="add"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 1000,
          }}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <h2>Add Blog</h2>
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                <Input2
                  label="Title"
                  name="title"
                  error={titleEmpty}
                  errorText="Please fill this field"
                />
                <Input2
                  label="Content"
                  name="content"
                  error={contentEmpty}
                  errorText="Please fill this field"
                />
                <Button
                  type="submit"
                  style={{ marginTop: "15px" }}
                  color="success"
                  variant="contained"
                >
                  Add Blog
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
