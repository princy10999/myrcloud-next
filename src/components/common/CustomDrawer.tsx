import { Drawer } from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme: any) => {
  return {
    drawerPaper: {
      width: 600,
      position: "absolute",
      [theme.breakpoints.up("xs")]: {
        width: 400,
      },
      [theme.breakpoints.up("sm")]: {
        width: 400,
      },
      [theme.breakpoints.up("md")]: {
        width: 500,
      },
      [theme.breakpoints.up("lg")]: {
        width: 600,
      },
      [theme.breakpoints.up("xl")]: {
        width: 700,
      },
    },
    filterPaper: {
      width: 300,
      position: "absolute",
      [theme.breakpoints.up("xs")]: {
        width: 300,
      },
      [theme.breakpoints.up("sm")]: {
        width: 300,
      },
      [theme.breakpoints.up("md")]: {
        width: 300,
      },
      [theme.breakpoints.up("lg")]: {
        width: 300,
      },
      [theme.breakpoints.up("xl")]: {
        width: 300,
      },
    },
  };
});

export default function CustomDrawer({
  isDrawerOpen,
  handleClose,
  children,
  anchor,
  filter,
}: any) {
  const { classes } = useStyles();
  return (
    <Drawer
      open={isDrawerOpen}
      onClose={handleClose}
      anchor={anchor}
      variant="temporary"
      classes={
        filter
          ? { paper: classes?.filterPaper }
          : { paper: classes?.drawerPaper }
      }
    >
      {children}
    </Drawer>
  );
}
