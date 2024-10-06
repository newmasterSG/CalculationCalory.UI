import React, { useState } from 'react';
import { useRegisterMutation } from '../../api/authApi';
import { RegisterRequest } from '../../models/authModels';
import { Grid, Paper, Typography, TextField, Button, MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { Link } from 'react-router-dom';
import { Gender, GenderLabels } from '../../models/user';
import { getEnumByLabel } from '../../helpers/mapperHelper';
import RegisterEmailPassword from './RegisterComponents/registerEmailPassword';
import RegisterProfileDetails from './RegisterComponents/registerProfileDetails';

const Register: React.FC = () => {
  const [register] = useRegisterMutation();
  const [step, setStep] = useState(1);
  const [registerData, setRegisterData] = useState<RegisterRequest>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    gender: Gender.Male,
    height: 0,
    weight: 0,
    age: 0,
  });


  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    const selectedGender = getEnumByLabel<Gender>(event.target.value, GenderLabels);
    if (selectedGender !== undefined) {
      setRegisterData({
        ...registerData,
        gender: selectedGender,
      });
    }
  };
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      try {
        await register({ ...registerData }).unwrap();
        alert('Registration successful!');
      } catch (error) {
        alert('Failed to register.');
      }
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: 20, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          {step === 1 ? 'Register' : 'Complete Your Profile'}
        </Typography>
        {step === 1 ? (
          <RegisterEmailPassword
            registerData={registerData}
            handleRegisterChange={handleRegisterChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <RegisterProfileDetails
            registerData={registerData}
            handleRegisterChange={handleRegisterChange}
            handleGenderChange={handleGenderChange}
            handleSubmit={handleSubmit}
          />
        )}
      </Paper>
    </Grid>
  );
};

export default Register;