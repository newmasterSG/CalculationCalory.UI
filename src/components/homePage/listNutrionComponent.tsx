import Grid from '@mui/material/Unstable_Grid2';
import NutrientColumn from "../customComponents/nutrientColumn"
import { GridItemC } from "../styledComponents/gridItem"
import { NutrientData, Nutrients } from "../../models/nutrientData";
import { useAppSelector } from "../../hooks/reduxHooks";
import { MealType } from "../../models/mealItem";
import Box from '@mui/material/Box';

interface ListNutrinionProps {
    nutrients: NutrientData[];
}

export const ListNutrinion: React.FC<ListNutrinionProps> = ({ nutrients }) => {
    const totalProtein = useAppSelector((state) => {
        const allMeals = [
            ...state.meals[MealType.BREAKFAST],
            ...state.meals[MealType.LUNCH],
            ...state.meals[MealType.DINNER]
        ];
    
        return allMeals.reduce((sum, item) => sum + item.protein, 0);
    });

    const totalFat= useAppSelector((state) => {
        const allMeals = [
            ...state.meals[MealType.BREAKFAST],
            ...state.meals[MealType.LUNCH],
            ...state.meals[MealType.DINNER]
        ];
    
        return allMeals.reduce((sum, item) => sum + item.fat, 0) ;
    });

    const totalCarbs = useAppSelector((state) => {
        const allMeals = [
            ...state.meals[MealType.BREAKFAST],
            ...state.meals[MealType.LUNCH],
            ...state.meals[MealType.DINNER]
        ];
    
        return allMeals.reduce((sum, item) => sum + item.carb, 0);
    });

    const updatedNutrients = nutrients.map((nutrient) => {
        switch (nutrient.name) {
            case Nutrients.PROTEIN:
                return { ...nutrient, value: totalProtein };
            case Nutrients.FAT:
                return { ...nutrient, value: totalFat };
            case Nutrients.Carbs:
                return { ...nutrient, value: totalCarbs };
            default:
                return nutrient;
        }
    });


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {updatedNutrients.map((nutrient, index) => (
                    <Grid xs={6} key={index}>
                        <GridItemC>
                            <NutrientColumn nutrientName={nutrient.name.toString()} percentage={(nutrient.value ?? 0) / nutrient.maxValue * 100} />
                        </GridItemC>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}