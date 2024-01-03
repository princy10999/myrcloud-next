import React from 'react'
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import CommonComponentProps from '@customTypes/commonComponentProps';
import { Box, InputLabel } from '@mui/material';
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme: any) => {
    return {
        datePicker:{
            width:"100%"
        }
    };
});


type DatePickerCommonProps = CommonComponentProps & {
    inputLabel?: string;
    helperText?: string;
    placeholder?: string;
    onChange?: any;
    isMandatory?: boolean;
    width?: string;
    value?: any;
    name?: any;
    fontWeight?: any;
    labelSize?: any;
    labelColor?: any;
    defaultValue?: any;
    disabled?: boolean;
};
const DatePickerCommon = ({
    inputLabel,
    helperText,
    placeholder,
    onChange,
    isMandatory,
    width,
    value,
    name,
    defaultValue,
    disabled
}: DatePickerCommonProps) => {
    const {classes} = useStyles()

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} >
            <InputLabel
                sx={{
                    marginTop: "12px",
                    marginBottom: "8px",
                    fontSize: "14px",
                }}
            >
                {inputLabel}
            </InputLabel>
          <Box width={width}>
          <MobileDatePicker
          className={classes.datePicker}
                inputFormat="dd/MM/yyyy"
                value={value}
                onChange={onChange}
                renderInput={(params) => <TextField name={name} {...params} />}
                disabled={disabled}
            />
          </Box>
        </LocalizationProvider>
    )
}

export default DatePickerCommon