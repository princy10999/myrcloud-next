import React from "react";
import { Typography, Box, Grid, Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import { makeStyles } from "tss-react/mui";
import { stateToHTML } from "draft-js-export-html";
import { convertFromHTML, ContentState, convertToRaw } from "draft-js";

const MUIRichTextEditor = dynamic(() => import("mui-rte"), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => (
    <>
      <Skeleton variant="text" sx={{ width: "15%" }} />
      <Skeleton
        variant="rectangular"
        sx={{ width: "100%", marginBottom: 3 }}
        height={100}
      />
    </>
  ),
});

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
    },
    editor: {
      height: "100px",
      maxHeight: "200px",
      overflowY: "auto",
      overflowX: "hidden",
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    editorContainer: {
      margin: `${theme.spacing(1)} 0px 0px ${theme.spacing(1)} !important`,
    },
    anchorLink: {
      color: "blue",
      textDecoration: "underline",
    },
  };
});
export default function TextEditor({
  value,
  handleChange,
  category,
  readOnly,
  inlineToolbar,
  onChange,
  defaultValue,
}: any) {
  const { classes } = useStyles();
  const [content, setContent] = React.useState("");

  React.useEffect(() => {
    if (defaultValue) {
      const contentHTML = convertFromHTML(defaultValue);
      const state = ContentState.createFromBlockArray(
        contentHTML.contentBlocks,
        contentHTML.entityMap
      );
      setContent(JSON.stringify(convertToRaw(state)));
    }
  }, [defaultValue]);
  return (
    <>
      <Box mb={2} mt={2}>
        <Typography
          fontSize={14}
          fontWeight={400}
          color={(theme) => theme.palette.bgGray.main}
        >
          {category}
        </Typography>
        <MUIRichTextEditor
          controls={[
            "title",
            "bold",
            "italic",
            //"header-one",
            "bulletList",
            "numberList",
            //"link",
            "dropdown",
          ]}
          customControls={[
            {
              name: "header-one",
              icon: <InvertColorsIcon />,
              type: "callback",
              onClick: (_editorState: any, name: any, _anchor: any) => {
                console.log(`Clicked ${name} control`);
              },
            },
          ]}
          value={value}
          defaultValue={content}
          onChange={async (event: any) => {
            let value = await stateToHTML(event.getCurrentContent());
            onChange(value);
          }}
          label="Type something here..."
          inlineToolbar={inlineToolbar || false}
          // readOnly={readOnly || false}
          classes={{
            root: classes.root,
            editor: classes.editor,
            anchorLink: classes.anchorLink,
            editorContainer: classes.editorContainer,
          }}
        />
      </Box>
    </>
  );
}
