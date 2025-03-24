import { NavLink, Outlet, useNavigate } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import AccountMenu from "./AccountMenu";
import HomeIcon from "@mui/icons-material/Home";

export default function Events() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

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
            <IconButton sx={{ width: 30, height: 30 }} onClick={handleToggle}>
              <MenuOpenIcon
                sx={{
                  fontSize: 18,
                  transform: toggle ? undefined : "scaleX(-1)",
                }}
              />
            </IconButton>
            <h1>Event Manager</h1>
          </div>
          <div>
            <AccountMenu
              fLetter={localStorage.getItem("name").charAt(0)}
              email={localStorage.getItem("email")}
              logout={handleLogout}
              delAcc={handleDelete}
            />
          </div>
        </div>
      </div>
      <div className="acc-nav">
        <div className="logo-nav">
          <div className="nav-links">
            <NavLink
              to="home"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              end
            >
              <HomeIcon fontSize="5px" />
              {toggle ? <span>Home</span> : undefined}
            </NavLink>

            <NavLink
              to="events"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <EventIcon fontSize="5px" />
              {toggle ? <span>Events</span> : undefined}
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
