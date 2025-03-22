import { NavLink, Outlet, useNavigate } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

export default function Events() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  async function handleLogout() {
    try {
      const response = await fetch("https://localhost:7262/api/Account/Logout");

      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.log("Logging out error");
      }
    } catch (error) {
      console.log(error);
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
              <MenuOpenIcon sx={{ fontSize: 18, transform: toggle ? undefined : "scaleX(-1)" }} />
            </IconButton>
            <h1>Event Manager</h1>
          </div>
          <div>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="acc-nav">
        <div className="logo-nav">
          <div className="nav-links">
            <NavLink
              to="events"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <EventIcon fontSize="5px" />{toggle ? <span>Events</span> : undefined}
            </NavLink>

            <NavLink
              to="rooms"
              className={({ isActive }) => (isActive ? <span>active</span> : undefined)}
            >
              <EventSeatIcon fontSize="5px" />{toggle ? <span>Rooms</span> : undefined}
            </NavLink>

            <NavLink
              to="attendees"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <PeopleAltIcon fontSize="5px" />{toggle ? <span>Attendees</span> : undefined}
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
