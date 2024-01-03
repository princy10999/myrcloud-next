import { IconWrapper } from "@components/common/customSvgIcon";
import DocPreview from "@components/common/docPreview";
import DocumentPicker from "@components/common/documentPicker";
import CommonComponentProps from "@customTypes/commonComponentProps";
import { getFileIcon } from "@lib/getFileIconName";
import { FileCopyOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  clientDetailById,
  uploadClientDocument,
} from "@redux/Redux/Actions/ClientCreation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

type DocumentComponentProps = CommonComponentProps & {
  documentType?: string;
  document?: File;
  docId?: Int8Array;
  clientId: string;
  mandatory: boolean;
  showPicker?: boolean;
};
export default function DocumentComponent({
  documentType,
  document,
  docId,
  clientId,
  mandatory,
  showPicker,
}: DocumentComponentProps) {
  const [doc, setDoc] = React.useState<any>([]);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [currIndex, setCurrIndex] = React.useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("here");
    setOpen(false);
  };
  useEffect(() => {
    if (document) {
      setDoc(document);
    }
  }, []);

  const handleFile = async (files: any, e: any) => {
    setDoc([...files]);
    var formData = new FormData();
    formData.append("DocumentId", docId as any);
    formData.append("ClientId", clientId);
    for (const key in files) {
      formData.append("FileObjectList", files[key], files[key]?.name);
    }
    const uploadedDocumet = await dispatch(uploadClientDocument(formData));
    if (uploadedDocumet?.payload.code === 1) {
      const body = `?ClientId=${clientId}`;
      await dispatch(clientDetailById(body));
      // setOpen(true);
      // setToastMessage(uploadDocume?.payload.message);
      // setErrorType("success");
      // setLoading(false);
    } else if (uploadedDocumet?.payload?.code === 0) {
      // setOpen(true);
      // setToastMessage(uploadDocume?.payload.message);
      // setErrorType("error");
      // setLoading(false);
    }
  };

  const deleteDocument = async () => {
    setDoc([]);
    var formData = new FormData();
    formData.append("DocumentId", docId as any);
    formData.append("ClientId", clientId);
    formData.append("FileObjectList", "");
    const uploadedDocumet = await dispatch(uploadClientDocument(formData));
    if (uploadedDocumet?.payload.code === 1) {
      const body = `?ClientId=${clientId}`;
      await dispatch(clientDetailById(body));

      // setOpen(true);
      // setToastMessage(uploadDocume?.payload.message);
      // setErrorType("success");
      // setLoading(false);
    } else if (uploadedDocumet?.payload?.code === 0) {
      // setOpen(true);
      // setToastMessage(uploadDocume?.payload.message);
      // setErrorType("error");
      // setLoading(false);
    }
  };

  return (
    <Box marginTop={1}>
      <Stack direction={"row"}>
        <Typography fontSize={"18px"} fontWeight={600}>
          {documentType}
        </Typography>
        {mandatory && (
          <Typography
            color={(theme) => theme.palette.error.main}
            fontSize={"18px"}
            fontWeight={600}
            ml={1}
          >
            *
          </Typography>
        )}
      </Stack>
      {showPicker ? <DocumentPicker uploadedFiles={handleFile} /> : ""}

      {doc && doc.length > 0 ? (
        doc.map((item: File | any, index: any) => {
          return (
            <Stack
              key={index}
              direction={"row"}
              border={"1px solid"}
              borderColor={(theme) => theme.palette.grey[300]}
              borderRadius={"5px"}
              marginTop={2}
              padding={3}
              sx={{
                  cursor:showPicker ? "auto" : "pointer"
              }}
              onClick={() => {
                if (!showPicker) {
                  handleClickOpen();
                }
              }}
            >
              <FileCopyOutlined fontSize="large" color="disabled" />
              <Stack direction={"column"} marginLeft={2}>
                <Typography variant="subtitle1">
                  {item.name || item.fileName}
                </Typography>
                <Typography variant="caption" color={"textSecondary"}>
                  {item.size / (1024 * 1024) || ""}
                </Typography>
              </Stack>
              {/* <DeleteOutlined
                    fontSize="small"
                    color="primary"
                    sx={{ marginLeft: "auto" }}
                  /> */}
            </Stack>
          );
        })
      ) : showPicker ? (
        ""
      ) : (
        <Typography variant="caption" justifyContent={"center"}>
          No Documents Uploaded for this section
        </Typography>
      )}
      {showPicker ? (
        <Stack>
          <Button
            style={{ marginLeft: "auto" }}
            onClick={() => {
              deleteDocument();
            }}
          >
            Remove all
          </Button>
        </Stack>
      ) : (
        ""
      )}
      {open && (
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
          <DialogTitle>
            {documentType}
            <IconButton sx={{ float: "right" }} onClick={handleClose}>
              <IconWrapper
                color="primary"
                style={{ fontSize: "medium" }}
                icon="wrong"
              />
            </IconButton>
          </DialogTitle>
          <DocPreview
            link={doc[currIndex].fileUrl}
            iconName={getFileIcon({ fileName: doc[currIndex].fileName })}
            octateFile={false}
          ></DocPreview>
          {doc && doc.length > 1 ? (
            <DialogActions>
              <Button
                autoFocus
                disabled={currIndex == 0 ? true : false}
                onClick={() => {
                  setCurrIndex((val) => val - 1);
                }}
              >
                Previous
              </Button>
              <Button
                disabled={currIndex == doc.length - 1 ? true : false}
                onClick={() => {
                  setCurrIndex((val) => val + 1);
                }}
                autoFocus
              >
                Next
              </Button>
            </DialogActions>
          ) : (
            ""
          )}
        </Dialog>
      )}
    </Box>
  );
}
