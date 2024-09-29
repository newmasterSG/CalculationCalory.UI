import { MealItem, MealType } from "../../models/mealItem";
import { MealList } from "./mealList";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Box from "@mui/material/Box/Box";
import { removeMealDailyLogAsync } from "../../thunk/removeMealDailyLogAsync";
import { GetDailyLogByUserQuery } from "../../api/commands/dailyLog/GetDailyLogByUserQuery";
import { useGetDailyLogByUserQuery } from "../../api/dailylogApi";
import { useEffect, useState } from "react";
import { setMealItems } from "../../store/slicers/mealSlicer";

export const MealTracker: React.FC = () => {
  const dispatch = useAppDispatch();

  const [meals, setMeals] = useState<Record<MealType, MealItem[]>>({
    [MealType.BREAKFAST]: [],
    [MealType.LUNCH]: [],
    [MealType.DINNER]: [],
  });

  const getDailyLogByUserQuery: GetDailyLogByUserQuery = {
    dto: {
      date: new Date().toDateString()
    },
  };

  const allMeals = useAppSelector((state) => state.meals);


  const { data, error, isLoading } = useGetDailyLogByUserQuery(getDailyLogByUserQuery);

  useEffect(() => {
    setMeals({
      [MealType.BREAKFAST]: allMeals[MealType.BREAKFAST],
      [MealType.LUNCH]: allMeals[MealType.LUNCH],
      [MealType.DINNER]: allMeals[MealType.DINNER],
    });
  }, [allMeals]);

  useEffect(() => {
    if (data && data.Breakfast && data.Lunch && data.Dinner) {
      Object.entries(data).forEach(([mealType, items]) => {
        dispatch(setMealItems({ type: mealType as MealType, items }));
      });
    }
  }, [data, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading daily log.</div>;


  const deleteItemFromMeal = async (meal: MealType, id: number) => {
    try {
      await dispatch(removeMealDailyLogAsync({ type: meal, id: id }));

      setMeals((prevMeals) => ({
        ...prevMeals,
        [meal]: prevMeals[meal].filter((item) => item.id !== id),
      }));
    }
    catch {

    }
  }

  return (
    <Box p={2}>
      <MealList meal={MealType.BREAKFAST} items={meals[MealType.BREAKFAST]} deleteItem={deleteItemFromMeal} />
      <MealList meal={MealType.LUNCH} items={meals[MealType.LUNCH]} deleteItem={deleteItemFromMeal} />
      <MealList meal={MealType.DINNER} items={meals[MealType.DINNER]} deleteItem={deleteItemFromMeal} />
    </Box>
  );
};