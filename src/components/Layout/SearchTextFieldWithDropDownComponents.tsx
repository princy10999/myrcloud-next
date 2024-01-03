import React from "react";
import {
  InputLabel,
  OutlinedInput,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import getConfig from "next/config";
import Assets from "@components/common/image_container";

const { publicRuntimeConfig } = getConfig();

const SearchTextFieldWithDropDownComponents = ({
  text,
  type,
  placeholder,
  height,
  width,
  marginBottom,
  valid,
}: any) => {
  return (
    <Box>
      <Box mt={2} mb={1} display="flex" fontSize="14px">
        <InputLabel>{text}</InputLabel>
        {valid === true && (
          <Typography color="#EF627A" fontSize={20}>
            *
          </Typography>
        )}
      </Box>
      <Box display="flex" className="search_filed">
        <Typography className="search1">
          <FormControl sx={{ width: "120px" }}>
            <Select inputProps={{ "aria-label": "Without label" }} displayEmpty>
              {" "}
              <MenuItem>Select</MenuItem>
            </Select>
          </FormControl>
        </Typography>
        <OutlinedInput
          className="search"
          type={type}
          placeholder={placeholder}
          sx={{ width: width, height: height }}
        />
        <Assets
          className="logo_img_verify search_img"
          src={`/assets/img/Search.svg`}
        />
      </Box>
    </Box>
  );
};

export default SearchTextFieldWithDropDownComponents;
