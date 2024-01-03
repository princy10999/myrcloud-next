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
  ListItemText,
  Checkbox,
} from "@mui/material";


// const names = [
//     'Oliver Hansen',
//     'Van Henry',
//     'April Tucker',
//     'Ralph Hubbard',
//     'Omar Alexander',
//     'Carlos Abbott',
//     'Miriam Wagner',
//     'Bradley Wilkerson',
//     'Virginia Andrews',
//     'Kelly Snyder',
//   ];
const DropDownWithCheckbox = ({
  text,
  height,
  width,
  options,
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
  multiple,
  checked
}: any) => {
  const [personName, setPersonName] = React.useState<string[]>([]);

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
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
          // value={value || ""}
          // onChange={onChange}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={value}
          onChange={onChange}
          name={name}
          // placeholder={"asdf"}
          // input={<OutlinedInput label={name} />}
          renderValue={(selected) => selected.join(', ')}
        >
          {options &&
            options?.map((val: any, index: number) => {
              return (
                <MenuItem key={index.toString()} value={val}>
                  <Checkbox checked={value.findIndex((item: any) => item === val) >= 0} />
                  <ListItemText primary={val} />
                </MenuItem>
              );
            })}
        </Select>

      </FormControl>
    </>
  );
};

export default DropDownWithCheckbox;
