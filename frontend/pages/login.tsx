import { useRouter } from "next/router";
import { useState } from "react";
import { useLogin } from "../src/hooks/auth/useLogin";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Login() {
  
  const { login } = useLogin();
  const router = useRouter();


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)!;
    const username = data.get('email') || "";
    const password = data.get('password');
    if (!username || !password) {
      alert("Please provide data!");
      return;
    }
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    login(username as string, password as string)
           .then((res) => router.push("/profile"))
           .catch((e) => alert(e));
  };


  function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  </ThemeProvider>
    // <div className="w-screen h-screen flex items-center justify-center">
    //   <div className="h-fit flex flex-col gap-2">
    //     <p className="text-2xl font-bold">Create Source</p>
    //     <label>Username</label>
    //     <input
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //       className="w-80 h-8 px-2 border border-solid border-black rounded"
    //       placeholder="username"
    //     />
    //     <label className="mt-4">Password</label>
    //     <input
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       className="w-80 h-8 px-2 border border-solid border-black rounded"
    //       placeholder="password"
    //       type="password"
    //     />
        
    //     <Button
    //       onClick={onSubmit}
    //       variant="contained"
    //       className="h-10 w-80 mt-8 bg-black rounded text-white"
    //     >
    //       Login
    //     </Button>
    //   </div>
    // </div>
  );
}