import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
  const avatarStyle={backgroundColor:'#3C6255'}
  const btnstyle={margin:'8px 0', backgroundColor:'#2C74B3'}

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8081/api/auth/login', { "username": login, "password": password });
      localStorage.setItem('authToken', response.data.accessToken);
      setIsLoading(false);

        fetch(`http://localhost:8081/api/user/findByName/${login}`)
        .then(response => response.json())
        .then(data => {
          if (data.movieId == 0){
            window.location.href = 'http://localhost:3000/recommendation/?mov=0'; //159117
          }
          else{window.location.href = `http://localhost:3000/recommendation/?mov=${data.movieId}`}; 
        });
      
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }

};
//source: https://gist.github.com/vaish567/861e88d0e7f13cb00ef88767cd2f8d0f
return (
  <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                <TextField style = {{marginBottom: '10px'}} label='Login' placeholder='Enter login' variant="outlined" value={login} onInput={(event) => setLogin(event.target.value)} fullWidth required />
                <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" value={password} onInput={(event) => setPassword(event.target.value)} fullWidth required/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth disabled={isLoading}>{isLoading ? 'Loading' : 'Sign in'}</Button>
                </form>
                <Typography > Do you have an account? <br />
                     <Link href="./register" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
);
}

export default Login;
