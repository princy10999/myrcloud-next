import * as React from "react";
import { Palette, Slide, useTheme } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { useAppSelector, useAppDispatch } from "@redux/Redux/app/hooks";
import { AppActions } from "@redux/Redux/CommonApp/appSlice";
import FullPageLayout from "@components/Layout/FullPageLayout";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={5} ref={ref} {...props} />;
});
function SlideTransition(props: any) {
  return <Slide {...props} direction="left" />;
}
export default function CustomSnackBar() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const snackBar = useAppSelector((state) => state?.app?.common?.snackBar);

  const handleClose = (event: any) => {
    dispatch(
      AppActions.actions.setSnackBar({
        open: false,
        type: snackBar.type,
        message: snackBar.message,
      })
    );
  };
  const color = theme.palette[(snackBar.type || "success") as AlertColor].light;

  return (
    <Snackbar
      open={snackBar.open}
      autoHideDuration={6000}
      onClose={handleClose}
      //anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={SlideTransition}
      style={{ maxWidth: "500px" }}
      disableWindowBlurListener
    >
      <Alert
        onClose={handleClose}
        //color={snackBar.type as any}
        severity={snackBar.type as any}
        sx={{
          borderLeft: `4px solid ${color}`,
          bgcolor: theme.palette.background.paper,
        }}
      >
        {snackBar.message}
      </Alert>
    </Snackbar>
  );
}
