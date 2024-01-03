import React from "react";
import { Button, CircularProgress } from "@mui/material";

export default function ProcessingButton({
  children,
  processing,
  processingText = "Saving...",
  ...buttonProps
}: any) {
  return (
    <Button
      {...buttonProps}
      {...(processing && {
        disabled: true,
        startIcon: <CircularProgress size="10px" color="inherit" />,
      })}
    >
      {processing ? processingText : children}
    </Button>
  );
}
