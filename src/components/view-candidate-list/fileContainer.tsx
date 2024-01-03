import { IconWrapper } from "@components/common/customSvgIcon";
import { IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
type FileContainerProps = {
  iconName?: any;
  fileName?: string;
  fileSize?: string;
  hideDelete?: boolean;
};
export default function FileContainer({
  iconName,
  fileName,
  fileSize,
  hideDelete,
}: FileContainerProps) {
  return (
    <Stack
      direction={"row"}
      border={"1px solid"}
      borderColor={(theme) => theme.palette.grey[300]}
      borderRadius={"5px"}
      marginTop={1}
      padding={2}
      alignItems={"center"}
    >
      <IconWrapper fontSize="large" icon={iconName} color="disabled" />

      <Stack direction={"column"} marginLeft={2}>
        <Typography
          variant="subtitle1"
          color={(theme) => theme.palette.bgDarkBlack.main}
          fontWeight={600}
          fontSize={"16px"}
        >
          {fileName}
        </Typography>
        <Typography variant="caption" color={"textSecondary"}>
          {"File size " + fileSize}
        </Typography>
      </Stack>
      {hideDelete ? (
        ""
      ) : (
        <IconButton
          sx={{
            marginLeft: "auto",
          }}
        >
          <IconWrapper fontSize="small" icon="delete" color="error" />
        </IconButton>
      )}
    </Stack>
  );
}
