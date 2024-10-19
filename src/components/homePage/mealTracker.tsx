import { MealItem, MealType } from "../../models/mealItem";
import { MealList } from "./mealList";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Box from "@mui/material/Box/Box";
import { removeMealDailyLogAsync } from "../../thunk/removeMealDailyLogAsync";
import { GetDailyLogByUserQuery } from "../../api/commands/dailyLog/GetDailyLogByUserQuery";
import { useGetDailyLogByUserQuery } from "../../api/dailylogApi";
import { useCallback, useEffect, useMemo, useState } from "react";
import { changeEatenCal, setMealItems } from "../../store/slicers/mealSlicer";
import React from "react";
import CalculationHelper from "../../helpers/calculationHelper";
import { dispatchCaloriesNormUpdate } from "../../customEvents/updateCaloriesNormEvent";

interface MealTrackerProps {
  selectedDate: Date | null;
}

const MealTracker: React.FC<MealTrackerProps> = ({ selectedDate }) => {
  const dispatch = useAppDispatch();

  const getDailyLogByUserQuery: GetDailyLogByUserQuery = {
    dto: {
      date: selectedDate ? selectedDate.toDateString() : new Date().toDateString()
    },
  };

  const allMeals = useAppSelector((state) => state.meals);


  const { data, error, isLoading } = useGetDailyLogByUserQuery(getDailyLogByUserQuery);

  const [meals, setMeals] = useState<Record<MealType, MealItem[]>>({
    [MealType.BREAKFAST]: [],
    [MealType.LUNCH]: [],
    [MealType.DINNER]: [],
  });

  const initializedMeals = useMemo(() => ({
    [MealType.BREAKFAST]: Array.isArray(allMeals[MealType.BREAKFAST]) ? allMeals[MealType.BREAKFAST] : [],
    [MealType.LUNCH]: Array.isArray(allMeals[MealType.LUNCH]) ? allMeals[MealType.LUNCH] : [],
    [MealType.DINNER]: Array.isArray(allMeals[MealType.DINNER]) ? allMeals[MealType.DINNER] : [],
  }), [allMeals]);

  const totalCalories = useMemo(() =>
    Object.values(allMeals).reduce((total, mealItems) =>
      Array.isArray(mealItems) ? total + mealItems.reduce((mealTotal, item) => mealTotal + CalculationHelper.calculateCalories(item), 0) : total, 0),
    [allMeals]);

  useEffect(() => {
    setMeals(initializedMeals);
    dispatch(changeEatenCal(totalCalories));
    dispatchCaloriesNormUpdate(totalCalories);
  }, [initializedMeals, totalCalories, dispatch]);

  useEffect(() => {
    if (data) {
      Object.entries(data).forEach(([mealType, items]) => {
        dispatch(setMealItems({ type: mealType as MealType, items }));
      });
    }
  }, [data, dispatch]);

  const deleteItemFromMeal = useCallback(async (meal: MealType, id: number) => {
    try {
      await dispatch(removeMealDailyLogAsync({ type: meal, id }));
      setMeals((prevMeals) => ({
        ...prevMeals,
        [meal]: prevMeals[meal].filter((item) => item.id !== id),
      }));
    } catch (err) {
      console.error("Failed to delete item from meal", err);
    }
  }, [dispatch]);

  return (
    <Box p={2}>
      <MealList meal={MealType.BREAKFAST} items={meals[MealType.BREAKFAST]} deleteItem={deleteItemFromMeal} />
      <MealList meal={MealType.LUNCH} items={meals[MealType.LUNCH]} deleteItem={deleteItemFromMeal} />
      <MealList meal={MealType.DINNER} items={meals[MealType.DINNER]} deleteItem={deleteItemFromMeal} />
    </Box>
  );
};

export default React.memo(MealTracker);