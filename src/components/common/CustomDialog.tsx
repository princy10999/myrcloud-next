import React from "react";
import { Dialog } from "@mui/material";
import PropTypes from "prop-types";

type CustomDialogProps = {
  isOpen: boolean;
  handleClose: (props: any) => any;
  children: React.ReactNode;
};

const CustomDialog = ({
  isOpen,
  handleClose,
  children,
}: CustomDialogProps) => {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        arial-labelledby="max-width-dialog-title"
      >
        {children}
      </Dialog>
    </>
  );
};

export default CustomDialog;
CustomDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.element.isRequired,
};
