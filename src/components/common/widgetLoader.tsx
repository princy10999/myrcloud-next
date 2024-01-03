import CircularProgress from "@mui/material/CircularProgress";
const WidgetLoader = (props:any) => {
  return (
    <div
      style={{
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color={props.color || "primary"} />
    </div>
  );
};

export default WidgetLoader;
