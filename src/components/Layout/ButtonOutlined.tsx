import { Button, CircularProgress } from "@mui/material";

const ButtonOutlined = ({
  text,
  height,
  width,
  marginRight,
  borderRadius,
  marginLeft,
  marginTop,
  startIcon,
  onClick,
  loading,
  disableLoader,
  disableElevation,
  href,
  endIcon,
  fontSize,
}: any) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      sx={{
        borderRadius: borderRadius,
        marginTop: marginTop,
        height: height,
        width: width,
        marginRight: marginRight,
        marginLeft: marginLeft,
        fontSize: fontSize,
      }}
      disableElevation={disableElevation}
      startIcon={startIcon}
      onClick={onClick}
      href={href}
      endIcon={endIcon}
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

export default ButtonOutlined;
