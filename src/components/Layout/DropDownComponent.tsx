import React from "react";
import {
  InputLabel,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  Input,
  OutlinedInput,
} from "@mui/material";
import Assets from "@components/common/image_container";
const DropDownComponent = ({
  text,
  height,
  width,
  values,
  valid,
  onChange,
  name,
  value,
  label,
  defaultValue,
  defaultChecked,
  disabled,
  fontWeight,
  labelSize,
  multiple
}: any) => {
  return (
    <>
      {text && (
        <Box
          mt={1.5}
          mb={1}
          display="flex"
          fontSize="12px"
          flexDirection={"row"}
          // gap={0.5}
        >
          <InputLabel sx={{ fontWeight: fontWeight, fontSize: labelSize }}>
            {text}
          </InputLabel>
          {valid && (
            <Typography color="#EF627A" component={"caption"} variant={"body2"}>
              *
            </Typography>
          )}
        </Box>
      )}
      <FormControl sx={{ width: width, height: height }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value || ''}
          onChange={onChange}
          name={name}
          defaultValue={defaultValue || ''}
          defaultChecked={defaultChecked}
          disabled={disabled}
          displayEmpty
          renderValue={(selected) => {
            if (selected === "") {
              return <span style={{ color: '#a9a9a9' }} >Select</span>
            }
            return selected;
          }}
        // inputProps={{ 'aria-label': 'Without label' }}
        >
          {values &&
            values?.map((val: any, index: number) => {
              return (
                <MenuItem value={val} key={index.toString()}>
                  {val}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </>
  );
};

export default DropDownComponent;
