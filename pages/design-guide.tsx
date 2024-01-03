import { Box, Button, Typography, Stack } from "@mui/material";
import React from "react";
import Link from "next/link";
import { NextPage } from "next";
import { useAlert } from "@blaumaus/react-alert";

import FullPageLayout from "@components/Layout/FullPageLayout";
import TextEditor from "@components/common/TextEditor";
import { IconWrapper } from "@components/common/customSvgIcon";
import CustomTooltip from "@components/common/customTooltip";
import PageTour, { PageTourHints } from "@components/common/pageTour";
import { buildFormData } from "@utils/formUtility";
import { serialize } from "object-to-formdata";
import AutoCompleteSearch from "@components/Layout/CustomAutoCompleteDropDown";
import { AppActions } from "@redux/Redux/CommonApp/appSlice";
import { useDispatch } from "react-redux";
import WidgetLoader from "@components/common/widgetLoader";
import useSnackBar from "@redux/hooks/useSnackBar";
import usePageLoader from "@redux/hooks/usePageLoader";
import { useConfirm } from "material-ui-confirm";
import ReadMoreLessHelper from "@components/common/readMoreLessHelper";
import DocPreview from "@components/common/docPreview";

type ButtonText = "Primary" | "Secondary";

const steps = [
  {
    element: "[data-intro='test-step1']",
    intro: "test 1",
    position: "right",
  },
  {
    element: "[data-intro='test-step2']",
    intro: "test 2",
  },
  {
    element: "[data-intro='test-step3']",
    intro: "test 3",
  },
];
const hints = [
  {
    element: "[data-intro='test-step1']",
    hint: "test 1",
  },
  {
    element: "[data-intro='test-step2']",
    hint: "test 2",
  },
];
export default function DesignGuide(props: any) {
  const dispatch = useDispatch();
  const confirmDialogue = useConfirm();
  const { setSnackBar } = useSnackBar();
  const setFullPageLoader = usePageLoader();
  const [enablePageTour, setEnablePageTour] = React.useState(false);
  //const alert = useAlert();
  const buttonText: ButtonText = "Primary";
  const obj = {
    name: "hemant",
    arr: [
      { key: "1", value: "a" },
      { key: "2", value: "b" },
    ],
    file: new Blob([JSON.stringify({ hello: "world" }, null, 2)], {
      type: "application/json",
    }),
  };
  const formData = serialize(obj);
  // for (var pair of formData.entries()) {
  //   console.log(pair[0], pair[1]);
  // }
  // console.log(formData);
  const htmlStr = "<p>fewff</p><b>feffwfef</b>";
  return (
    <FullPageLayout>
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "primary.900" : "primary",
          color: (theme) =>
            theme.palette.mode === "dark" ? "#fff" : "primary.900",
        }}
        mt={2}
      >
        <Typography variant="h4" gutterBottom>
          Design Guidelines
        </Typography>
        <Typography gutterBottom>Buttons</Typography>
        <Stack data-intro="test-step1" direction="row" spacing={1} mb={1}>
          <Button disableElevation color="primary" variant="contained">
            {buttonText}
          </Button>
          <Button color="primary" variant="outlined">
            Secondary
          </Button>
          <Link href={"/test"}>
            <a>Link</a>
          </Link>
        </Stack>
        <Typography gutterBottom>Alerts</Typography>
        <Stack data-intro="test-step2" direction="row" spacing={1} mb={1}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              //alert.show("Oh look, an alert!");
              setSnackBar("success", "Success Message");
            }}
          >
            Success Messages
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              //alert.show("Oh look, an alert!");
              setSnackBar(
                "error",
                "Error Message ewf f wef efwe ffe wfef ewf fefw f ffewf  ef ewf ewfe wf ewf ewf ewf few f lorem"
              );
            }}
          >
            Error Messages
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              //alert.show("Oh look, an alert!");
              setFullPageLoader(true);

              setTimeout(() => {
                setFullPageLoader(false);
              }, 3000);
            }}
          >
            Page Loader
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              confirmDialogue({
                description: "This action is permanent!",
              })
                .then(() => {
                  /* ... */
                })
                .catch(() => {
                  /* ... */
                });
            }}
          >
            Confirm Alert
          </Button>
        </Stack>
        <Typography gutterBottom>Widget Loader</Typography>
        <Box bgcolor={"#fff"} mb={2}>
          <WidgetLoader />
        </Box>
        <Typography gutterBottom>Text Editor</Typography>
        <Box width="100%">
          <TextEditor
            category={"Responsibilities"}
            onChange={() => {}}
            defaultValue={htmlStr}
          />
          <AutoCompleteSearch
            width={"90%"}
            placeholder={"Enter education qualification"}
            options={["d", "f", "w"]}
          />
        </Box>
        <Typography gutterBottom>Icons</Typography>
        <Box width="100%" data-intro="test-step3">
          <IconWrapper fontSize="small" icon="home" />
          <IconWrapper fontSize="small" icon="setting" />
        </Box>
        <Typography gutterBottom>Tooltips</Typography>
        <Box>
          <CustomTooltip title="test custom tooltip">
            <Typography component={"span"} gutterBottom>
              cutsom tooltip
            </Typography>
          </CustomTooltip>
        </Box>
        <Typography gutterBottom>Page Tour Test</Typography>
        <Box>
          <Button
            color="primary"
            onClick={(e) => {
              setEnablePageTour((t) => !t);
            }}
          >
            Start Page Tour
          </Button>
        </Box>
      </Box>
      <Typography gutterBottom>Simple Text Read More</Typography>
      <ReadMoreLessHelper>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dolor
        consequuntur magnam et consectetur maiores nemo eius veritatis, quas
        unde illum, minus minima molestiae debitis tenetur iusto rem quo1
      </ReadMoreLessHelper>

      <Typography mt={1} gutterBottom>
        Html Content Text Read More
      </Typography>

      <ReadMoreLessHelper htmlNode>
        <Box
          dangerouslySetInnerHTML={{
            __html:
              "<b>hey there </b><p>ewfewewf ewfew</p><p>ewfewewf ewfew</p>",
          }}
        />
      </ReadMoreLessHelper>
      <DocPreview
        link={
          "https://file-examples.com/storage/fe8c7eef0c6364f6c9504cc/2017/02/file-sample_100kB.doc"
        }
        iconName={"doc"}
        octateFile={false}
      ></DocPreview>
      <PageTour
        enabled={enablePageTour}
        steps={steps}
        initialStep={0}
        onExit={() => {}}
      />
      <PageTourHints enabled={true} hints={hints} />
    </FullPageLayout>
  );
}
export const getInitialProps = async () => {
  return {
    BASE_PATH: process.env.BASE_PATH,
    NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  };
};
