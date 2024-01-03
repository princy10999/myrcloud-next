import CommonComponentProps from "@customTypes/commonComponentProps";
import { SaveAltOutlined } from "@mui/icons-material";
import { Typography, Box, Stack } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type DocumentComponentProps = CommonComponentProps & {
  uploadedFiles?: any;
};

export default function DocumentPicker({
  uploadedFiles,
}: DocumentComponentProps) {
  const onDrop = useCallback((acceptedFiles: any) => {
    uploadedFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      sx={{
        border: "1px dashed",
        backgroundColor: (theme) => theme.palette.bgLightGray.main,
        borderColor: (theme) => theme.palette.grey[500],
        borderRadius: "5px",
        alignContent: "center",
        padding: 4,
        marginTop: 1,
        textAlign: "center",
        cursor: "pointer",
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Stack direction={"row"} justifyContent={"center"}>
        <Typography color={"textSecondary"} variant="subtitle1">
          Drag and Drop file here
        </Typography>
        <Typography
          marginLeft={4}
          marginRight={4}
          color={"textSecondary"}
          variant="subtitle1"
        >
          Or
        </Typography>
        <SaveAltOutlined fontSize="small" color="primary" />
        <Typography
          marginLeft={1}
          sx={{
            color: (theme) => theme.palette.primary.main,
          }}
          variant="subtitle1"
        >
          Browse Files
        </Typography>
      </Stack>
    </Box>
  );
}
