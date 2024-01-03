import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Assets from "@components/common/image_container";
import { Box, InputLabel, Typography } from "@mui/material";
import PlusButton from "./PlusButton";

export default function AutoCompleteSearch({
  width,
  height,
  text,
  valid,
  options,
  placeholder,
  handleChange,
  name,
  handleChangeInput,
  fontWeight,
  labelSize,
  defaultValue,
  freeSolo = true,
  clearOnSelect,
  blurOnSelect
}: any) {
  //const [value, setValue] = React.useState<string | null>("");
  // const [inputValue, setInputValue] = React.useState(inputValue1 ? inputValue1 : "");
  const inputRef = React.useRef(null);
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
          <InputLabel
            sx={{
              fontWeight: fontWeight,
              fontSize: "14px",
            }}
          >
            {text}
          </InputLabel>
          {valid && (
            <Typography color="#EF627A" component={"caption"} variant={"body2"}>
              *
            </Typography>
          )}
        </Box>
      )}
      <Box display="flex" className="search_filed">
        <Assets className="logo_img_verify" src={`/assets/img/Search.svg`} />
        <Autocomplete
          disablePortal
          blurOnSelect={blurOnSelect}
          options={options || []}
          onChange={handleChange}
          isOptionEqualToValue={(option: any, value: any) => {
            if (value === "" || value === option) {
              return true
            } else {
              return false
            }
          }}
          value={defaultValue || ""}
          sx={{
            width: width,
          }}
          ListboxProps={{
            style: {
              maxHeight: "180px",
              border: "1px solid white",
            },
          }}
          freeSolo={freeSolo}
          renderInput={(params: any) => (
            <TextField
              className="searchInput"
              {...params}
              placeholder={placeholder}
              onChange={handleChangeInput}
              name={name}
            />
          )}
        />
      </Box>
    </>
  );
}
