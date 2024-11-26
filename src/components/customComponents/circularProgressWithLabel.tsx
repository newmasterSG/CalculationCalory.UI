import { Typography } from "@mui/material";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress/CircularProgress";
import Box from "@mui/material/Box";
import useColorBasedOnValue from "../../hooks/useColorBasedOnValue";

interface CircularProgressWithLabelCustom {
  percent: number;
  valuefrompercent?: number;
}

function CircularProgressWithLabel(
  props: CircularProgressProps & CircularProgressWithLabelCustom
) {
  const color = useColorBasedOnValue(props.percent);

  const combinedSx = {
    ...props.sx,
    color: color,
  };

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        {...props}
        value={props.percent}
        sx={combinedSx}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.percent)}%`}</Typography>

        {props.valuefrompercent && (
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${props.valuefrompercent.toFixed(2)}`}</Typography>
        )}
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;
