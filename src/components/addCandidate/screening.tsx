import PaperContainer from "@components/common/paperContainer";
import StyledAccordian from "@components/common/styledAccordian";
import StyledAccordianDetails from "@components/common/styledAccordianDetail";
import StyledAccordianSummary from "@components/common/styledAccordianSummary";
import CommonComponentProps from "@customTypes/commonComponentProps";
import { styled } from "@mui/material/styles";
import { ExpandMore, InfoOutlined, SaveOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  Typography,
  TextField,
  Rating,
  Stack,
} from "@mui/material";
import React from "react";
import TextEditor from "@components/common/TextEditor";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/Redux/app/hooks";
import {
  getCandidateAdditionalDetails,
  getCandidateUpdateAdditionalDetails,
} from "@redux/Redux/Actions/Candidate";
import { useRouter } from "next/router";
import ButtonText from "@components/Layout/ButtonText";
import ToastMessage from "@components/common/ToastMessage";
import useSnackBar from "@redux/hooks/useSnackBar";
import ErrorHandler from "@lib/errorHandler";
import ButtonOutlined from "@components/Layout/ButtonOutlined";

const CustomRating = styled(Rating)(({ theme }) => ({
  color: theme.palette.warning.main,
  borderColor: theme.palette.warning.main,
  "& .MuiRating-iconFilled": {
    color: theme.palette.warning.main,
    borderColor: theme.palette.warning.main,
  },
  "& .MuiRating-iconHover": {
    color: theme.palette.warning.main,
    borderColor: theme.palette.warning.main,
  },
}));

export default function Screening({ onClick }: any) {
  //Hooks
  const router = useRouter();
  const dispatch = useDispatch();
  const { setSnackBar } = useSnackBar();

  //State
  const [errors, setError] = React.useState<any>({});
  const [question, setQuestion] = React.useState<any>([]);
  const [rating, setRating] = React.useState<any>([
    {
      rating: "",
      ratingType: "Industry Relevance"
    },
    {
      rating: "",
      ratingType: "Role Relevance"
    },
    {
      rating: "",
      ratingType: "Communication Skills"
    },
    {
      rating: "",
      ratingType: "Mandatory Requisition Match"
    },
    {
      rating: "",
      ratingType: "Education Rating"
    }
  ]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [story, setStory] = React.useState<any>("");
  const [data, setData] = React.useState<any>({
    que1: "",
    que2: "",
    que3: "",
  });
  console.log("rating", rating);
  const count = rating.map((e: any) => e?.rating && JSON.parse(e?.rating));
  const avRating: any =
    count?.length > 0 && count.reduce((a: any, b: any) => a + b, 0) / 5;

  //Handler
  const handelrChange = (e: any) => {
    const { name, value } = e.target;
    if (rating?.filter((y: any) => y?.ratingType === name)?.length !== 0) {
      setRating(
        rating.map((x: any) =>
          x.ratingType === name ? { ...x, rating: value } : x
        )
      );
    } else {
      setRating([
        ...rating,
        {
          ratingType: name,
          rating: value,
        },
      ]);
    }
  };
  console.log("question", question);
  const handleChangeInput = (q: any, e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    const questionData: any = question?.map((x: any) =>
      x.question === q ? { ...x, answer: value } : x
    );
    setQuestion(questionData);
  };
  console.log("question", rating);

  const validateStep = () => {
    let errors: any = {};
    let formIsValid = true;
    question?.map((e: any) => {
      if (!e?.answer) {
        formIsValid = false;
        errors[`${e?.question}`] = "* Please enter ans";
      }
    })
    rating?.map((e: any) => {
      if (!e?.rating) {
        formIsValid = false;
        errors[`rating`] = "* Please select rating";
      }
    })
    setError(errors);
    return formIsValid;
  };
  const onEditorChange = async (event: any) => {
    setStory(event);
  };
  const getCandidateAdditionalDetailsData = useAppSelector(
    (state: any) =>
      state?.partner?.isGetCandidateAdditionalDetails
        ?.getCandidateAdditionalDetailsData?.data
  );

  const createCandidateData: any = useAppSelector((state: any) =>
    state?.partner?.isCreateCandidate?.createCandidateData?.data
      ? state?.partner?.isCreateCandidate?.createCandidateData?.data
      : state?.partner?.isCreateResume?.createCandidateData?.data
  );
  console.log("story", story);

  const saveQuestion = async () => {
    if (validateStep()) {
      setLoading(true);
      try {
        const body = {
          screeningQuestion: question,
          candidateRating: rating,
          overallRating: avRating,
          candidateStory: story,
          requisitionId: router?.query?.requisitionId,
          candidateId: router?.query?.candidateId,
        };
        let resumeInfo = await dispatch(
          getCandidateUpdateAdditionalDetails(body)
        );
        let error = await ErrorHandler(resumeInfo, setSnackBar);

        if (error) {
          setSnackBar("success", resumeInfo?.payload?.message);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setSnackBar("error", "Something went wrong!!");
        setLoading(false);
      }
    }
    setLoading(false);
  };
  React.useEffect(() => {
    const body = `?RequisitionId=${router?.query?.requisitionId}&CandidateId=${router?.query?.candidateId} `;
    {
      router?.query?.candidateId &&
        dispatch(getCandidateAdditionalDetails(body));
    }
  }, [createCandidateData]);
  React.useEffect(() => {
    setQuestion(getCandidateAdditionalDetailsData?.screeningQuestion);
  }, [getCandidateAdditionalDetailsData]);
  return (
    <Box>
      <StyledAccordian>
        <StyledAccordianSummary expandIcon={<ExpandMore />}>
          <Typography fontWeight={"inherit"}>Screening</Typography>
        </StyledAccordianSummary>
        <StyledAccordianDetails>
          <Box>
            <Grid container xs={12} spacing={3}>
              {getCandidateAdditionalDetailsData?.screeningQuestion?.map(
                (val: any, index: any) => {
                  return (
                    <Grid item xs={12} marginTop={1} key={index}>
                      <TextFieldComponent
                        fontWeight={700}
                        text={val?.question}
                        type="text"
                        width="100%"
                        name={"que1"}
                        value={data?.answer}
                        onChange={(e: any) =>
                          handleChangeInput(val?.question, e)
                        }
                        valid
                      />
                      <Typography
                        variant="body2"
                        textAlign={"start"}
                        color={"error"}
                      >
                        {val?.answer?.length > 0 ? "" : errors[`${val?.question}`]}
                      </Typography>
                    </Grid>
                  );
                }
              )}
            </Grid>
            <Stack direction="column" marginTop={3}>
              <Typography
                variant="subtitle1"
                fontSize={"18px"}
                fontWeight={"bold"}
              >
                Candidate Rating
              </Typography>
              <Grid container xs={12} marginTop={1}>
                {[
                  "Industry Relevance",
                  "Role Relevance",
                  "Communication Skills",
                  "Mandatory Requisition Match",
                  "Education Rating",
                ].map((item, i) => {
                  return (
                    <ParameterRating
                      key={i}
                      param={item}
                      name={item}
                      handelrChange={handelrChange}
                    />
                  );
                })}
              </Grid>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                marginTop={3}
              >
                <Typography
                  variant="subtitle1"
                  fontSize={"18px"}
                  fontWeight={"bold"}
                >
                  Overall Rating
                </Typography>
                <Rating value={avRating} readOnly />
              </Stack>
              <Typography
                variant="body2"
                textAlign={"start"}
                color={"error"}
              >
                {rating?.map((e: any) => e?.rating?.length) > 0 ? "" : errors["rating"]}
              </Typography>
              <Stack direction={"row-reverse"} mt={2}>
                {/* <ButtonText
            text={"Save as Draft"}
            width="auto"
            height="19px"
           
          /> */}
              </Stack>
            </Stack>
          </Box>
        </StyledAccordianDetails>
      </StyledAccordian>
      <PaperContainer>
        <Stack direction={"column"} marginTop={1}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography fontSize={"18px"} fontWeight={600}>
              Candidate Story
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            marginTop={1}
            marginBottom={2}
            alignItems={"center"}
          >
            <InfoOutlined color="disabled" fontSize="small" />
            <Typography
              variant="caption"
              color={"textSecondary"}
              marginLeft={"8px"}
            >
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequa
            </Typography>
          </Stack>
          <TextEditor
            // category={"candidate_Story"}
            onChange={(value: any) => onEditorChange(value)}
          // defaultValue={data?.jd?.rnR?.kraHtml}
          />
        </Stack>

        <Stack direction={"row-reverse"} mt={2}>
          <ButtonOutlined
            text={"Save"}
            width="auto"
            height="35px"
            onClick={saveQuestion}
            borderRadius={5}
            loading={loading}
          />
        </Stack>
      </PaperContainer>
    </Box>
  );
}

type ParameterRatingProps = CommonComponentProps & {
  param?: string;
  rating?: any;
  handelrChange?: any;
  name?: any;
  rate?: any;
};

export const ParameterRating = ({
  param,
  rating,
  handelrChange,
  name,
  rate,
}: ParameterRatingProps) => {
  return (
    <Grid item xs={8} marginTop={2}>
      <Stack direction={"row"} alignItems={"center"}>
        <Grid item md={4} xs={8}>
          <Typography variant="subtitle1" color={"textSecondary"}>
            {param}
          </Typography>
        </Grid>
        <Grid item md={4} xs={8}>
          <Rating
            value={rate}
            name={name}
            onChange={handelrChange}
            readOnly={rate ? true : false}
          />
        </Grid>
      </Stack>
    </Grid>
  );
};
