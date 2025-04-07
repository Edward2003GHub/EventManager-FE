import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import AccountMenu from "./AccountMenu";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import { Button } from "@mui/material";

export default function Events() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle((prevT) => !prevT);
  }

  function handleLogin() {
    navigate("/login");
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
            <img src="../../Images/BAUClubs.png" alt="" width={"70px"} />
          </div>
          <div>
            <Button onClick={handleLogin} variant="contained">Login</Button>
          </div>
        </div>
      </div>
      <div className="acc-nav">
        <div className="logo-nav">
          <div className="nav-links">
            <NavLink
              to=""
              className={({ isActive }) => (isActive ? "active" : undefined)}
              end
            >
              <HomeOutlinedIcon sx={{fontSize: 28}} />
              {toggle ? <span>Home</span> : undefined}
            </NavLink>

            <NavLink
              to="events"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <EventOutlinedIcon sx={{fontSize: 28}} />
              {toggle ? <span>Events</span> : undefined}
            </NavLink>

            <NavLink
              to="organizations"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <PeopleOutlineOutlinedIcon sx={{fontSize: 28}} />
              {toggle ? <span>Organizations</span> : undefined}
            </NavLink>

            <NavLink
              to="news"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <ArticleOutlinedIcon sx={{fontSize: 28}} />
              {toggle ? <span>News</span> : undefined}
            </NavLink>

            <NavLink
              to="forms"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <SummarizeOutlinedIcon sx={{fontSize: 28}} />
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
