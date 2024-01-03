import * as React from "react";
import { styled } from "@mui/material/styles";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import { makeStyles } from "tss-react/mui";
import { Box, FormControlLabel } from "@mui/material";

const useStyles = makeStyles()((theme) => {
  return {
    main: {
      background: theme?.palette?.bgWhite?.main,
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
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: "#666666",
  "input:disabled ~ &": {
    boxShadow: "none",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#dddddd",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#1ba39c",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#1ba39c",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 18,
    height: 18,
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

// Inspired by blueprintjs
function BpCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      sx={{
        "&:hover": { bgcolor: "transparent" },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
}

export default function CustomizedCheckbox({
  name,
  label,
  value,
  handleChange,
  num,
  bg,
  checked,
  count,
  labelPlacement,
  disabled
}: any) {
  const { classes } = useStyles();
  return (
    <Box className={checked ? classes?.primaryBox : classes?.grayBox}>
      <FormControlLabel
        className={bg == true ? classes?.main : ""}
        value={value}
        control={<BpCheckbox defaultChecked={checked} disabled={disabled} />}
        label={label}
        name={name}
        sx={{ marginLeft: 1 }}
        labelPlacement={labelPlacement}
        onChange={handleChange}

      />
    </Box>
  );
}
