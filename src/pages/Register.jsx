import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input2 from "../components/Input2";
import { Button, Snackbar, Alert } from "@mui/material";

export default function Register() {
  const [personName, setPersonName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [passwordNotEqual, setPasswordNotEqual] = useState(false);
  const [emailNotValid, setEmailNotValid] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(false);
  const [numberEmpty, setNumberEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [registerError, setRegisterError] = useState();

  const [snackbarOpen, setSnackbarOpen] = useState(false); // Add snackbar state
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
        setSnackbarOpen(true); // Show snackbar on successful registration
        localStorage.setItem("regGood", "true");
        navigate("/login");
      } else {
        setError(true);
        setRegisterError(result.detail || result.errors["Phone"][0]);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container">
      <div className="top"></div>
      <div className="bottom"></div>
      <form className="center" onSubmit={handleSubmit}>
        <h2>Registeration</h2>

        <Input2
          label="Name"
          type="text"
          name="personName"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          error={nameEmpty}
          errorText="Please enter a name"
        />
        <Input2
          label="Phone"
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={numberEmpty}
          errorText="Please enter a valid number"
        />
        <Input2
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailNotValid}
          errorText="Please enter a valid email address"
        />
        <Input2
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordEmpty}
          errorText="Please enter a valid password"
        />
        <Input2
          label="Confirm password"
          type="password"
          name="confirmationPassword"
          value={confirmationPassword}
          onChange={(e) => setConfirmationPassword(e.target.value)}
          error={passwordNotEqual}
          errorText="The passwords aren't equal"
        />
        {registerError && <p className="err">{registerError}</p>}

        <Button color="success" variant="contained" type="submit" sx={{ marginTop: "20px" }}>
          Register
        </Button>

        <p className="no-acc">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
          Registration successful!
        </Alert>
      </Snackbar>
    </div>
  );
}
