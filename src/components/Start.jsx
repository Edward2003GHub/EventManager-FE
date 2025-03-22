import { Link } from "react-router-dom";

export default function Start() {
    return <div>
        <h1>Welcome!</h1>
        <Link to="/login">Login</Link>
    </div>
}