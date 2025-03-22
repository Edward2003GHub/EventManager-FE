import * as React from "react";
import TextField from "@mui/material/TextField";

export default function Input2({ label, error, errorText, ...props }) {
  return (
    <TextField
      sx={{
        "& label.Mui-focused": {
          color: "rgb(126, 126, 255)", // Change label color on focus
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "rgb(126, 126, 255)", // Change border color on focus
          },
        },
      }}
      error={error}
      label={label}
      {...props}
      helperText={error && errorText}
    />
  );
}
