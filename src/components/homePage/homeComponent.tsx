import React, { useCallback, useEffect, useState } from "react";
import { Container, Paper, Typography, Button, Box } from "@mui/material";
import CircularProgressWithLabel from "../customComponents/circularProgressWithLabel";
import { ListNutrinion } from "./listNutrionComponent";
import MealTracker from "./mealTracker";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../store/mainStore";
import { useGetDailyPlanQuery } from "../../api/nutritionApi";
import { addGeneralCal } from "../../store/slicers/mealSlicer";
import { NutrientData } from "../../models/nutrientData";
import { CALORIES_UPDATE_EVENT } from "../../constants";
import CalculationHelper from "../../helpers/calculationHelper";
import DatePicker from "../customComponents/datePicker";
import StreakComponent from "./StreakComponent";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const [nutrients, setNutrients] = useState<NutrientData[]>([]);
  const [caloriesNorm, setCaloriesNorm] = useState<number>(0);
  const { data, isLoading, error } = useGetDailyPlanQuery();
  const [streak, setStreak] = useState<number>(0);

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const generalCalories: number = useAppSelector(
    (state: RootState) => state.meals.generalCal
  );

  const handleCaloriesUpdate = useCallback(
    (event: CustomEvent) => {
      if (!event.detail.totalEatCal || generalCalories === 0) return;

      const norm = CalculationHelper.calculateNormCaloriesPerPerson(
        event.detail.totalEatCal,
        generalCalories
      );
      setCaloriesNorm(norm);
    },
    [generalCalories]
  );

  useEffect(() => {
    if (data) {
      const [fetchedNutrients, fetchedCalories, fetchedStreak] = data;
      setNutrients(fetchedNutrients);
      if (fetchedCalories) dispatch(addGeneralCal(fetchedCalories));
      if (fetchedStreak) setStreak(fetchedStreak);
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (!generalCalories) return;

    window.addEventListener(
      CALORIES_UPDATE_EVENT,
      handleCaloriesUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        CALORIES_UPDATE_EVENT,
        handleCaloriesUpdate as EventListener
      );
    };
  }, [generalCalories, handleCaloriesUpdate]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "15px",
          position: "relative",
        }}
      >
        <StreakComponent
          streak={streak}
          styles={{
            position: "absolute",
            right: "15px",
            top: "15px",
            borderRadius: "5px",
          }}
        />
        <Typography variant="h5" component="h2" gutterBottom>
          Your daily progress
        </Typography>
        <CircularProgressWithLabel
          variant="determinate"
          sx={{ height: "200px !important", width: "200px !important" }}
          value={caloriesNorm}
        />
      </Paper>
      <DatePicker handleDateChange={handleDateChange} />
      <MealTracker selectedDate={selectedDate} />
      <ListNutrinion nutrients={nutrients}></ListNutrinion>
    </Container>
  );
};

export default Home;
