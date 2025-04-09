import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input2 from "../components/Input2";
import { Button } from "@mui/material";

export default function Register() {
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [passwordNotEqual, setPasswordNotEqual] = useState(false);
  const [emailNotValid, setEmailNotValid] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(false);
  const [numberEmpty, setNumberEmpty] = useState(false);
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

    if (!data.personName.trim()) {
      setNameEmpty(true);
      hasError = true;
    } else {
      setNameEmpty(false);
    }

    if (!data.phone.trim()) {
      setNumberEmpty(true);
      hasError = true;
    } else {
      setNumberEmpty(false);
    }

    if (data.password !== data.confirmationPassword) {
      setPasswordNotEqual(true);
      hasError = true;
    } else {
      setPasswordNotEqual(false);
    }

    if (hasError) return;

    try {
      const response = await fetch(
        "https://localhost:7262/api/Account/Register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personName: data.personName,
            email: data.email,
            phone: data.phone,
            password: data.password,
            confirmationPassword: data.confirmationPassword,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        navigate("/login");
        localStorage.setItem("regGood", "true");
        // Handle success (e.g., redirect user or show success message)
      } else {
        console.error("Registration failed:", result);
        // Handle error (e.g., show error message)
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

  return (
    <div className="form-style">
      <svg
        className="animated-bg"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="100%"
        height="100%"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="bg">
            <stop
              offset="0%"
              style={{ stopColor: "rgba(130, 158, 249, 0.06)" }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "rgba(76, 190, 255, 0.6)" }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "rgba(115, 209, 72, 0.2)" }}
            />
          </linearGradient>
          <path
            id="wave"
            fill="url(#bg)"
            d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
        s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
          />
        </defs>
        <g>
          <use xlinkHref="#wave" opacity=".3">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="10s"
              calcMode="spline"
              values="270 230; -334 180; 270 230"
              keyTimes="0; .5; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"
            />
          </use>
          <use xlinkHref="#wave" opacity=".6">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="8s"
              calcMode="spline"
              values="-270 230;243 220;-270 230"
              keyTimes="0; .6; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"
            />
          </use>
          <use xlinkHref="#wave" opacity=".9">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="6s"
              calcMode="spline"
              values="0 230;-140 200;0 230"
              keyTimes="0; .4; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"
            />
          </use>
        </g>
      </svg>
      <form onSubmit={handleSubmit}>
        <div className="form-wrapper">
          <h1>CREATE ACCOUNT</h1>
          <div className="register-inputs">
            <Input2
              label="Name"
              type="text"
              name="personName"
              error={nameEmpty}
              errorText="Please enter a name"
            />
            <Input2
              label="Phone"
              type="number"
              name="phone"
              error={numberEmpty}
              errorText="Please enter a valid number"
            />
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
            <Input2
              label="Confirm password"
              type="password"
              name="confirmationPassword"
              error={passwordNotEqual}
              errorText="The password aren't equal"
            />
            <Button variant="contained" sx={{ marginTop: "20px" }} type="submit">
              Register
            </Button>
            <p className="no-acc">
              Have already an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
