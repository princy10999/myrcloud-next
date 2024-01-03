import React from "react";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import { makeStyles } from "tss-react/mui";
import Dropzone, { useDropzone } from "react-dropzone";
import { Grid, TextField, Typography, Box, Stack } from "@mui/material";
import { IconWrapper } from "@components/common/customSvgIcon";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  updateCandidateVideoResume,
  uploadResume,
} from "@redux/Redux/Actions/Candidate";
import ButtonOutlined from "@components/Layout/ButtonOutlined";
import FormTitleWithInfo from "@components/common/formTitleWithInfo";
import { validURL } from "@lib/linkValidation";
import ErrorHandler from "@lib/errorHandler";
import useSnackBar from "@redux/hooks/useSnackBar";

const useStyles = makeStyles()((theme) => {
  return {
    fileUpload: {
      padding: "4%",
      backgroundColor: "#F9F9F9",
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
  };
});

const VideoResume = ({ getCandidateAdditionalDetailsData }: any) => {
  console.log(
    "getCandidateAdditionalDetailsData",
    getCandidateAdditionalDetailsData
  );

  //Hooks
  const dispatch = useDispatch();
  const router: any = useRouter();
  const { classes, cx } = useStyles();
  const { setSnackBar } = useSnackBar();

  //States
  const [jdDocument, setJdDocument] = React.useState();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [videoJDDocument, setVideoJDDocument] = React.useState();
  const [errors, setError] = React.useState<any>({});
  const [data, setData] = React.useState<any>({ videoUrl: "" });

  //Handler
  const onDrop = React.useCallback((acceptedFiles: any) => {
    setJdDocument(acceptedFiles[0].name);
    setVideoJDDocument(acceptedFiles[0].name);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handlePasteInput = (e: any, y: any) => {
    // console.log('====================================');
    // console.log("fulapageinput",y);
    // console.log('====================================');
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: y,
    });
  }
  const validateStep = () => {
    let errors: any = {};
    let formIsValid = true;
    if (!data?.videoUrl) {
      formIsValid = false;
      errors["videoUrl"] = "* Enter video URL";
    } else if (!validURL(data?.videoUrl)) {
      formIsValid = false;
      errors["videoUrls"] = "* Please enter correct URL";
    }
    setError(errors);
    return formIsValid;
  };

  const create_videoResume = async () => {
    try {
      setLoading(true);
      if (validateStep()) {
        const body = {
          videoResumeUrl: data?.videoUrl,
          tags: data?.tag,
          candidateId: router?.query?.candidateId,
        };
        let updateVideoResume = await dispatch(
          updateCandidateVideoResume(body)
        );
        let error = await ErrorHandler(updateVideoResume, setSnackBar);

        if (error) {
          setSnackBar("success", updateVideoResume?.payload?.message);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      setSnackBar("error", "Something went wrong!!");
      setLoading(false);
    }
    setLoading(false);
  };
  // console.log("fullpagedata",data);

  return (
    <Box>
      <Stack direction={"column"}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12} sm={12}>
            <FormTitleWithInfo subtitle="A Max file size of 5MB and it must be in PDF or DOC format." />
            <Dropzone
              onDrop={async (acceptedFiles: any) => {
                var formData = new FormData();
                formData.append(
                  "CandidateId",
                  router?.query?.requisitionId as string
                );
                formData.append(
                  "PartnerId",
                  router?.query?.partnerId as string
                );
                formData.append(
                  "RequisitionId",
                  router?.query?.requisitionId as string
                );
                for (const key in acceptedFiles) {
                  formData.append(
                    "Resume",
                    acceptedFiles[key],
                    acceptedFiles[key]?.name
                  );
                }
                let getUploadResume = await dispatch(uploadResume(formData));
                setJdDocument(getUploadResume?.payload?.data?.fileName);
                let error = await ErrorHandler(getUploadResume, setSnackBar);
                if (error) {
                  setSnackBar("success", getUploadResume?.payload?.message);
                  setLoading(false);
                } else {
                  setLoading(false);
                }
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <Box className={classes.fileUpload} {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <Typography>Drop the files here ...</Typography>
                  ) : (
                    <>
                      {jdDocument ? (
                        <Typography component={"span"}>
                          You selected file {jdDocument}
                        </Typography>
                      ) : (
                        <>
                          <Typography component={"span"}>
                            Drag and Drop file here
                          </Typography>
                          <Typography component={"span"}>Or </Typography>

                          <IconWrapper
                            fontSize="small"
                            icon="upload"
                            color={"primary"}
                          />
                          <Typography
                            component={"span"}
                            color={(theme) => theme.palette.primary.main}
                          >
                            Browse Files{" "}
                          </Typography>
                        </>
                      )}
                    </>
                  )}
                </Box>
              )}
            </Dropzone>
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {jdDocument ? "" : errors["jdDocument"]}
            </Typography>
            <Typography
              justifyContent={"center"}
              display={"flex"}
              mt={2}
              mb={2}
              fontWeight={400}
              fontSize={"16px"}
            >
              Or
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={12} xs={12} sm={12}>
          <TextFieldComponent
            type="text"
            placeholder={"Copy and paste candidate URL"}
            text="Video URL"
            width="100%"
            valid
            name="videoUrl"
            value={data?.videoUrl}
            onChange={handleChangeInput}
            onPaste={(e: any) => {
              const value = e?.clipboardData?.getData('text')
              var videoId = "";
              var fullPage =
                /watch\?v=(.+)/.exec(value) ||
                /youtu\.be\/(.+)/.exec(value) ||
                /embed\/(.+?)"/.exec(value);
              if (fullPage) {
                videoId = fullPage[1];
              }
              if (videoId) {
                var finalEmbedLink = `https://www.youtube.com/embed/${videoId}`;
                setData({
                  ...data,
                  videoUrl: finalEmbedLink,
                });
              }
            }}
          />
          <Typography variant="body2" textAlign={"start"} color={"error"}>
            {data?.videoUrl?.length > 0 ? "" : errors["videoUrl"]}
          </Typography>
          <Typography variant="body2" textAlign={"start"} color={"error"}>
            {validURL(data?.videoUrl) ? "" : errors["videoUrls"]}
          </Typography>
        </Grid>
        {data?.videoUrl && (
          <Grid item md={12} xs={12} sm={12} mt={3}>
            <iframe
              width="100%"
              height="400"
              src={data?.videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Grid>
        )}
        <Typography marginTop={3} fontWeight={600}>
          Add Tags
        </Typography>
        <Stack
          direction={"row"}
          marginTop={1}
          marginBottom={2}
          alignItems={"center"}
        >
          <FormTitleWithInfo
            subtitle="Enter comma separated values like skills, industry, education or
            select from the suggestions"
          />
        </Stack>
        <TextField
          size="small"
          fullWidth
          rows={2}
          multiline
          name="tag"
          onChange={handleChangeInput}
        />
        {/* <Stack direction={"row"} marginTop={2} alignItems={"center"}>
          {["IT", "Java", "MS Office", "VS Code", "React Js"].map(
            (item, index) => {
              return (
                <Chip
                  key={index}
                  label={item}
                  variant="outlined"
                  color="primary"
                  sx={{
                    margin: "4px",
                  }}
                />
              );
            }
          )}
        </Stack> */}
      </Stack>
      <Stack direction={"row-reverse"} mt={2}>
        <ButtonOutlined
          text={"Save"}
          width="auto"
          height="35px"
          onClick={create_videoResume}
          borderRadius={5}
          loading={loading}
        />
      </Stack>
    </Box>
  );
};
export default VideoResume;
