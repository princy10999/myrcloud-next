import React from 'react'
import { InputLabel, OutlinedInput, Typography, Box } from "@mui/material";
import getConfig from "next/config";
import { makeStyles } from "tss-react/mui";
import Assets from "@components/common/image_container";
import { TextFields } from "@mui/icons-material";
import TextFieldComponent from "./TextFieldComponent";
const { publicRuntimeConfig } = getConfig();
const useStyles = makeStyles()((theme) => {
    return {
        phoneInput: {
            display: "flex",
        },
    };
});


const InputFiledWIthPhoneCode = ({
    text,
    value,
    value2,
    type,
    placeholder,
    height,
    width,
    marginBottom,
    valid,
    fontWeight,
    onChange,
    type2,
    width2,
    onChange2,
    name,
    name2, inputProps2
}: any) => {
    const { classes } = useStyles();
    console.log('====================================');
    console.log("value", value, value2);
    console.log('====================================');
    return (
        <>
            <Box
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
                <TextFieldComponent
                    value={value2}
                    className="phoneInput"
                    name={name2}
                    type={type2}
                    inputProps={inputProps2}
                    width={"90px"}
                    onChange={onChange}
                />
                <TextFieldComponent
                    value={value}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    width={width}
                    onChange={onChange}
                />
            </Box>
        </>
    )
}

export default InputFiledWIthPhoneCode