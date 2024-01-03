import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Stack,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import TextEditor from "@components/common/TextEditor";
import { IconWrapper } from "@components/common/customSvgIcon";
import ButtonText from "@components/Layout/ButtonText";
import {
  getUpdateRnRDetails,
  UploadOtherAttachment,
} from "@redux/Redux/Actions/Client";
import { useDispatch } from "react-redux";
import { responseEnum } from "@lib/enum";
import ToastMessage from "@components/common/ToastMessage";
import localStoreUtil from "@redux/Api/localstore.util";
import { useAppSelector } from "@redux/Redux/app/hooks";
import StyledAccordian from "@components/common/styledAccordian";
import StyledAccordianSummary from "@components/common/styledAccordianSummary";
import StyledAccordianDetails from "@components/common/styledAccordianDetail";
import Dropzone, { useDropzone } from "react-dropzone";
import { makeStyles } from "tss-react/mui";
import { serialize } from "object-to-formdata";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import { getFileIcon } from "@lib/getFileIconName";
import DocViewer from "react-doc-viewer";
import DocPreview from "@components/common/docPreview";
import CustomTooltip from "@components/common/customTooltip";
import useSnackBar from "@redux/hooks/useSnackBar";
import usePageLoader from "@redux/hooks/usePageLoader";

export const allowedFiles = [
  "image/png",
  "image/jpeg",
  "video/mp4",
  "application/pdf",
];
export const allowedExtensions = ".png,.jpg,.jpeg,.mp4,.doc,.docx,.pdf";
const useStyles = makeStyles()((theme) => {
  return {
    fileUpload: {
      padding: "3%",
      width: "100%",
      border: `1px dashed ${theme.palette.bgGray.main}`,
      borderRadius: "4px",
      position: "relative",
      marginBottom: 6,
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "16px",
      color: theme.palette.bgBlack.main,
      backgroundColor: "#F9F9F9",
      display: "flex",
      justifyContent: "center",
      gap: 20,
    },
  };
});
export default function AdditionDocumentsStep({ editRequisitionData }: any) {
  //Hooks
  const dispatch = useDispatch();
  const { classes, cx } = useStyles();
  const theme = useTheme();
  const { setSnackBar } = useSnackBar();
  const setFullPageLoader = usePageLoader();

  //State
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [data, setData] = useState<any>({});
  const requisitionData = useAppSelector(
    (state: any) => state?.client?.isGetCreateRequisition?.requistionData
  );
  const otherAttachments = data?.otherAttachments || [];

  //Handler
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleAccordion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      if (data?.requisitionId) {
        setExpanded(newExpanded ? panel : false);
      }
    };

  const onDrop = React.useCallback(
    async (acceptedFiles: any, fileLabel: any) => {
      const objData = {
        RequisitionId: data?.requisitionId,
        FileLable: fileLabel || data?.documentLabel,
        Files: acceptedFiles,
      };
      const formData = serialize(objData, {
        indices: true,
        noFilesWithArrayNotation: true,
      });
      setFullPageLoader(true);
      const resData = await dispatch(UploadOtherAttachment(formData));
      if (resData?.payload?.code == 1) {
        setData((t: any) => {
          return {
            ...t,
            otherAttachments: resData?.payload?.data,
            documentLabel: "",
          };
        });
      } else {
        setData((t: any) => {
          return {
            ...t,
            documentLabel: "",
          };
        });
      }
      setFullPageLoader(false);
    },
    [data]
  );

  useEffect(() => {
    if (requisitionData) {
      setData(requisitionData?.data);
    }
  }, [requisitionData]);
  useEffect(() => {
    if (editRequisitionData) {
      setData(editRequisitionData);
    }
  }, [editRequisitionData]);
  return (
    <>
      <Box marginBottom={1.5}>
        <StyledAccordian
          expanded={expanded === "panel2"}
          onChange={handleAccordion("panel2")}
        >
          <StyledAccordianSummary
            expandIcon={<IconWrapper fontSize="11px" icon="down" />}
            aria-controls="panel1a-content"
            id="panel2"
          >
            <Typography fontWeight={"inherit"}>Additional Documents</Typography>
          </StyledAccordianSummary>
          <StyledAccordianDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} mt={3}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextFieldComponent
                    type="text"
                    placeholder="Document Label"
                    width="100%"
                    name="documentLabel"
                    labelSize={"14px"}
                    labelColor={theme.palette.bgGray.main}
                    valid
                    value={data?.documentLabel}
                    onChange={handleChangeInput}
                  />
                  <Dropzone onDrop={onDrop} disabled={!data?.documentLabel}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Button
                          disabled={!data?.documentLabel}
                          variant="outlined"
                          color="primary"
                        >
                          Upload
                        </Button>
                      </div>
                    )}
                  </Dropzone>
                </Stack>
                <Typography color="textSecondary" variant="caption">
                  Max file size: 10MB; .doc,.docx,.pdf,.mp3,.mp4 format
                </Typography>
              </Grid>
              {otherAttachments.map((item: any, idx: number) => {
                return (
                  <Grid key={idx} item xs={12} container alignItems="center">
                    <Grid item md={3} xs={12}>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight="bold"
                      >
                        {item.fileLable}
                      </Typography>
                    </Grid>
                    <Grid item md={9} xs={12} display="flex" flexWrap="wrap">
                      <Stack spacing={3}>
                        {item.attachmentFiles.map((file: any, idx: number) => {
                          return (
                            <Box key={idx} textAlign="center">
                              <CustomTooltip title={file.fileName}>
                                <span>
                                  <IconButton
                                    onClick={(e) => {
                                      window.open(file.fileUrl, "_blank");
                                    }}
                                  >
                                    <IconWrapper
                                      icon={getFileIcon({
                                        fileName: file.fileName,
                                      })}
                                      color="primary"
                                      fontSize="small"
                                    />
                                    <Typography
                                      variant="caption"
                                      color="textSecondary"
                                      ml={1}
                                    >
                                      {file.fileName}
                                    </Typography>
                                  </IconButton>
                                </span>
                              </CustomTooltip>
                              {/* <DocPreview
                              link={file.fileUrl}
                              iconName={getFileIcon({
                                fileName: file.fileName,
                              })}
                              octateFile={false}
                            ></DocPreview> */}
                            </Box>
                          );
                        })}
                      </Stack>
                      <Box style={{ marginLeft: "auto" }}>
                        <CustomTooltip title={"delete this label"}>
                          <IconButton
                            onClick={(e) => onDrop([], item.fileLable)}
                          >
                            <IconWrapper
                              icon="delete"
                              color="error"
                              fontSize="small"
                            />
                          </IconButton>
                        </CustomTooltip>
                      </Box>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </StyledAccordianDetails>
        </StyledAccordian>
      </Box>
    </>
  );
}
