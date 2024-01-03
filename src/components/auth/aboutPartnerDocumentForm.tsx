import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Dropzone, { useDropzone } from "react-dropzone";
import ButtonContained from "@components/Layout/ButtonContained";
import ButtonOutlined from "@components/Layout/ButtonOutlined";
import ButtonText from "@components/Layout/ButtonText";
import Assets from "@components/common/image_container";
import { makeStyles } from "tss-react/mui";
import { useDispatch } from "react-redux";
import {
  DeletePartnerDocumentSelf,
  getPartnerUploadedDocumentSelf,
  getPartnerUploadedDocumentSelfPersona,
  UploadPartnerDocumentSelf,
} from "@redux/Redux/Actions/Profile";
import { useAppSelector } from "@redux/Redux/app/hooks";
import { IconWrapper } from "@components/common/customSvgIcon";
import Router from "next/router";
import { Stack } from "@mui/system";
import ProfileSteper from "@components/common/profileSteper";
import WidgetLoader from "@components/common/widgetLoader";
import { DocWithPreview } from "@pages/partner/profile";

const useStyles = makeStyles()((theme) => {
  return {
    fileUpload: {
      padding: "4%",
      backgroundColor: "inherit",
      width: "100%",
      border: `1px dashed ${theme.palette.bgGray.main}`,
      borderRadius: "4px",
      position: "relative",
      marginBottom: 6,
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "16px",
      color: theme.palette.bgBlack.main,
      display: "flex",
      justifyContent: "center",
      gap: 20,
    },
    uploadedFile: {
      padding: "4%",
      backgroundColor: "inherit",
      width: "100%",
      border: `1px solid ${theme.palette.bgGray.main}`,
      borderRadius: "4px",
      position: "relative",
      marginBottom: 6,
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "16px",
      color: theme.palette.bgBlack.main,
      display: "flex",
      justifyContent: "center",
      gap: 20,
    },
    titleFile: {
      lineBreak: "anywhere",
      width: "100%",
    },
    fileUpload2: {
      paddingTop: "1.5%",
      paddingBottom: "1.5%",
      paddingLeft: "4%",
      paddingRight: "4%",
    },
  };
});

export default function AboutPartnerDocumentForm() {
  const dispatch = useDispatch();
  const { classes, cx } = useStyles();
  const [termDocument, setTermDocument] = React.useState<any>();
  const [aadharDocument, setAadharDocument] = React.useState<any>();
  const [panCard, setPanCard] = React.useState<any>();
  const [itrDocument, setITRDocument] = React.useState<any>();
  const [agencyLogo, setAgencyLogo] = React.useState<any>();
  const [meseCer, setMeseCer] = React.useState<any>();
  const [gstCer, setGstCer] = React.useState<any>();
  const onDrop = React.useCallback((acceptedFiles: any) => {
    setTermDocument(acceptedFiles[0].name);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  // const partnerDetails = useAppSelector(
  //   (state: any) =>
  //     state?.auth?.IsPersonaWiseDocumentSet?.personaWiseDocumentPersona?.data
  // );
  const partnerDetailsStatus = useAppSelector(
    (state: any) => state?.auth?.IsPersonaWiseDocumentParsonaSet?.status
  );
  const uploadedDocument = useAppSelector(
    (state: any) =>
      state?.auth?.IsPersonaWiseDocumentParsonaSet?.personaWiseDocument?.data
  );
  // console.log("uploadedDocument", uploadedDocument);
  const getUploadedDocument = useAppSelector(
    (state: any) => state?.auth?.IsUploadDocumentSet?.uploadDocument
  );
  const deleteUploadedDocument = (e: any) => {
    var formData = new FormData();
    formData.append("DocumentId", e);
    dispatch(DeletePartnerDocumentSelf(formData));
  };
  // React.useEffect(() => {
  //   const body = `?PersonaId=1`;
  //   dispatch(getPartnerUploadedDocumentSelf(body));
  // }, []);
  React.useEffect(() => {
    dispatch(getPartnerUploadedDocumentSelfPersona());
  }, [getUploadedDocument]);
  const validateDoc = uploadedDocument?.filter((e: any) => (e?.isMandatory && e?.file.length === 0))
  return (
    <>
      <Box p={2} width="100%">
        <ProfileSteper step={3} />
        <Box bgcolor={(theme) => theme.palette.bgWhite.main}>
          <Typography fontWeight={600} fontSize={"18px"} mb={2} mt={2}>
            Upload your documents
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            {console.log('partnerDetailsStatus', partnerDetailsStatus)}
            {partnerDetailsStatus == "loading" ? (
              <WidgetLoader />
            ) : (
              uploadedDocument?.map((e: any, i: number) => {
                return (
                  <Box mb={2} key={i} mt={1}>
                    <Box mt={0} mb={1} display="flex" fontSize="14px">
                      <Typography fontSize={"16px"} fontWeight={600}>
                        {e?.documentName}
                      </Typography>
                      {e?.isMandatory && (
                        <Typography color="#EF627A" component={"caption"} variant={"body2"}>
                          *
                        </Typography>
                      )}
                    </Box>
                    {e?.file?.length === 0 && <Dropzone
                      onDrop={(acceptedFiles: any) => {
                        setPanCard(acceptedFiles);
                        console.log("acceptedFiles", acceptedFiles);
                        var formData = new FormData();
                        formData.append("DocumentId", e?.documentId);
                        // formData.append("FileObjectList", acceptedFiles);
                        for (const key in acceptedFiles) {
                          formData.append(
                            "FileObjectList",
                            acceptedFiles[key],
                            acceptedFiles[key]?.name
                          );
                        }
                        dispatch(UploadPartnerDocumentSelf(formData));
                      }}
                      multiple={true}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box className={classes.fileUpload} {...getRootProps()}>
                          <input {...getInputProps()} required={e?.isMandatory && true} />
                          {isDragActive ? (
                            <Typography>Drop the files here ...</Typography>
                          ) : (
                            <>
                              <Typography component={"span"}>
                                Drag and Drop file here
                              </Typography>
                              <Typography component={"span"}>Or </Typography>

                              <IconWrapper
                                fontSize="small"
                                icon="upload"
                                color="primary"
                              />
                              <Typography
                                component={"span"}
                                color={(theme) => theme.palette.primary.main}
                              >
                                Browse Files{" "}
                              </Typography>
                            </>
                          )}
                        </Box>
                      )}
                    </Dropzone>}
                    {uploadedDocument?.filter((y: any) => y?.documentId === e?.documentId)?.map(
                (item: any, idx: number) => (
                  <Grid key={idx} item lg={3} md={6} xs={12}>
                   {item.file.length > 0 && <DocWithPreview
                    height="150px"
                    maxWidth="auto"
                      docArray={item.file.length > 0 ? item.file : []}
                      src={item.file.length > 0 ? item.file[0].fileUrl : ""}
                      docName=""
                    // canEdit={!isVerify}
                    />}
                  </Grid>
                )
              )}
                    <Stack>
                      <Button
                        style={{ marginLeft: "auto" }}
                        onClick={() => {
                          deleteUploadedDocument(e?.documentId);
                        }}
                      >
                        Remove all
                      </Button>
                    </Stack>
                    {/* 
                  <Typography
                    component={"p"}
                    fontSize="16px"
                    color={(theme) => theme.palette.bgLightBlack.main}
                  >
                    <IconWrapper fontSize="12px" icon="information" /> Your
                    business Amet minim mollit non deserunt ullamco est sit
                    aliqua dolor do amet sint. Velit officia construe.{" "}
                  </Typography> */}
                    <Box display={"flex"} flexDirection={"row"} gap={1} mt={2}>
                      <IconWrapper
                        fontSize="10px"
                        icon="information"
                        color={"action"}
                      />
                      <Typography
                        component={"p"}
                        fontSize="14px"
                        color="#B6B6B6"
                        mr={1}
                      >
                        {" "}
                        Your business Amet minim mollit non deserunt ullamco est
                        sit aliqua dolor do amet sint. Velit officia construe.{" "}
                      </Typography>
                    </Box>
                  </Box>
                );
              })
            )}
          </Grid>
        </Grid>
      </Box>

      <Box
        p={1}
        bgcolor={(theme) => theme.palette.bgLightGray.main}
        width="100%"
        mt={0.5}
        position="sticky"
        bottom="0px"
      >
        <Box
          height="55px"
          width="100%"
          bgcolor={(theme) => theme.palette.bgLightGray.main}
          border-top="1px solid #DDDDDD"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="20px"
        >
          <Box>
            <ButtonOutlined
              marginTop="0px"
              height="auto"
              borderRadius="30px"
              width="150px"
              text="Previous"
              onClick={() => {
                Router.back();
              }}
            />
            <ButtonText
              height="auto"
              width="150px"
              text="Skip for now"
              onClick={() => {
                Router.push("/partner");
              }}
            />
          </Box>
          <ButtonContained
            marginBottom="10px"
            marginTop="10px"
            height="auto"
            width="150px"
            borderRadius="30px"
            text="Update Details"
            color={(theme: any) => theme.palette.primary.main}
            disabled={validateDoc?.length !== 0 ? true : false}
            onClick={() => {
              Router.push("/partner");
            }}
          />
        </Box>
      </Box>
    </>
  );
}
