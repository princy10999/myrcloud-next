import React from "react";
import { AppBar, Box, IconButton, Typography } from "@mui/material";
import { IconWrapper } from "@components/common/customSvgIcon";

const CustomDrawerHeader = ({
  handleClose,
  title,
  subtitle,
  otherText,
}: any) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#EFEFEF",
          flexDirection: "row",
          display: "flex",
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          p={1}
        >
          <Box>
            <Typography
              variant="h6"
              display="block"
              color={(theme) => theme.palette.bgBlack.main}
              fontWeight="bold"
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              display="block"
              color={(theme) => theme.palette.bgLightBlack.main}
              paddingTop={1}
              fontSize={16}
            >
              {subtitle && subtitle}
            </Typography>
            {otherText && otherText}
          </Box>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 15,
              color: "black",
            }}
          >
            <IconWrapper fontSize="small" icon="wrong" />
          </IconButton>
        </Box>
      </AppBar>
    </Box>
  );
};

export default CustomDrawerHeader;
