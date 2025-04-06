import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Events from "./pages/Events";
import Home from "./pages/Home";
import EventDetails from "./pages/EventsDetails";
import EventsRoot from "./components/EventsRoot";
import Organization from "./pages/Organization";
import News from "./pages/News";
import Forms from "./pages/Forms";
import OrgDetails from "./pages/OrgDetails";
import OrgRoot from "./components/OrgRoot";
import NewDetails from "./pages/NewDetails";
import NewsRoot from "./components/NewsRoot";
import WelcomeRoot from "./components/WelcomeRoot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomeRoot />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          { path: "", element: <Events /> },
          { path: ":id", element: <EventDetails /> },
        ],
      },
      {
        path: "organizations",
        element: <OrgRoot />,
        children: [
          { path: "", element: <Organization /> },
          { path: ":id", element: <OrgDetails /> },
        ],
      },
      {
        path: "news",
        element: <NewsRoot />,
        children: [
          { path: "", element: <News /> },
          { path: ":id", element: <NewDetails /> },
        ],
      },
      { path: "forms", element: <Forms /> },
    ],
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  {
    path: "/user",
    element: <PrivateRoute />,
    children: [
      { path: "home", element: <Home /> },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          { path: "", element: <Events /> },
          { path: ":id", element: <EventDetails /> },
        ],
      },
      {
        path: "organizations",
        element: <OrgRoot />,
        children: [
          { path: "", element: <Organization /> },
          { path: ":id", element: <OrgDetails /> },
        ],
      },
      {
        path: "news",
        element: <NewsRoot />,
        children: [
          { path: "", element: <News /> },
          { path: ":id", element: <NewDetails /> },
        ],
      },
      { path: "forms", element: <Forms /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
