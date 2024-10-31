import React from 'react'
import './Registration.css'
//Material UI imports
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import FaceIcon from '@mui/icons-material/Face';
import LockIcon from '@mui/icons-material/Lock';
import Switch from '@mui/material/Switch'
import SignUp from './SignUp'
import Login from './Login'
function Register(){
    const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
    return(
      <div className='container'>
        <div className='Registration'>
            <Paper elevation={3} style={{padding:"10px"}}>
                {checked ? (
                <Chip icon={<FaceIcon />} label='Sign Up' color='primary' variant='outlined' />
                ) : (
                <Chip icon={<LockIcon />} label='Login' color='primary' variant='outlined' />
                )}
                <br/>
                <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/>
                <br/>
                {checked ? <SignUp/> : <Login/>}
            </Paper>
        </div>
        </div>
    )
}

export default Register