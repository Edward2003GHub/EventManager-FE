import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import AccountMenu from "./AccountMenu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import { Button } from "@mui/material";

export default function Events() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  function handleLogin() {
    navigate("/login");
  }

  async function handleLogout() {
    try {
      const response = await fetch("https://localhost:7262/api/Account/Logout");

      if (response.ok) {
        localStorage.clear();
        navigate("/");
      } else {
        console.log("Logging out error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    const response = await fetch(
      `https://localhost:7262/api/Account/${localStorage.getItem("email")}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      localStorage.clear();
      console.log("Delete good!");
      navigate("/");
    } else {
      console.log("error");
    }
  }

  function handleToggle() {
    setToggle((prevT) => !prevT);
  }

  return (
    <>
      <div className="header-container">
        <div className="dashboard-header">
          <div className="brand">
            <IconButton sx={{ width: 40, height: 40 }} onClick={handleToggle}>
              <MenuOpenIcon
                sx={{
                  fontSize: 30,
                  transform: toggle ? undefined : "scaleX(-1)",
                }}
              />
            </IconButton>
            <img src="/Images/BAUClubs.png" alt="" width={"45px"} />
          </div>
          <div>
            {isLoggedIn ? (
              <AccountMenu
                fLetter={localStorage.getItem("name").charAt(0)}
                email={localStorage.getItem("email")}
                logout={handleLogout}
                delAcc={handleDelete}
              />
            ) : (
              <Button onClick={handleLogin} variant="contained" color="success">
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="acc-nav">
        <div className="logo-nav">
          <div className="nav-links">
            <NavLink
              to={isLoggedIn ? "home" : "/"}
              className={({ isActive }) => (isActive ? "active" : undefined)}
              end
            >
              <HomeOutlinedIcon sx={{ fontSize: 28 }} />
              {toggle ? <span>Home</span> : undefined}
            </NavLink>

            <NavLink
              to="events"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <EventOutlinedIcon sx={{ fontSize: 28 }} />
              {toggle ? <span>Events</span> : undefined}
            </NavLink>

            <NavLink
              to="organizations"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <PeopleOutlineOutlinedIcon sx={{ fontSize: 28 }} />
              {toggle ? <span>Organizations</span> : undefined}
            </NavLink>

            <NavLink
              to="news"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <ArticleOutlinedIcon sx={{ fontSize: 28 }} />
              {toggle ? <span>News</span> : undefined}
            </NavLink>

            <NavLink
              to="forms"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <SummarizeOutlinedIcon sx={{ fontSize: 28 }} />
              {toggle ? <span>Forms</span> : undefined}
            </NavLink>
          </div>
        </div>
      </div>
      <div className="dashboard-wrapper">
        <Outlet />
      </div>
    </>
  );
}
