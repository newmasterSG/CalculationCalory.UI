import { Container, Typography } from "@mui/material";
import { StandardCircleWithLabel } from "../styledComponents/standartCirculStyle";

interface NutrientColumnProps {
  nutrientName: string;
  percentage: number;
  valuePercentage?: number;
}

const NutrientColumn: React.FC<NutrientColumnProps> = ({
  nutrientName,
  percentage,
  valuePercentage,
}) => {
  return (
    <Container>
      <Typography variant="h5" component="h2">
        {nutrientName}
      </Typography>
      <StandardCircleWithLabel
        percent={percentage}
        valuefrompercent={valuePercentage}
      />
    </Container>
  );
};

export default NutrientColumn;
