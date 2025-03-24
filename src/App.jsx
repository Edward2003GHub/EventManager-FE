import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Start from "./components/Start";
import Events from "./pages/Events";
import Home from "./pages/Home";
import EventDetails from "./pages/EventsDetails";
import EventsRoot from "./components/EventsRoot";

const router = createBrowserRouter([
  { path: "/", element: <Start /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
