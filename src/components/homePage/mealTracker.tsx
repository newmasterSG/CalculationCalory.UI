import { MealType } from "../../models/mealItem";
import { MealList } from "./mealList";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Box from "@mui/material/Box/Box";
import { removeMealDailyLogAsync } from "../../thunk/removeMealDailyLogAsync";

export const MealTracker: React.FC = () => {
    const dispatch = useAppDispatch();

    const breakfastItems = useAppSelector((state) => state.meals[MealType.BREAKFAST]);
    const lunchItems = useAppSelector((state) => state.meals[MealType.LUNCH]);
    const dinnerItems = useAppSelector((state) => state.meals[MealType.DINNER]);

    const deleteItemFromMeal = async (meal: MealType, id: number) => {
        try {
          await dispatch(removeMealDailyLogAsync({type: meal, id: id}));
        }
        catch {

        }
    }

    return (
      <Box p={2}>
        <MealList meal={MealType.BREAKFAST} items={breakfastItems} deleteItem={deleteItemFromMeal}/>
        <MealList meal={MealType.LUNCH} items={lunchItems}  deleteItem={deleteItemFromMeal}/>
        <MealList meal={MealType.DINNER} items={dinnerItems}  deleteItem={deleteItemFromMeal}/>
      </Box>
    );
  };