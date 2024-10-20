import { useMemo } from "react";

const useColorBasedOnValue = (value: number) => {
  const color = useMemo(() => {
    if (value > 110) return "#FF0000";
    if (value >= 110) return "#4caf50";
    if (value >= 50) return "#ffeb3b";
    return "#f44336";
  }, [value]);

  return color;
};

export default useColorBasedOnValue;
