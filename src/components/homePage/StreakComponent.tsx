import { Box, Tooltip, Typography } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";

interface StreakComponentProps {
  streak: number;
  styles?: CSSProperties;
}

const StreakComponent: React.FC<StreakComponentProps> = ({
  streak,
  styles,
}) => {
  const [localStreak, setStreak] = useState<number>(0);
  useEffect(() => {
    if (!streak) {
      return;
    }

    setStreak(streak);
  }, [streak]);

  const standartContainerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "max-content",
    border: "2px solid #00ffff",
    padding: "10px",
  };

  const mergedStyle = { ...standartContainerStyle, ...styles };

  return (
    <Tooltip title="Your streak">
      <Box sx={mergedStyle}>
        <Typography
          sx={{
            color: "rgb(224, 224, 224)",
          }}
        >
          {localStreak}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default StreakComponent;
