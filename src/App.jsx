import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Start from "./components/Start";
import Events from "./pages/Events";
import Rooms from "./pages/Rooms";
import Attendees from "./pages/Attendees";

const router = createBrowserRouter([
  { path: "/", element: <Start /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: <PrivateRoute />,
    children: [
      { path: "events", element: <Events /> },
      { path: "rooms", element: <Rooms /> },
      { path: "attendees", element: <Attendees /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
