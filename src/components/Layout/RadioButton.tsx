import { Box, FormControlLabel, Radio, RadioProps } from "@mui/material";
import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { makeStyles, withStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    main: {
      background: theme?.palette?.bgWhite?.main,
      width: "100%",
      borderRadius: 5,
      marginRight: "8px",
      [theme.breakpoints.up("xs")]: {
        marginBottom: "8px",
      },
    },
    primaryBox: {
      border: `1px solid ${theme?.palette?.primary?.main}`,
      borderRadius: 5,
      marginLeft: 10,
      width: "auto",
      padding: "0px 20px 0px 5px",
      color: theme?.palette?.primary?.main,
    },
    grayBox: {
      border: `1px solid rgba(221, 221, 221, 1)`,
      borderRadius: 5,
      marginLeft: 10,
      width: "auto",
      padding: "0px 20px 0px 5px",
      color: theme?.palette?.bgGray?.main,
    },
  };
});

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 20,
  height: 20,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#137cbd",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 20,
    height: 20,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

function BpRadio(props: RadioProps) {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const RadioButton = ({
  name,
  label,
  value,
  count,
  handleChange,
  num,
  bg,
  labelPlacement,
  signUpBorder,
  fontSize,
}: any) => {
  const { classes } = useStyles();
  const theme = useTheme();
  return (
    <Box
      className={bg ? classes?.main : ""}
      sx={
        // count &&
        signUpBorder && {
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 2,
        }
      }
    >
      <FormControlLabel
        value={value}
        control={<BpRadio />}
        label={label}
        name={name}
        onChange={handleChange}
        checked={count}
        sx={{ marginLeft: 1, fontSize: fontSize }}
        labelPlacement={labelPlacement}
      />
    </Box>
  );
};

export default RadioButton;
