import React from "react";
import DocumentPicker from "@components/common/documentPicker";
import StyledAccordian from "@components/common/styledAccordian";
import StyledAccordianDetails from "@components/common/styledAccordianDetail";
import StyledAccordianSummary from "@components/common/styledAccordianSummary";
import CommonComponentProps from "@customTypes/commonComponentProps";
import {
  DeleteOutlined,
  FileCopyOutlined,
} from "@mui/icons-material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { IconWrapper } from "@components/common/customSvgIcon";
import { Button, Divider, Typography, Box, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/Redux/app/hooks";
import {
  deleteCandidateDocument,
  getCandidateUploadedDocument,
  uploadDocument,
  uploadResume,
} from "@redux/Redux/Actions/Candidate";
import { useRouter } from "next/router";
import FormTitleWithInfo from "@components/common/formTitleWithInfo";
import ButtonOutlined from "@components/Layout/ButtonOutlined";
import useSnackBar from "@redux/hooks/useSnackBar";
import ErrorHandler from "@lib/errorHandler";
import usePageLoader from "@redux/hooks/usePageLoader";

export default function AddDocument({
  getCandidateAdditionalDetailsData,
  onClick,
}: any) {
  const setFullPageLoader = usePageLoader();
  const dispatch = useDispatch();
  const router: any = useRouter();

  const getCandidateUploadedDocumentdata = useAppSelector(
    (state: any) =>
      state?.partner?.isGetCandidateUploadedDocument
        ?.getCandidateUploadedDocumentData?.data
  );
  React.useEffect(() => {
    const body = `?CandidateId=${router?.query?.candidateId} `;
    {
      router?.query?.candidateId &&
        dispatch(getCandidateUploadedDocument(body));
    }
  }, [router?.isReady]);

  return (
    <Box marginTop={2}>
      <StyledAccordian>
        <StyledAccordianSummary expandIcon={<ExpandMore />}>
          <Typography fontWeight={"inherit"}>Documents</Typography>
        </StyledAccordianSummary>

        <StyledAccordianDetails>
          <FormTitleWithInfo subtitle="Max file size: 10MB; .doc,.docx,.pdf,.mp3,.mp4 format" />
          {getCandidateUploadedDocumentdata?.map((e: any) => {
            return (
              <>
                <DocumentComponent
                  document={e}
                  documentType={e?.documentName}
                  documentId={e.documentId}
                  createCandidateId={router?.query?.candidateId}
                />
                <Divider
                  sx={{
                    marginTop: 4,
                  }}
                ></Divider>
              </>
            );
          })}
           <Stack direction={"row-reverse"} mt={2}>
        <ButtonOutlined
          text={"Save"}
          width="auto"
          height="35px"
          onClick={onClick}
          borderRadius={5}
        />
      </Stack>
        </StyledAccordianDetails>
      </StyledAccordian>
      <Stack direction={"row-reverse"}>
        {/* <Button
          variant="outlined"
          size="large"
          sx={{ borderRadius: "30px", marginTop: 1 }}
          startIcon={
            <IconWrapper fontSize="small" icon="save" color={"primary"} />
          }
          onClick={onClick}
        >
          Save as Draft
        </Button> */}
      </Stack>
    </Box>
  );
}
type DocumentComponentProps = CommonComponentProps & {
  documentType?: string;
  document?: any;
  documentId?: String;
  createCandidateId?: any;
};
const DocumentComponent = ({
  documentType,
  document,
  documentId,
  createCandidateId,
}: DocumentComponentProps) => {
  //Hooks
  const setFullPageLoader = usePageLoader();
  const router: any = useRouter();
  const dispatch = useDispatch();
  const { setSnackBar } = useSnackBar();
  //State
  const [doc, setDoc] = React.useState<any>(null);
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  console.log("document", document, documentType, documentId);

  //Handler
  const handleFile = async (files: any, e: any) => {
    setDoc(files[0]);
    setFullPageLoader(true);
    var formData = new FormData();
    formData.append("DocumentId", documentId as any);
    formData.append("CandidateId", router?.query?.candidateId);
    formData.append("DocumentName", documentType as any);
    for (const key in files) {
      formData.append("FileObjectList", files[key], files[key]?.name);
    }
    const uploadDocume = await dispatch(uploadDocument(formData));
    let error = await ErrorHandler(uploadDocume, setSnackBar);

    if (error) {
      setFullPageLoader(false);
      setSnackBar("success", uploadDocume?.payload?.message);
      setLoading(false);
      const body = `?CandidateId=${router?.query?.candidateId} `;
      {
        router?.query?.candidateId &&
          dispatch(getCandidateUploadedDocument(body));
      }
    } else {
      setFullPageLoader(false);
      setLoading(false);
    }
  };
  const deleteDocument = async (e: any) => {
    setFullPageLoader(true);
    console.log("e", e);
    const body = {
      candidateId: router?.query?.candidateId,
      documentId: documentId,
      uploadedFileName: e?.fileName,
    };
    let deleteDoc = await dispatch(deleteCandidateDocument(body));
    let error = await ErrorHandler(deleteDoc, setSnackBar);

    if (error) {
      setFullPageLoader(false);
      setSnackBar("success", deleteDoc?.payload?.message);
      setLoading(false);
      const body = `?CandidateId=${router?.query?.candidateId} `;
      {
        router?.query?.candidateId &&
          dispatch(getCandidateUploadedDocument(body));
      }
    } else {
      setLoading(false);
      setFullPageLoader(false);
    }
  };
  return (
    <Box marginTop={1}>
      <Typography fontSize={"18px"} fontWeight={600}>
        {documentType}
      </Typography>
      <DocumentPicker uploadedFiles={(e: any) => handleFile(e, documentType)} />
      {document?.file?.length !== 0 &&
        document?.file?.map((e: any,i:number) => {
          return (
            <Stack
            key={i}
              direction={"row"}
              border={"1px solid"}
              borderColor={(theme) => theme.palette.grey[300]}
              borderRadius={"5px"}
              marginTop={2}
              padding={3}
            >
              <FileCopyOutlined fontSize="large" color="disabled" />
              <Stack direction={"column"} marginLeft={2}>
                <Typography variant="subtitle1">{e.fileName}</Typography>
              </Stack>
              <DeleteOutlined
                onClick={() => deleteDocument(e)}
                fontSize="small"
                color="primary"
                sx={{ marginLeft: "auto" }}
              />
            </Stack>
          );
        })}
    </Box>
  );
};
