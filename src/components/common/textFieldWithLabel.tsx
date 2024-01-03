import CommonComponentProps from "@customTypes/commonComponentProps";
import { Box, InputLabel, TextField, Typography } from "@mui/material";
import React from "react";
type TextFieldWithLabelProps = CommonComponentProps & {
  inputLabel?: string;
  helperText?: string;
  placeholder?: string;
  onChange?: any;
  isMandatory?: boolean;
  width?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  value?: any;
  name?: any;
  fontWeight?: any;
  labelSize?: any;
  labelColor?: any;
  defaultValue?: any;
};
export default function TextFieldWithLabel({
  inputLabel,
  helperText,
  placeholder,
  onChange,
  isMandatory,
  width,
  type,
  multiline,
  value,
  name,
  rows,
  defaultValue
}: TextFieldWithLabelProps) {
  return (
    <>
      <InputLabel
        sx={{
          marginTop: "12px",
          marginBottom: "4px",
          fontSize: "14px",
        }}
      >
        {inputLabel}
      </InputLabel>

      <TextField
      defaultValue={defaultValue}
        name={name}
        variant="outlined"
        value={value}
        onChange={onChange}
        type={type || "text"}
        multiline={multiline}
        rows={rows}
        fullWidth
        size={"small"}
        sx={{
          width: width || "100%",
        }}
      ></TextField>
    </>
  );
}
