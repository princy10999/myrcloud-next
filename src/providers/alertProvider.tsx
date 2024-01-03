import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import type { AlertTemplateProps, AlertOptions } from "react-alert";
import { Provider } from "@blaumaus/react-alert";

// optional configuration
const options: AlertOptions = {
  // you can also just use 'bottom center'
  position: "middle",
  timeout: 0,
  transition: "fade",
};

// the style contains only the margin given as offset
// options contains all alert given options
// message is the alert message
// close is a function that closes the alert
const AlertTemplate = ({
  style,
  options,
  message,
  close,
}: AlertTemplateProps) => (
  <div style={style}>
    {options.type === "info" && "!"}
    {options.type === "success" && ":)"}
    {options.type === "error" && ":("}
    {message}
    <button onClick={close}>X</button>
  </div>
);
export default function AlertProvider({ children }: React.PropsWithChildren) {
  return (
    <Provider template={AlertMUITemplate} {...options}>
      {children}
    </Provider>
  );
}

interface IProps {
  message: string | JSX.Element;
  options: {
    title?: string | JSX.Element;
    actions?: {
      copy: string;
      onClick: any;
    }[];
    closeCopy?: string;
  };
  close: any;
}
export const AlertMUITemplate = ({ close, message, options }: IProps) => {
  return (
    <Dialog
      open={true}
      onClose={close}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{options.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {options.actions &&
          options.actions.map((action, index) => (
            <Button
              onClick={() => {
                action.onClick();
                close();
              }}
              color="primary"
              key={index}
            >
              {action.copy}
            </Button>
          ))}
        <Button onClick={close} color="primary">
          {options.closeCopy || "Okay"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
