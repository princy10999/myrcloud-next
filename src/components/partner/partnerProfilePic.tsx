import { Avatar, Typography } from "@mui/material";
import React from "react";
import stringAvatar from "@lib/stringAvatar";
import { IconWrapper } from "@components/common/customSvgIcon";
import FileUploader from "@components/common/fileUploader";
import { useDispatch } from "react-redux";
import { uploadPartnerLogo } from "@redux/Redux/Actions/Partners";
import { uploadClientLogo } from "@redux/Redux/Actions/ClientCreation";

export const allowedFiles = ["image/png", "image/jpeg"];
export const allowedExtensions = ".png,.jpg,.jpeg";
export default function PartnerProfilePic({
  partnerLogo,
  partnerName = "",
  height = 60,
  width = 60,
  alignSelf = "",
  onSuccess,
  hideUploadText,
  type,
  clientId,
}: any) {
  const dispatch = useDispatch();

  const _uploadPartnerLogo = async (file: any) => {
    const formData = new FormData();
    formData.append("Logo", file, file.name);
    await dispatch(uploadPartnerLogo(formData));
    if (onSuccess) {
      onSuccess();
    }
  };

  const _uploadClientLogo = async (file: any) => {
    const formData = new FormData();
    formData.append("Logo", file, file.name);
    formData.append("ClientId", clientId);
    await dispatch(uploadClientLogo(formData));
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <FileUploader
      id={`uploadPartnerLogoFile`}
      allowedMimeTypes={allowedFiles}
      allowedExtensions={allowedExtensions}
      onsuccess={(file: any) => {
        //_uploadJdMedia(file, "jdimage");
        if (type == "client") {
          _uploadClientLogo(file);
        } else {
          _uploadPartnerLogo(file);
        }
      }}
      //onerror={(msg) => dispatch(setSnackBar(true, "error", msg))}
      displayComponent={
        <>
          {partnerLogo || partnerName ? (
            <Avatar
              sx={{
                width: height,
                height: width,
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                alignSelf: alignSelf,
                bgcolor: (theme) => theme.palette.primary.main,
              }}
              src={partnerLogo}
              {...stringAvatar(partnerName || "")}
            ></Avatar>
          ) : (
            <>
              <Avatar
                sx={{
                  width: height,
                  height: width,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  alignSelf: alignSelf,
                }}
              >
                <IconWrapper icon="upload" />
              </Avatar>
              {hideUploadText ? null : (
                <Typography ml={1} alignSelf="middle" color="primary">
                  Upload partner logo
                </Typography>
              )}
            </>
          )}
        </>
      }
    />
  );
}
