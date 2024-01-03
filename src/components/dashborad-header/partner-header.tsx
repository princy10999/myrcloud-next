import PaperContainer from "@components/common/paperContainer";
import {
  Box,
  Button,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  OutlinedInput,
  Grid,
  Link,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import React from "react";
import Assets from "@components/common/image_container";
import { makeStyles } from "tss-react/mui";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import SearchTextFieldComponents from "@components/Layout/SearchTextFieldComponents";
import ButtonContained from "@components/Layout/ButtonContained";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { IconWrapper } from "@components/common/customSvgIcon";
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

const PartnerHeader = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };

  const { classes } = useStyles();
  const router = useRouter();
  return (
    <>
      <Box>
        <Stack
          direction="row"
          spacing={1}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Stack direction="column">
            <Typography fontWeight={"bold"} variant="h6">
              Partner Dashboard
            </Typography>
          </Stack>
          <Stack
            direction={{ md: "row", lg: "row", sm: "column", xs: "column" }}
            spacing={1}
          >
            <Stack direction="row" spacing={2}>
              <Button
                size="small"
                onClick={() => {}}
                color={"primary"}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  fontSize: "14px",
                }}
                disabled
              >
                <IconWrapper fontSize="small" icon="download" />
                Download
              </Button>
              <Button
                size="small"
                onClick={() => {}}
                color={"primary"}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  fontSize: "14px",
                }}
                disabled
              >
                <IconWrapper fontSize="small" icon="filter" />
                Filter
              </Button>
            </Stack>
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
                <MenuItem value={10}>Last Quarter</MenuItem>
                <MenuItem value={20}>This Year</MenuItem>
              </Select>
            </FormControl>
            {/* <TextField id="outlined-size-small" size="small" type={"date"} disabled/>
            <TextField id="outlined-size-small" size="small" type={"date"} disabled/> */}
             <DatePickerCommon disabled={true}/>
                  <DatePickerCommon disabled={true}/>
            {/* <ButtonContained
              fontWeight={300}
              borderRadius="30px"
              text="Create Requistion"
              endIcon={<AddIcon />}
              onClick={() => {
                router.push("/client/create-requisition");
              }}
            /> */}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default PartnerHeader;
