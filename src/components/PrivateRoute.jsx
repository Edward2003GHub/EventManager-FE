import { Navigate } from "react-router-dom";
import Root from './Root';

export default function PrivateRoute() {
  const token = localStorage.getItem("token");
  return token ? <Root /> : <Navigate to="/login" />;
}