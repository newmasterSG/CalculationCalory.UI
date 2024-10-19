import React, { useState } from 'react';
import { useLoginMutation } from '../../api/authApi';
import { AuthResponse, LoginRequest } from '../../models/authModels';
import { setTokens } from '../../store/slicers/authSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const [loginData, setLoginData] = useState<LoginRequest>({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response: AuthResponse = await login(loginData).unwrap();

            dispatch(setTokens({
                accessToken: response.accessToken,
                refreshToken: response.refreshToken
            }));

        } catch (error) {
            alert('Failed to login.');
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Paper elevation={3} style={{ padding: 20, maxWidth: 400, width: '100%' }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 20 }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="outlined"
              color="primary"
              fullWidth
              style={{ marginTop: 10 }}
            >
              Go to Register
            </Button>
          </form>
        </Paper>
      </Grid>
    );
};

export default Login;
