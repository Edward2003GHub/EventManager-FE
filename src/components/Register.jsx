import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input2 from "./Input2";

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
            <div className="reg-btn">
              <input type="submit" value="Register" />
            </div>
            <p className="no-acc">
              Have already an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
