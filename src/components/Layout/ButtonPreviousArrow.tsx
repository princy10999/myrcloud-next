import React from "react";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material";
import Assets from "@components/common/image_container";

const ButtonPreviousArrow = ({
  text,
  height,
  width,
  marginRight,
  marginLeft,
  borderRadius,
  endIcon,
  onClick,
  color,
  disabled,
  type,
}: any) => {
  const theme = useTheme();
  return (
    <Button
      type={type}
      variant="outlined"
      color={`${color === "error" ? "error" : "primary"}`}
      sx={{
        borderRadius: borderRadius,
        display: "flex",
        justifyContent: "space-around",
        height: height,
        width: width,
        marginRight: marginRight,
        marginLeft: marginLeft,
        fontSize: "16px",
        padding: "1.2%",
      }}
      disableElevation
      endIcon={endIcon}
      onClick={onClick}
      disabled={disabled}
    >
      <Assets
        src={`/icon/left-arrow.svg`}
        color="primary"
        height={12}
        className="arrowleft"
      />
      {text}
    </Button>
  );
};

export default ButtonPreviousArrow;
