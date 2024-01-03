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

export default function RoundCheckBox({ title, selected,borderRadius }: any) {
  const { classes } = useStyles();
  const theme = useTheme();
  return (
    <Box
    width="100px"
      display="flex"
      border={`1px solid #DDDDDD`}
      borderRadius="5px"
      p={1}
      color={(theme) => theme.palette.bgGray.main}
    >
      <Box
      borderRadius={borderRadius}
      bgcolor={selected ? theme.palette.primary.main : "white"}
        border={
          selected
            ? `1px solid ${theme.palette.primary.main}`
            : `1px solid #DDDDDD`
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
            src={`/icon/check.svg`}
          />
        )}
      </Box>
      {title}
    </Box>
  );
}
