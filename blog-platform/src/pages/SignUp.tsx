import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//Material UI imports
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

//Email Validation
const isEmail = (email: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function SignUp(){

    //PASSWORD FIELD
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  //INPUTS
  const[usernameInput, setUserNameInput] = useState<string>('');
  const[emailInput, setEmailInput] = useState<string>('');
  const[passwordInput, setPasswordInput] = useState<string>('');

  //INPUT ERRORS
  const[usernameError, setUsernameError] = useState(false);
  const[emailError, setEmailError] = useState(false);
  const[passwordError, setPasswordError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // In the state declarations
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);

  //Validation for onBlur Username
  const handleUsername = () => {
    if(!usernameInput || usernameInput.length < 5 || usernameInput.length>20){
        setUsernameError(true);
        return;
    }
    setUsernameError(false);
  }

  //Validation for onBlur Email
  const handleEmail = () => {
    console.log(isEmail(emailInput));
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };

  // Validation for onBlur Password
  const handlePassword = () => {
    if (
      !passwordInput ||
      passwordInput.length < 5 ||
      passwordInput.length > 20
    ) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  // Function to validate confirm password
  const handleConfirmPassword = () => {
    if (confirmPasswordInput !== passwordInput) {
      setConfirmPasswordError(true);
      return;
  }
  setConfirmPasswordError(false);
};

  const handleSubmit = () => {
    setSuccess(null);

    if (usernameError || !usernameInput) {
      setFormValid("Username is set to 5-15 characters long. Please Re-Enter");
      return;
    }

    if (emailError || !emailInput) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }

    if (passwordError || !passwordInput) {
      setFormValid("Password must be 5-20 characters long. Please re-enter.");
      return;
    }

    if (passwordInput !== confirmPasswordInput) {
      setFormValid("Passwords do not match.");
      return;
    }

    if (!passwordInput || !confirmPasswordInput) {
      setFormValid("Please enter both password fields.");
      return;
    }

    setFormValid(null);

    console.log("Username : " + usernameInput);
    console.log("Email : " + emailInput);
    console.log("Password : " + passwordInput);

    //Show Successfull Submittion
    setSuccess("Form Submitted Successfully");
  };

    return(
    <div className='loginPage'>
        <div style={{ marginTop: "10px" }}>
            <TextField id="standard-basic" error={usernameError} label="Username" variant="standard" fullWidth size='small' 
            value={usernameInput} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserNameInput(event.target.value)}
            onBlur={handleUsername}/>
        </div>
        <div style={{ marginTop: "5px" }}>
            <TextField id="standard-basic" error={emailError} label="E-mail" variant="standard" fullWidth size='small'
            value={emailInput} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmailInput(event.target.value)}
            onBlur={handleEmail}/>
        </div>
        <div style={{ marginTop: "5px" }}>
        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel error={passwordError} htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            error={passwordError}
            value={passwordInput} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPasswordInput(event.target.value)}
            onBlur={handlePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl sx={{ width: '100%' }} variant="standard">
  <InputLabel error={confirmPasswordError} htmlFor="confirm-password">
    Confirm Password
  </InputLabel>
  <Input
    id="confirm-password"
    type={showPassword ? 'text' : 'password'}
    error={confirmPasswordError}
    value={confirmPasswordInput}
    onChange={(event) => setConfirmPasswordInput(event.target.value)}
    onBlur={handleConfirmPassword}
    endAdornment={
      <InputAdornment position="end">
        <IconButton
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
        <div style={{ marginTop: "10px" }}>
        <Button onClick={handleSubmit} fullWidth variant="contained" startIcon={<LoginIcon />}>SIGN UP</Button>
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
        <a>Forgot Password</a>
        <br />
        Do you have an account already ?{" "}
        <Link to='signup'><small style={{ textDecoration: "underline", color: "blue" }}>
          Login
        </small>
        </Link>
      </div>
    </div>
)}

export default SignUp