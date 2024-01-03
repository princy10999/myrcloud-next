import { converOctateToType } from "@lib/docPreviewHelpers";
import { Box } from "@mui/system";
import React from "react";

export default function DocPreview({
  link,
  iconName,
  octateFile,
}: {
  link: any;
  iconName: any;
  octateFile: boolean;
}) {
  const [convertedFile, setConvertedFile] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const isImage = ["png", "jpg"].includes(iconName);
  const isPdf = ["pdf"].includes(iconName);
  const isDoc = ["doc", "docx", "txt"].includes(iconName);
  console.log(iconName);
  React.useEffect(() => {
    if (isPdf && octateFile) {
      converOctateToType({ link: link, type: "application/pdf" }).then(
        (blob) => {
          var binaryData = [];
          binaryData.push(blob);
          setConvertedFile(
            window.URL.createObjectURL(
              new Blob(binaryData, { type: "application/zip" })
            )
          );
        }
      );
    }
  }, []);
  if (isImage)
    return (
      <Box>
        <img width="100%" style={{ pointerEvents: "none" }} src={link} />
      </Box>
    );
  else if (isPdf) {
    if (octateFile) {
      return (
        <Box>
          <iframe
            allowFullScreen
            width="100%"
            style={{ border: "none" }}
            height="400px"
            src={convertedFile}
          />
        </Box>
      );
      //   convertedFile ? (

      // <iframe
      //   allowFullScreen
      //   width="100%"
      //   style={{ border: "none" }}
      //   height="400px"
      //   src={convertedFile}
      // />
      //   ) : (
      //     <WidgetLoader />
      //   );
    } else {
      return (
        <Box>
          <iframe
            allowFullScreen
            width="100%"
            style={{ border: "none" }}
            height="400px"
            src={link}
          />
        </Box>
      );
    }
  } else if (isDoc) {
    return (
      <Box>
        <iframe
          allowFullScreen
          width="100%"
          style={{ border: "none" }}
          height="400px"
          src={`https://docs.google.com/viewer?embedded=true&url=${encodeURIComponent(
            link
          )}`}
        />
      </Box>
    );
  } else {
    return <Box>File Preview Not Supported</Box>;
  }
}
