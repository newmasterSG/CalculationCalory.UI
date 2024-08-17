import { Box } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import NutrientColumn from "../customComponents/nutrientColumn"
import { GridItemC } from "../styledComponents/gridItem"
import { Nutrients } from "../../models/nutrientData";
import { useAppSelector } from "../../hooks/reduxHooks";
import { MealType } from "../../models/mealItem";


export const ListNutrinion: React.FC = () => {
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

    const nutrients = [
        { name: Nutrients.PROTEIN, value: totalProtein },
        { name: Nutrients.FAT, value: totalFat },
        { name: Nutrients.Carbs, value: totalCarbs }
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {nutrients.map((nutrient, index) => (
                    <Grid xs={6} key={index}>
                        <GridItemC>
                            <NutrientColumn nutrientName={nutrient.name.toString()} percentage={nutrient.value} />
                        </GridItemC>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}