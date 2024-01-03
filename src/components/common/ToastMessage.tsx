import * as React from "react";
import { Stack } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useTheme } from "@mui/material";

export default function ToastMessage({
  open,
  handleClose,
  message,
  severity,
}: any) {
  const theme = useTheme();

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        sx={{ marginTop: 6 }}
      >
        <Stack
          sx={{
            width: "100%",
            fontSize: 20,
          }}
          spacing={1}
        >
          <Alert
            icon={true}
            sx={{
              backgroundColor: "#ffffff",
              borderTop:
                severity === "error"
                  ? `3px solid ${theme.palette.error.main}`
                  : `3px solid ${theme.palette.bgSuccess.main}`,
              borderLeft: "1px solid lightgray",
              borderBottom: "1px solid lightgray",
              borderRight: "1px solid lightgray",
              padding: "0px",
            }}
          >
            <Alert
              sx={{
                backgroundColor: "#ffffff",
                color:
                  severity === "error"
                    ? theme.palette.error.main
                    : theme.palette.bgSuccess.main,
              }}
              severity={severity}
              onClose={handleClose}
            >
              <AlertTitle
                sx={{ fontSize: 18, textAlign: "start", fontWeight: "bolder" }}
              >
                {severity === "error" ? "Error" : "Success"}
              </AlertTitle>
              {message}
            </Alert>
          </Alert>

          {/* <Alert icon={false}> <LinearProgress sx={{width:"100%"}}/>
          <Alert severity={severity} onClose={handleClose}>        
            <AlertTitle sx={{ fontSize: 18, textAlign: "start"}}>
              {severity}
            </AlertTitle>
            {message}
          </Alert>
          </Alert> */}
        </Stack>
      </Snackbar>
    </>
  );
}
