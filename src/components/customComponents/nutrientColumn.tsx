import { Container, Typography } from "@mui/material"
import { StandardCircleWithLabel } from "../styledComponents/standartCirculStyle";

interface NutrientColumnProps{
    nutrientName: string;
    percentage: number;
}

const NutrientColumn: React.FC<NutrientColumnProps> = ({nutrientName, percentage}) =>{
    return(
        <Container>
            <Typography variant='h5' component="h2">
                {nutrientName}
            </Typography>
            <StandardCircleWithLabel value={percentage}/>
        </Container>
    )
}

export default NutrientColumn