import React, {useState, useContext} from 'react'
import MyContext from '../Context'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
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

export default function SignUp() {
  const [name, setName] = useState('')
  const [nickName, setNickName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorNick, setErrorNick] = useState(false)
  const [errorPass, setErrorPass] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorName, setErrorName] = useState(false)
  const { handleLogin, loginError, URL, axios } = useContext(MyContext)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    setErrorNick(false)
    setErrorPass(false)
    setErrorEmail(false)
    setErrorName(false)
    if (nickName.includes(' ')) {
      setErrorNick(true)
      setLoading(false)
    } if (password.length < 6) {
      setErrorPass(true)
      setLoading(false)
    } if (!validateEmail(email)) {
      setErrorPass(true)
      setLoading(false)
    } if (name.length < 3) {
      setErrorName(true)
      setLoading(false)
    }
    if (!errorNick && !errorPass && !errorEmail && !errorName) {
      axios.post(`${URL}users`, {
        name,
        nickName,
        email,
        password
      }).then(res => {
        handleLogin(res.data.token, res.data.user);
        setLoading(false)
      }).catch((err) => {
        loginError();
        console.log(err.response);
        setLoading(false)
      });
    }
  };

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

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
          height: '85%',
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
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="Name"
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    autoFocus
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                    error={errorName}
                    helperText={errorName ? 'Name must be at least 3 characters long' : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="Nickname"
                    label="Nickname"
                    name="nickname"
                    autoComplete="nickname"
                    onChange={(event) => setNickName(event.target.value)}
                    value={nickName}
                    error={errorNick}
                    helperText={errorNick ? 'Nickname can not contain spaces' : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    error={errorEmail}
                    helperText={errorEmail ? 'Email is not valid' : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    error={errorPass}
                    helperText={errorPass ? 'Password must be at least 6 characters long' : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                </Grid>
              </Grid>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="primary"
                loading={loading}
              >
                Sign Up
              </LoadingButton>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}