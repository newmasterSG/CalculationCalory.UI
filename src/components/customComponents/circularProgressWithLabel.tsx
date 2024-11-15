import { Typography } from "@mui/material";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress/CircularProgress";
import Box from "@mui/material/Box";
import useColorBasedOnValue from "../../hooks/useColorBasedOnValue";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  const color = useColorBasedOnValue(props.value);

  const combinedSx = {
    ...props.sx,
    color: color,
  };

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} sx={combinedSx} />
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
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;
