import React from "react";
import Assets from "@components/common/image_container";
import { Box } from "@mui/material";
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

export default function CheckBox({ title, selected }: any) {
  const { classes } = useStyles();
  const theme = useTheme();
  return (
    <Box
      display="flex"
      border={
        selected
          ? `1px solid ${theme.palette.primary.main}`
          : `1px solid #DDDDDD`
      }
      borderRadius="5px"
      bgcolor={selected ? "rgba(27, 163, 156, 0.05)" : "white"}
      p={1}
      color={selected ? theme.palette.primary.main : "#777777"}
    >
      <Box
        border={
          selected
            ? `1px solid ${theme.palette.primary.main}`
            : `1px solid ${theme.palette.bgLightGray.main}`
        }
        height="8px"
        mr={1}
        mt={0.5}
        p={0.8}
        width="8px"
        position="relative"
      >
        {selected && (
          <Assets
            className={classes?.img}
            height="8px"
            src={`/assets/img/check.svg`}
          />
        )}
      </Box>
      {title}
    </Box>
  );
}
