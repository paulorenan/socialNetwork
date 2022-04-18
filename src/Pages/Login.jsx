import React, {useState, useContext} from 'react'
import MyContext from '../Context'
import {Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material/';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header';
import LoadingButton from '@mui/lab/LoadingButton';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/paulorenan">
        Paulo Renan Almeida
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorLogin, setErrorLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const { URL, handleLogin, loginError, axios } = useContext(MyContext)

  const login = (event) => {
    event.preventDefault();
    setLoading(true)
    setErrorLogin(false)
    axios.post(`${URL}login`, {
      email,
      password
    })
    .then(res => {
      handleLogin(res.data.token, res.data.user);
      setLoading(false)
    }).catch(() => {
      loginError();
      setErrorLogin(true);
      setLoading(false)
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(to right, #67b26f, #4ca2cd)',
          paddingTop: '0',
        }}
        size="xl"
      >
      <Header />
        <Container maxWidth="xs" sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80%',
        }}>
          <CssBaseline />
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 'auto',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={login} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errorLogin}
              />
              <TextField
                margin="normal"
                fullWidth
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errorLogin}
              />
              {errorLogin && 
                <Typography variant="body2" color="error">
                  Incorrect email or password
                </Typography>}
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );

}

export default Login