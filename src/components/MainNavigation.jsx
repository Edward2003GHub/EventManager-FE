import { NavLink, Outlet, useNavigate } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import IconButton from "@mui/material/IconButton";

export default function Events() {
  const navigate = useNavigate();

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

  return (
    <>
      <div className="header-container">
        <div className="dashboard-header">
          <div className="brand">
            <IconButton sx={{ width: 30, height: 30 }}>
              <MenuOpenIcon sx={{ fontSize: 18 }} />
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
              <EventIcon fontSize="5px" />
            </NavLink>

            <NavLink
              to="rooms"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <EventSeatIcon fontSize="5px" />
            </NavLink>

            <NavLink
              to="attendees"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <PeopleAltIcon fontSize="5px" />
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
