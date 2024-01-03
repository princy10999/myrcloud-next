import { FormControlLabel, Radio, RadioProps } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { makeStyles, withStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    main: {
      background: theme?.palette?.bgWhite?.main,
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: 2,
      p: "0px 10px 0px 0px",
      alignContent: "flex-start",
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

const GenderRadio = ({
  name,
  label,
  value,
  handleChange,
  bg,
}: any) => {
  const { classes } = useStyles();

  return (
    // <FormControlLabel
    //   className={bg ? classes?.main : ""}
    //   value={value}
    //   control={<BpRadio />}
    //   label={label}
    //   name={name}
    //   onChange={handleChange}
    //   checked={count == num && true}
    //   sx={{ marginLeft: 1 }}
    // />
    <FormControlLabel
      className={bg ? classes?.main : ""}
      value={value}
      control={<BpRadio />}
      label={label}
      onChange={handleChange}
      name={name}
    />
  );
};

export default GenderRadio;
