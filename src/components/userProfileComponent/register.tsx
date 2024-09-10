import React, { useState } from 'react';
import { useRegisterMutation } from '../../api/authApi';
import { RegisterRequest } from '../../models/authModels';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [register] = useRegisterMutation();
  const [registerData, setRegisterData] = useState<RegisterRequest>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(registerData).unwrap();
      alert('Registration successful!');
    } catch (error) {
      alert('Failed to register.');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: 20, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
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
            Register
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            color="primary"
            fullWidth
            style={{ marginTop: 10 }}
          >
            Go to Login
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Register;