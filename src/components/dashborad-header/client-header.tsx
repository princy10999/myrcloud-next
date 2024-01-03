import React from "react";
import {
    Box,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  TextField,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import DatePickerCommon from "@components/common/DatePickerCommon";

const useStyles = makeStyles()((theme) => {
  return {
    filterBlack: {
      boxShadow: "none",
      ".MuiOutlinedInput-notchedOutline": { border: 0 },
      ".MuiInputBase-input": {
        backgroundColor: "inherit",
        marginRight: "20px !important",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: 0,
      },
      "&:click .MuiOutlinedInput-notchedOutline": {
        border: 0,
      },
      color: "#000000",
      fontWeight: 500,
      ".MuiSvgIcon-root ": {
        fill: `#000000 !important`,
      },
    },
  };
});

const ClientHeader = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };

  const { classes } = useStyles();
  return (
    <>
      <Stack
            direction="row"
            spacing={1}
            display={"flex"}
            justifyContent={"flex-end"}>
            <Stack
              direction={{ md: "row", lg: "row", sm: "column", xs: "column" }}
              spacing={1}>
              <FormControl size="small">
                <Select
                  id="demo-select-small"
                  value={age}
                  onChange={handleChange}
                  className={classes.filterBlack}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}>
                  <MenuItem value="">Last 30 days</MenuItem>
                  <MenuItem value={1}>Yesterday</MenuItem>
                  <MenuItem value={2}>Last week</MenuItem>
                  <MenuItem value={3}>Last 15 Days</MenuItem>
                </Select>
              </FormControl>
              {/* <TextField
                id="outlined-size-small"
                size="small"
                type={"date"} />
              <TextField id="outlined-size-small" size="small" type={"date"} /> */}
              <DatePickerCommon disabled={true}/>
                  <DatePickerCommon disabled={true}/>
            </Stack>
          </Stack>  
    </>
  );
};

export default ClientHeader;
