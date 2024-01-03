import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material";

const ButtonContained = ({
  text,
  height,
  width,
  marginRight,
  marginLeft,
  borderRadius,
  endIcon,
  startIcon,
  onClick,
  marginTop,
  marginBottom,
  color,
  disabled,
  type,
  loading,
  disableLoader,
  fontWeight,
  href,
  fontSize,
}: any) => {
  // const theme:any = useTheme();
  return (
    <Button
      type={type}
      variant="contained"
      color={`${color === "error" ? "error" : "primary"}`}
      sx={{
        borderRadius: borderRadius,
        marginTop: marginTop,
        marginBottom: marginBottom,
        height: height,
        width: width,
        marginRight: marginRight,
        marginLeft: marginLeft,
        fontSize: fontSize,
        fontWeight: fontWeight,
      }}
      disableElevation
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      disabled={disabled}
      href={href}
      // loading={loading}
    >
      {text}
      {loading && !disableLoader ? (
        <CircularProgress
          size={20}
          color={"inherit"}
          sx={{ marginLeft: 3 }}
          // variant={"indeterminate"}
          // disableShrink={true}
        />
      ) : (
        ""
      )}
    </Button>
  );
};

export default ButtonContained;
