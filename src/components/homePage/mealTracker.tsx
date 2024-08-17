import { useState } from "react";
import { MealItem, MealType } from "../../models/mealItem";
import Box from "@mui/material/Box/Box";
import { MealList } from "./mealList";
import ProductPopup from "./popUp/productPopup";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { removeMealItem } from "../../store/slicers/mealSlicer";

export const MealTracker: React.FC = () => {
    const dispatch = useAppDispatch();

    const breakfastItems = useAppSelector((state) => state.meals[MealType.BREAKFAST]);
    const lunchItems = useAppSelector((state) => state.meals[MealType.LUNCH]);
    const dinnerItems = useAppSelector((state) => state.meals[MealType.DINNER]);

    const deleteItemFromMeal = (meal: MealType, id: number) => {
        dispatch(removeMealItem({type: meal, id: id}));
    }

    return (
      <Box p={2}>
        <MealList meal={MealType.BREAKFAST} items={breakfastItems} deleteItem={deleteItemFromMeal}/>
        <MealList meal={MealType.LUNCH} items={lunchItems}  deleteItem={deleteItemFromMeal}/>
        <MealList meal={MealType.DINNER} items={dinnerItems}  deleteItem={deleteItemFromMeal}/>
      </Box>
    );
  };