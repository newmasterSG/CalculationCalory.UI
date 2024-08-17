import React, { useState } from 'react';
import { Container, Paper, Typography, Button } from "@mui/material";
import CircularProgressWithLabel from '../customComponents/circularProgressWithLabel';
import { ListNutrinion } from './listNutrionComponent';
import ProductPopup from './popUp/productPopup';
import { MealTracker } from './mealTracker';
import { useAppSelector } from '../../hooks/reduxHooks';
import { RootState } from '../../store/mainStore';




const Home: React.FC = () => {
  const generalCalories: number = useAppSelector((state: RootState) => state.meals.generalCal);

  const calculationNorm = generalCalories / 1500 * 100;

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h5' component="h2" gutterBottom>
          Your daily progress
        </Typography>
        <CircularProgressWithLabel variant="determinate" sx={{ height: '200px !important', width: '200px !important' }} value={calculationNorm} />
      </Paper>
      <MealTracker/>
      <ListNutrinion></ListNutrinion>
      
    </Container>
  );
};

export default Home;
