import { Box, FormControlLabel, Radio, RadioProps } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { makeStyles, withStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    main: {
      background: theme?.palette?.bgWhite?.main,
      width: 200,
      [theme.breakpoints.up("xs")]: {
        width: 200,
      },
      [theme.breakpoints.up("sm")]: {
        width: 250,
      },
      [theme.breakpoints.up("md")]: {
        width: 150,
      },
      [theme.breakpoints.up("lg")]: {
        width: 180,
      },
      [theme.breakpoints.up("xl")]: {
        width: 250,
      },
    },
    primaryBox: {
    //   border: `1px solid ${theme?.palette?.primary?.main}`,
      borderRadius: 5,
      marginLeft: 10,
      width: "auto",
      padding: "0px 20px 0px 5px",
      color: "#1ba39c",
    },
    grayBox: {
    //   border: `1px solid rgba(221, 221, 221, 1)`,
      borderRadius: 5,
      marginLeft: 10,
      width: "auto",
      padding: "0px 20px 0px 5px",
      color: "1ba39c",
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
  backgroundColor: "#1ba39c",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 20,
    height: 20,
    backgroundImage:
    "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
    " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
    "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
  content: '""',

  },
  "input:hover ~ &": {
    backgroundColor: "#1ba39c",
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
}: any) => {
  const { classes } = useStyles();

  return (

    <Box className={bg ? classes?.primaryBox : ""}>
      <FormControlLabel
        className={bg ? classes?.primaryBox : ""}
        value={value}
        control={<BpRadio />}
        label={label}
        name={name}
        onChange={handleChange}
        checked={count == num && true}
        sx={{ marginLeft: 1 }}
        labelPlacement={labelPlacement}
      />
    </Box>
  );
};

export default RadioButton;
