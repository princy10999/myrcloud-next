import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const FullWidthLoaderButton = ({
  open,
  handleClose,
  onClick,
  text,
  borderRadius,
  marginRight,
  height,
  width,
  color,
  type,
  marginLeft,
  endIcon,
  alignItems,
}: any) => {
  return (
    <>
      <Button
        type={type}
        variant="contained"
        color={`${color === "error" ? "error" : "primary"}`}
        sx={{
          borderRadius: borderRadius,
          marginTop: "20px",
          marginBottom: "20px",
          height: height,
          width: width,
          marginRight: marginRight,
          marginLeft: marginLeft,
          alignItems: alignItems,
          fontSize: "16px",
          padding: "1.2%",
        }}
        disableElevation
        endIcon={endIcon}
        onClick={onClick}
      >
        {text}
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default FullWidthLoaderButton;
