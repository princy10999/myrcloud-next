import { Button, CircularProgress, useTheme } from "@mui/material";
import React from "react";

const ButtonText = ({
  text,
  height,
  width,
  marginRight,
  marginLeft,
  marginTop,
  startIcon,
  onClick,
  loading,
  disableLoader,
  color,
}: any) => {
  const theme = useTheme();
  return (
    <Button
      variant="text"
      color={color ? "inherit" : "primary"}
      sx={{
        borderRadius: "30px",
        marginTop: marginTop,
        height: height,
        width: width,
        fontSize: "16px",
        marginRight: marginRight,
        marginLeft: marginLeft,
      }}
      disableElevation
      startIcon={startIcon}
      onClick={onClick}
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

export default ButtonText;
