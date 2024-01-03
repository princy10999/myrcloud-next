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
import TextFieldComponent from "@components/Layout/TextFieldComponent";

const { publicRuntimeConfig } = getConfig();

const SearchTextFieldBeforeDropDownComponents = ({
                                                   text,
                                                   type,
                                                   placeholder,
                                                   height,
                                                   width,
                                                   marginBottom,
                                                   valid, fontWeight
                                               }: any) => {
    return (
        <Box>
            <Box
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
                    // onChange={onChange}
                />
                {/*<Typography className="search1">*/}
                    <FormControl sx={{ width: "120px" }}>
                        <Select inputProps={{ "aria-label": "Without label" }} displayEmpty>
                            {" "}
                            <MenuItem>Select</MenuItem>
                        </Select>
                    </FormControl>
                {/*</Typography>*/}
            </Box>
        </Box>
    );
};

export default SearchTextFieldBeforeDropDownComponents;
