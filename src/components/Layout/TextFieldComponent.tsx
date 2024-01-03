import {
  InputLabel,
  OutlinedInput,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const useStyles = makeStyles()((theme) => {
  return {
    main: {
      background: theme?.palette?.bgWhite?.main,
    },
    error: {
      border: "1px solid green",
    },
  };
});

const TextFieldComponent = ({
  text,
  type,
  placeholder,
  height,
  width,
  valid,
  multiline,
  rows,
  name,
  value,
  onChange,
  onInput,
  inputProps,
  defaultValue,
  fontWeight,
  labelSize,
  labelColor,
  showPasswordToggle,
  maxValue,
  error,
  className,
  format,
  bgcolor,
  onKeyDown,
  onPaste
}: any) => {
  const { classes } = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
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
              color: labelColor,
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
      <OutlinedInput
        name={name}
        value={value}
        onChange={onChange}
        type={
          type == "password"
            ? showPassword && showPasswordToggle
              ? "text"
              : type
            : type
        }
        placeholder={placeholder}
        sx={{ height: height, width: width, bgcolor:bgcolor }}
        multiline={multiline}
        rows={rows}
        className={`${classes?.main} ${className}`}
        onInput={onInput}
        format={format}
        onPaste={onPaste}
        inputProps={inputProps}
        onKeyDown={onKeyDown}
        defaultValue={defaultValue}
        {...(showPasswordToggle && {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        })}
      />
    </>
  );
};

export default TextFieldComponent;
