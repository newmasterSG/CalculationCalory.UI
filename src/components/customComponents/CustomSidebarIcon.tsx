import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

function CustomSidebarIcon(props: any) {
  return (
    <SvgIcon {...props} viewBox="0 0 100 100" fill="none">
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        rx="20"
        stroke="black"
        stroke-width="5"
        fill="none"
      />

      <line x1="50" y1="10" x2="50" y2="90" stroke="black" stroke-width="5" />

      <polygon points="30,50 45,35 45,65" fill="black" />
    </SvgIcon>
  );
}

export default CustomSidebarIcon;
