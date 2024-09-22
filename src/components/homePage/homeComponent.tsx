import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Button } from "@mui/material";
import CircularProgressWithLabel from '../customComponents/circularProgressWithLabel';
import { ListNutrinion } from './listNutrionComponent';
import { MealTracker } from './mealTracker';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { RootState } from '../../store/mainStore';
import { useGetDailyPlanQuery } from '../../api/nutritionApi';
import { addGeneralCal } from "../../store/slicers/mealSlicer";
import { NutrientData } from '../../models/nutrientData';
import { MealType } from '../../models/mealItem';
import CalculationHelper from '../../helpers/calculationHelper';



const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const [nutrients, setNutrients] = useState<NutrientData[]>([]);


  const { data, isLoading, error } = useGetDailyPlanQuery();

  useEffect(() => {
    if (data) {
      const [fetchedNutrients, fetchedCalories] = data;
      setNutrients(fetchedNutrients);
      dispatch(addGeneralCal(fetchedCalories));
    }
  }, [data, dispatch]);

  const generalCalories: number = useAppSelector((state: RootState) => state.meals.generalCal);

  const totalCal = useAppSelector((state) => state.meals.totalEatCal);

  const calculationNorm =  totalCal / generalCalories * 100;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h5' component="h2" gutterBottom>
          Your daily progress
        </Typography>
        <CircularProgressWithLabel variant="determinate" sx={{ height: '200px !important', width: '200px !important' }} value={calculationNorm} />
      </Paper>
      <MealTracker />
      <ListNutrinion nutrients={nutrients}></ListNutrinion>

    </Container>
  );
};

export default Home;


