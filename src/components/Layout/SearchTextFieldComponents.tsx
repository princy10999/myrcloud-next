import React from "react";
import { InputLabel, OutlinedInput, Typography, Box } from "@mui/material";
import getConfig from "next/config";
import Assets from "@components/common/image_container";
import { TextFields } from "@mui/icons-material";
import TextFieldComponent from "./TextFieldComponent";

const { publicRuntimeConfig } = getConfig();

const SearchTextFieldComponents = ({
  text,
  type,
  placeholder,
  height,
  width,
  marginBottom,
  valid,
  fontWeight,
  onChange,
  marginLeft
}: any) => {
  return (
    <>
      {/* <Box> */}
      {/* {text && (
          <Box mt={2} mb={1} display="flex" fontSize="14px">
            <InputLabel sx={{ fontWeight: { fontWeight } }}>{text}</InputLabel>
            {valid === true && (
              <Typography color="#EF627A" fontSize={20}>
                *
              </Typography>
            )}
          </Box>
        )} */}
      <Box
        ml={marginLeft}
        mt={1.5}
        mb={1}
        display="flex"
        fontSize="12px"
        flexDirection={"row"}
        gap={0.5}
      >
        <InputLabel sx={{ fontWeight: { fontWeight } }}>{text}</InputLabel>
        {valid && (
          <Typography color="#EF627A" component={"caption"} variant={"body2"}>
            *
          </Typography>
        )}
      </Box>
      <Box display="flex" className="search_filed">
        <Assets
          className="logo_img_verify"
          style={{ backgroundColor: "#fff" }}
          src={`/assets/img/Search.svg`}
        />
        <TextFieldComponent
          type={type}
          placeholder={placeholder}
          width={width}
          onChange={onChange}
        />
      </Box>
      {/* </Box> */}
    </>
  );
};

export default SearchTextFieldComponents;
