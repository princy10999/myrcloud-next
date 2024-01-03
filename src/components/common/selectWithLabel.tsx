import CommonComponentProps from "@customTypes/commonComponentProps";
import { InputLabel, Menu, MenuItem, Select, TextField } from "@mui/material";
import React from "react";

type SelectWithLabelProps = CommonComponentProps & {
  inputLabel?: string;
  helperText?: string;
  placeholder?: string;
  onChange?: any;
  isMandatory?: boolean;
  width?: string;
  value?: string;
};

export default function SelectWithLabel({
  inputLabel,
  helperText,
  placeholder,
  onChange,
  isMandatory,
  width,
  children,
  value
}: SelectWithLabelProps) {
  return (
    <>
      <InputLabel
        sx={{
          marginBottom: "4px",
          fontSize:"14px"
        }}
      >
        {inputLabel}
      </InputLabel>
      <Select
        variant="outlined"
        fullWidth
        value={value}
        size={"small"}
        sx={{
          width: width || "100%",
        }}
      >
        <MenuItem disabled value={"0"}>Select {inputLabel}</MenuItem>
        {children}
      </Select>
    </>
  );
}
