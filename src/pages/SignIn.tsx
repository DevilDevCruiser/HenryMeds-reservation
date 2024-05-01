import React, { useState } from 'react';
import { Switch, FormControlLabel, Box, TextField, Button, Typography, Container } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../hooks/auth';

export default function SignIn() {
  const [isProvider, setIsProvider] = useState(true);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuthentication();


  const handleSwitchChange = () => {
    setIsProvider(!isProvider);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignIn = () => {
    login(userId, password, isProvider)
      .then((user) => {
        if (user) {
          enqueueSnackbar('Sign in successful', { variant: 'success' })
          navigate(isProvider ? '/provider' : '/client')

        } else {
          enqueueSnackbar('Invalid credentials', { variant: 'error' })
        }
      }
      );
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 10 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign In
      </Typography>
      <Box mt={2}>
        <FormControlLabel
          control={<Switch checked={isProvider} color="secondary" onChange={handleSwitchChange} />}
          label={"Provider"}
        />
      </Box>
      <Box mt={4}>
        <form>
          <TextField
            label={isProvider ? "Provider ID" : "Client ID"}
            value={userId}
            onChange={handleUserIdChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSignIn}>
            Sign In as {isProvider ? "Provider" : "Client"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
