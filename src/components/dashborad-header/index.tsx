import React from "react";
import {
  Box,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Grid,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import SearchTextFieldComponents from "@components/Layout/SearchTextFieldComponents";
import ButtonContained from "@components/Layout/ButtonContained";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { IconWrapper } from "@components/common/customSvgIcon";
import ButtonText from "@components/Layout/ButtonText";
import DatePickerCommon from "@components/common/DatePickerCommon";

const useStyles = makeStyles()((theme) => {
  return {
    filter: {
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
      color: "#1BA39C",
      ".MuiSvgIcon-root ": {
        fill: "#1BA39C !important",
      },
    },
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

const DashboardHeader = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };

  const { classes } = useStyles();
  const router = useRouter();
  return (
    <>
      <Grid container p={3} gap={2}>
        <Grid
          item
          spacing={1}
          display="flex"
          justifyContent={"space-between"}
          flexDirection={"row"}
          alignItems={"center"}
          flexWrap="wrap"
          md={12}
          sm={12}
          xs={12}
        >
          <Stack direction="row" gap={2}>
            <Typography fontSize={"28px"} fontWeight={500}>
              Dashboard
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              mt={1.5}
              color={(theme) => theme.palette.primary.main}
            >
              <IconWrapper fontSize="small" icon="download" />
              <IconWrapper fontSize="small" icon="share" />
            </Stack>
          </Stack>
          <Stack
            direction={{ md: "row", lg: "row", sm: "column", xs: "column" }}
            spacing={1}
          >
            <FormControl size="small">
              <Select
                id="demo-select-small"
                value={age}
                onChange={handleChange}
                className={classes.filterBlack}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                disabled
              >
                <MenuItem value="">Last Month</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            {/* <TextField
              id="outlined-size-small"
              size="small"
              type={"date"}
              disabled
            />
            <TextField
              id="outlined-size-small"
              size="small"
              type={"date"}
              disabled
            /> */}
              <DatePickerCommon disabled={true}/>
                  <DatePickerCommon disabled={true}/>
            <ButtonContained
              fontWeight={300}
              borderRadius="30px"
              text="Create Requistion"
              endIcon={<AddIcon />}
              onClick={() => {
                router.push("/rcloud/create-requisition");
              }}
            />
          </Stack>
        </Grid>
        <Grid
          item
          spacing={1}
          display="flex"
          justifyContent={"space-between"}
          flexDirection={"row"}
          alignItems={"center"}
          flexWrap="wrap"
          md={12}
          sm={12}
          xs={12}
        >
          <Stack direction={"row"}>
            <SearchTextFieldComponents placeholder={"Search Requisition"} />
          </Stack>

          <Box p={0} mt={2}>
            <Stack direction="row" flexWrap={"wrap"} spacing={1}>
              <Typography
                component={"h4"}
                variant={"body1"}
                color={(theme) => theme.palette.bgGray.main}
                fontWeight={500}
                mt={1}
              >
                Filters
              </Typography>
              <FormControl size="small">
                <Select
                  id="demo-select-small"
                  value={age}
                  onChange={handleChange}
                  className={classes.filter}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disabled
                >
                  <MenuItem value="">All Customer</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small">
                <Select
                  id="demo-select-small"
                  value={age}
                  onChange={handleChange}
                  className={classes.filter}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disabled
                >
                  <MenuItem value="">All Partner</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small">
                <Select
                  id="demo-select-small"
                  value={age}
                  onChange={handleChange}
                  className={classes.filter}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disabled
                >
                  <MenuItem value="">Account Manager</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small">
                <Select
                  id="demo-select-small"
                  value={age}
                  onChange={handleChange}
                  className={classes.filter}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disabled
                >
                  <MenuItem value="">Location</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small">
                <Select
                  id="demo-select-small"
                  value={age}
                  onChange={handleChange}
                  className={classes.filter}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disabled
                >
                  <MenuItem value="">Priority</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small">
                <Select
                  id="demo-select-small"
                  value={age}
                  onChange={handleChange}
                  className={classes.filter}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disabled
                >
                  <MenuItem value="">Aging</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardHeader;
