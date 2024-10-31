import React, { useState } from "react";
import { Link } from "react-router-dom";
// Material UI Imports
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Checkbox from "@mui/material/Checkbox";

// Email Validation
const isEmail = (email: string): boolean =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function Login() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  // Inputs
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // Input Errors
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Validation for onBlur Email
  const handleEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };

  // Validation for onBlur Password
  const handlePassword = () => {
    if (!passwordInput || passwordInput.length < 5 || passwordInput.length > 20) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  // Handle Submission
  const handleSubmit = () => {
    setSuccess(null);

    if (emailError || !emailInput) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }

    if (passwordError || !passwordInput) {
      setFormValid("Password is set btw 5 - 20 characters long. Please Re-Enter");
      return;
    }

    setFormValid(null);

    // Proceed to use the information passed
    console.log("Email: " + emailInput);
    console.log("Password: " + passwordInput);
    console.log("Remember Me: " + rememberMe);

    // Show Successful Submission
    setSuccess("Form Submitted Successfully");
  };

  return (
    <div>
      <div style={{ marginTop: "5px" }}>
        <TextField
          label="Email Address"
          fullWidth
          error={emailError}
          variant="standard"
          sx={{ width: "100%" }}
          value={emailInput}
          size="small"
          onBlur={handleEmail}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmailInput(event.target.value);
          }}
        />
      </div>
      <div style={{ marginTop: "5px" }}>
        <FormControl sx={{ width: "100%" }} variant="standard">
          <InputLabel error={passwordError} htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            error={passwordError}
            onBlur={handlePassword}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            value={passwordInput}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPasswordInput(event.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div style={{ fontSize: "10px" }}>
        <Checkbox
          size="small"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setRememberMe(event.target.checked)
          }
        />
        Remember Me
      </div>

      <div style={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          onClick={handleSubmit}
        >
          LOGIN
        </Button>
      </div>

      {/* Show Form Error if any */}
      {formValid && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="error">
            {formValid}
          </Alert>
        </Stack>
      )}

      {/* Show Success if no issues */}
      {success && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="success">
            {success}
          </Alert>
        </Stack>
      )}

      <div style={{ marginTop: "7px", fontSize: "10px", margin:"left" }}>
        <a href="#">Forgot Password</a>
        <br />
        Do not have an account?! Click{" "}
        <Link to='login'><small style={{ textDecoration: "underline", color: "blue" }}>
          Sign Up
        </small>
        </Link>
      </div>
    </div>
  );
}
