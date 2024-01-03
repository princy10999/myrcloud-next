import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
// @ts-ignore
// import ReactReadMoreReadLess from "react-read-more-read-less";
import CommonComponentProps from "@customTypes/commonComponentProps";
import { AnyArray } from "immer/dist/internal";

type ReadMoreLessHelperProps = CommonComponentProps & {
  htmlNode?: boolean;
  maxChars?: number;
  maxHeight?: number;
};
export default function ReadMoreLessHelper({
  htmlNode = false,
  maxChars = 200,
  maxHeight = 100,
  children,
}: ReadMoreLessHelperProps) {
  const [isReadMore, setIsReadMore] = React.useState(false);
  const [isHtmlOverflow, setIsHtmlOverflow] = React.useState(true);
  const [isOverFlowInit, setIsOverFlowInit] = React.useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const readMoreBtn = (
    <Typography
      {...(htmlNode && {
        style: { position: "absolute", left: 0, bottom: 0 },
      })}
      component={"span"}
      color="primary"
      sx={{ cursor: "pointer" }}
      onClick={toggleReadMore}
    >
      {!isReadMore ? "...read more" : " show less"}
    </Typography>
  );
  if (htmlNode) {
    return (
      <Box style={{ position: "relative" }} pb={3}>
        <Collapse
          in={isReadMore}
          collapsedSize={maxHeight}
          ref={(el: any) => {
            if (!isOverFlowInit && el) {
              if (
                el?.offsetHeight < el?.scrollHeight ||
                el?.offsetWidth < el?.scrollWidth
              ) {
                setIsOverFlowInit(true);
                setIsHtmlOverflow(true);
              } else {
                setIsHtmlOverflow(false);
              }
            }
          }}
        >
          {children}
        </Collapse>
        {isHtmlOverflow ? readMoreBtn : null}
      </Box>
    );
  }
  const text = (children as string) || "";

  return (
    <Box style={{ position: "relative" }}>
      {!isReadMore ? text?.slice(0, maxChars) : text}
      {text.length > maxChars ? readMoreBtn : null}
    </Box>
  );
}
