import { useState } from "react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import Input2 from "./Input2";

export default function Login() {
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [emailNotValid, setEmailNotValid] = useState(false);
  const [loginFailed, setLoginFailed] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    let hasError = false;

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (!data.email.includes("@")) {
      setEmailNotValid(true);
      hasError = true;
    } else {
      setEmailNotValid(false);
    }

    if (!data.password.trim()) {
      setPasswordEmpty(true);
      hasError = true;
    } else {
      setPasswordEmpty(false);
    }

    if (hasError) return;
    try {
      const response = await fetch("https://localhost:7262/api/Account/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("email", result.email);
        localStorage.setItem("name", result.personName);
        localStorage.setItem("userId", result.id);
        setLoginError(false);
        navigate("/dashboard/home");
      } else {
        console.error("Login failed:", result);
        setLoginError(true);
        setLoginFailed(result.detail);
      }
    } catch (error) {
      console.error("Error login user:", error);
    }
  }

  return (
    <div className="form-style">
      <form onSubmit={handleSubmit}>
        <div className="form-wrapper">
          <h1>LOGIN</h1>

          <div className="register-inputs">
            <Input2
              label="Email"
              type="email"
              name="email"
              error={emailNotValid}
              errorText="Please enter a valid email address"
            />
            <Input2
              label="Password"
              type="password"
              name="password"
              error={passwordEmpty}
              errorText="Please enter a valid password"
            />
            {loginError && <p className="err">{loginFailed}</p>}
            <div className="reg-btn">
              <input type="submit" value="Login" />
            </div>
            <p className="no-acc">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
