import React from "react";
import Assets from "@components/common/image_container";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    img: {
      position: "absolute",
      top: "3px",
      left: "2px",
    },
  };
});

export default function PlusButton({ title, selected, onClick }: any) {
  const { classes } = useStyles();
  const theme = useTheme();
  return (
    <Box
      bgcolor="#EAF4FE"
      width="35px"
      height="35px"
      borderRadius="50%"
      paddingLeft={1}
      onClick={onClick}
    >
      <Button>
        <Assets
          className={classes?.img}
          height="15px"
          src={`/icon/plusicon.svg`}
        />
      </Button>
    </Box>
  );
}
