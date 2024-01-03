import React from "react";
import ProcessingButton from "@components/common/processingButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
export default function FileUploader({
  allowedMimeTypes,
  onsuccess,
  onerror,
  allowedExtensions,
  uploading,
  displayComponent,
  uploadIcon,
  id,
  childComponent,
}: any) {
  const handleFileChanges = ({ target }: any) => {
    const file = target.files[0];
    if (!file) {
      onerror("Please select valid file");
      return;
    }
    if (file.size == 0) {
      onerror("Selected file is empty. Please select correct file.");
      return;
    }
    if (!allowedMimeTypes.includes(file.type)) {
      onerror(
        `Selected file is invalid, select only ${
          allowedExtensions || "valid"
        } files.`
      );
      return;
    }
    onsuccess(file, target.files);
  };
  return (
    <label
      style={{
        cursor: "pointer",
        display: "inherit",
        alignItems: "inherit",
        justifyContent: "inherit",
      }}
      htmlFor={`raised-button-file_${id}`}
    >
      <input
        accept={allowedMimeTypes.join(", ")}
        style={{ display: "none" }}
        id={`raised-button-file_${id}`}
        type="file"
        onChange={handleFileChanges}
        onClick={(event) => {
          event.currentTarget.value = "";
        }}
      />
      {displayComponent ? (
        displayComponent
      ) : (
        <ProcessingButton
          processing={uploading}
          size="small"
          color="primary"
          startIcon={
            uploadIcon ? uploadIcon : <CloudUploadIcon fontSize="inherit" />
          }
          component="span"
          processingText={"Uploading..."}
        >
          {childComponent || "Upload"}
        </ProcessingButton>
      )}
    </label>
  );
}
