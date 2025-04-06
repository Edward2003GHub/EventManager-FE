import * as React from "react";
import TextField from "@mui/material/TextField";

export default function Input2({ label, error, errorText, ...props }) {
  return (
    <TextField
      error={error}
      label={label}
      helperText={error && errorText}
      {...props}
    />
  );
}
