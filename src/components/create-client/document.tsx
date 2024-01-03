import AddDocument from "@components/addCandidate/addDocument";
import { IconWrapper } from "@components/common/customSvgIcon";
import DocumentPicker from "@components/common/documentPicker";
import PaperContainer from "@components/common/paperContainer";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import CommonComponentProps from "@customTypes/commonComponentProps";
import { DeleteOutlined, FileCopyOutlined } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { uploadClientDocument } from "@redux/Redux/Actions/ClientCreation";
import { useAppSelector } from "@redux/Redux/app/hooks";
import id from "date-fns/esm/locale/id/index.js";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import DocumentComponent from "@components/create-client/documentComponent";

export default function Documents({
  handleLoading,
  isSubmitStep,
  handleNext,
}: any) {
  const [data, setData] = React.useState<any>({
    notes: "",
  });
  const [errors, setError] = React.useState<any>({});
  const docList = useAppSelector(
    (state: any) =>
      state?.rcloud?.isCreateClient?.createClientData?.clientDocuments
  );
  const clientId = useAppSelector(
    (state: any) => state?.rcloud?.isCreateClient?.createClientData?.clientId
  );
  console.log(docList);
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const validate = () => {
    let errors: any = {};
    let formIsValid = true;
    docList.map((item: any, index: React.Key | null | undefined) => {
      if (item.isMandatory && item.file.length <= 0) {
        errors[item.documentId] =
          "* Please Enter " + item.documentName + " Name";
        formIsValid = false;
      }
    });
    setError(errors);
    return formIsValid;
  };

  useEffect(() => {
    if (isSubmitStep > 0) {
      if (validate()) {
        handleNext();
      }
    }
  }, [isSubmitStep]);

  return (
    <>
      <Box marginBottom="11px">
        <PaperContainer>
          <Typography
            variant={"h5"}
            color={(theme) => theme.palette.bgBlack.main}
            fontWeight={700}
            fontSize={"24px"}
            mb={1}
          >
            Documents & Attachments
          </Typography>
          <Box
            display="flex"
            gap={1}
            color={(theme) => theme.palette.bgGray.main}
          >
            <IconWrapper fontSize="small" icon="information" />
            <Typography
              fontSize={14}
              fontWeight={400}
              mb={3}
              color={(theme) => theme.palette.bgGray.main}
            >
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequa
            </Typography>
          </Box>
          <Divider />
          {docList
            ? docList.map((item: any, index: React.Key | null | undefined) => {
                return (
                  <div key={index}>
                    <DocumentComponent
                      documentType={item.documentName}
                      docId={item.documentId}
                      clientId={clientId}
                      document={item.file}
                      mandatory={item.isMandatory}
                      showPicker={true}
                    />
                    {item.isMandatory ? 
                    <Typography
                      variant="body2"
                      textAlign={"start"}
                      color={"error"}
                    >
                      {item.file.length > 0 ? "" : errors[item.documentId]}
                    </Typography> : ""}
                    <Box
                      mt={2}
                      display="flex"
                      gap={1}
                      color={(theme) => theme.palette.bgGray.main}
                    >
                      <IconWrapper fontSize="small" icon="information" />
                      <Typography
                        fontSize={14}
                        fontWeight={400}
                        mb={3}
                        color={(theme) => theme.palette.bgGray.main}
                      >
                        Your business details will solely be used for
                        verification.
                      </Typography>
                    </Box>
                  </div>
                );
              })
            : ""}

          {/* <DocumentComponent documentType="Contract Copy" />
          <Box
            mt={2}
            display="flex"
            gap={1}
            color={(theme) => theme.palette.bgGray.main}
          >
            <IconWrapper fontSize="small" icon="information" />
            <Typography
              fontSize={14}
              fontWeight={400}
              mb={3}
              color={(theme) => theme.palette.bgGray.main}
            >
              Your business details will solely be used for verification.
            </Typography>
          </Box> */}
          <Typography
            variant={"h5"}
            color={(theme) => theme.palette.bgBlack.main}
            fontWeight={500}
            fontSize={"18px"}
            mb={1}
          >
            Notes
          </Typography>
          <Grid item md={8} xs={12} sm={6}>
            <TextFieldComponent
              type="text"
              width="100%"
              name="notes"
              defaultValue="Malad West"
              value={data?.notes?.value}
              onChange={handleChangeInput}
            />
          </Grid>
        </PaperContainer>
      </Box>
    </>
  );
}
