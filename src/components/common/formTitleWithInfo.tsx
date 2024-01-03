import { Typography, Box } from "@mui/material";
import React from "react";
import { IconWrapper } from "./customSvgIcon";

type FormTitleWithInfoProps = {
  title?: string;
  icon?: string;
  subtitle?: string;
};
export default function FormTitleWithInfo(props: FormTitleWithInfoProps) {
  return (
    <>
      <Typography fontWeight={600} marginTop={2} mb={1} variant="body1">
        {props.title}
      </Typography>
      {props.subtitle && (
        <Box
          mb={1.5}
          display="flex"
          alignItems="center"
          color={(theme) => theme.palette.bgGray.main}
        >
          <IconWrapper
            icon={props.icon || "information"}
            color="inherit"
            style={{ fontSize: "1rem" }}
          />
          <Typography ml={1} color={"inherit"} variant="subtitle2">
            {props.subtitle}
          </Typography>
        </Box>
      )}
    </>
  );
}
