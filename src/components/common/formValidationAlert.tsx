import MuiAlert from "@mui/material/Alert";
export default function FormValidationAlert({
  elevation = 6,
  variant = "filled",
  severity = "info",
  ...props
}: any) {
  return (
    <MuiAlert
      elevation={elevation}
      variant={variant}
      severity={severity}
      {...props}
      style={{
        alignItems: "center",
        ...props.style,
        ...(props.simpleAlert && {
          backgroundColor: "unset",
          paddingLeft: 0,
        }),
      }}
    />
  );
}
