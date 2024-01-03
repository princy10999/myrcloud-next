import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material";
import Assets from "@components/common/image_container";

const ButtonArrow = ({
  text,
  height,
  width,
  marginRight,
  marginLeft,
  borderRadius,
  endIcon,
  onClick,
  marginTop,
  marginBottom,
  color,
  disabled,
  type,
  disableLoader,
  loading
}: any) => {
  const theme = useTheme();
  return (
    <Button
      type={type}
      variant="contained"
      color={`${color === "error" ? "error" : "primary"}`}
      sx={{
        borderRadius: borderRadius,
        // marginTop: "20px",
        // marginBottom: "20px",
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
      {text}
      {loading ? (
        <CircularProgress
          size={20}
          color={"inherit"}
          // sx={{ marginLeft: 3 }}
          // variant={"indeterminate"}
          // disableShrink={true}
        />
      ) : (
        <Assets
        src={`/icon/right-arrow.svg`}
        height={12}
        className="email_img_verify"
      />
      )}
      
    </Button>
  );
};

export default ButtonArrow;
