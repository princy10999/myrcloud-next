import React, { useEffect } from "react";
getCategoryList;
import { Box, Grid, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import ButtonOutlined from "@components/Layout/ButtonOutlined";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import RadioGroup from "@mui/material/RadioGroup";
import RadioButtonBox from "@components/Layout/RadioButtonBox";
import { IconWrapper } from "@components/common/customSvgIcon";
import ButtonText from "@components/Layout/ButtonText";
import {
  createCategory,
  getCategoryList,
  getQuizList,
  updateVideoResumeDetails,
} from "@redux/Redux/Actions/Client";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/Redux/app/hooks";
import AutoCompleteSearch from "@components/Layout/CustomAutoCompleteDropDown";
import { responseEnum } from "@lib/enum";
import StyledAccordian from "@components/common/styledAccordian";
import StyledAccordianSummary from "@components/common/styledAccordianSummary";
import StyledAccordianDetails from "@components/common/styledAccordianDetail";
import useSnackBar from "@redux/hooks/useSnackBar";
import ErrorHandler from "@lib/errorHandler";

export default function VideoResume({ editRequisitionData }: any) {
  //Hooks
  const dispatch = useDispatch();
  const { setSnackBar } = useSnackBar();

  //State
  const [count, setCount] = React.useState<any>("1");
  const [option, setOption] = React.useState<any>();
  const [list, setList] = React.useState<any>({});
  const [errors, setError] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [categoryName, setCategoryName] = React.useState<any>("");
  const [categoryId, setCategoryID] = React.useState<any>("");
  const [quizId, setQuizID] = React.useState<any>("");
  const [quizName, setQuizName] = React.useState<any>("");
  const [data, setData] = React.useState<any>({ question: "" });

  const requisitionData = useAppSelector(
    (state: any) => state?.client?.isGetCreateRequisition?.requistionData
  );
  const CategoryId = useAppSelector(
    (state: any) => state?.client?.isGetCategoryList?.categoryList?.data
  );
  const category =
    CategoryId?.length > 0 ? CategoryId?.map((e: any) => e?.categoryName) : [];
  const quiz = useAppSelector(
    (state: any) => state?.client?.isGetQuizList?.QuizList?.data
  );
  const quizname = quiz?.length > 0 ? quiz?.map((e: any) => e?.quizName) : [];

  const arr = [
    {
      label: data?.question,
    },
  ];
  const inputArr = [
    {
      id: 1,
      label: "Select Category",
    },
  ];
  const [newInput, setNewInput] = React.useState(inputArr);
  const [input, setInput] = React.useState<any>(arr);

  //Handler
  const handleCount = (e: any) => {
    setCount(e?.target?.value);
  };

  const handleChangeCategory = async (e: any, newValue: any) => {
    if (newValue) {
      let categoryID: any = CategoryId.filter(
        (val: any) => val?.categoryName === newValue
      );
      await dispatch(getQuizList(`?CategoryId=${categoryID[0]?.categoryId}`));
      setCategoryName(newValue);
      setCategoryID(categoryID[0]?.categoryId);
    } else {
      setCategoryName("");
    }
  };

  const handleChangeQuiz = (e: any, newValue: any) => {
    let quizID: any = quiz.filter((val: any) => val?.quizName === newValue);
    setQuizName(newValue);
    setQuizID(quizID[0]?.quizId);
  };
  const validateForm = () => {
    let errors: any = {};
    let formIsValid = true;
    if (count === "1") {
      if (categoryName?.length === 0) {
        formIsValid = false;
        errors["category"] = "Please select category";
      }
      if (quizName?.length === 0) {
        formIsValid = false;
        errors["quiz"] = "Please select quiz question";
      }
    }
    setError(errors);
    return formIsValid;
  };
  const CreateRequisition = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const body = {
          categoryId: categoryId,
          categoryName: categoryName,
          quizId: quizId,
          quizName: quizName,
          requisitionId: list?.requisitionId,
          isVideoResume: true,
        };
        const body1 = {
          requisitionId: list?.requisitionId,
          isVideoResume: false,
        };
        const updateVideoResume = await dispatch(
          updateVideoResumeDetails(count === "1" ? body : body1)
        );
        let error = await ErrorHandler(updateVideoResume, setSnackBar);

        if (error) {
          setSnackBar("success", "Video resume details update successfully.");
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log("error");
      }
    }
    setLoading(false);
  };
  const handleChangeOption = (e: any) => {
    const { id, value } = e.target;
    setOption(e.target.value);
  };
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const addNewQuestion = () => {
    setInput((s: any) => {
      return [
        ...s,
        {
          label: data?.question,
        },
      ];
    });
  };
  const handleDelete = (id: any) => {
    const newList = input.filter((item: any) => item.label !== id);
    setInput(newList);
  };
  const addNewDropdown = (index: number) => {
    let i = 0;
    if (newInput?.length < 2) {
      setNewInput((s: any) => {
        return [
          ...s,
          {
            label: `Select Quiz`,
          },
        ];
      });
    }
  };
  const handleAccordion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      if (list?.requisitionId) {
        setExpanded(newExpanded ? panel : false);
      }
    };

  React.useEffect(() => {
    if (requisitionData) {
      setList(requisitionData?.data);
    }
  }, [requisitionData]);
  React.useEffect(() => {
    (async () => {
      dispatch(getCategoryList(`?ClientId=${list?.jd?.client?.clientId}`));
    })();
  }, [list]);
  React.useEffect(() => {
    if (editRequisitionData) {
      setCategoryName(editRequisitionData?.jd?.jdQuizDtos?.categoryName);
      setCategoryID(editRequisitionData?.jd?.jdQuizDtos?.categoryId);
      setQuizName(editRequisitionData?.jd?.jdQuizDtos?.quiz?.quizName);
      setQuizID(
        editRequisitionData?.jd?.jdQuizDtos?.quiz?.questionBank[0]?.options?.[0]
          ?.optionId === 0
          ? "1"
          : "2"
      );
      setList(editRequisitionData);
    }
  }, [editRequisitionData]);
  return (
    <>
      <Box marginBottom={1.5}>
        <StyledAccordian
          expanded={expanded === "panel13"}
          onChange={handleAccordion("panel13")}
        >
          <StyledAccordianSummary
            expandIcon={<IconWrapper fontSize="11px" icon="down" />}
            aria-controls="panel1a-content"
            id="panel13"
          >
            <Typography fontWeight={"inherit"}>
              Video Resume Questions / Video JD
            </Typography>
          </StyledAccordianSummary>
          <StyledAccordianDetails>
            <Typography
              fontWeight={500}
              marginTop={2}
              mb={1}
              fontSize={18}
              color={(theme) => theme.palette.bgBlack.main}
            >
              Is Video Resume Required?
            </Typography>
            <Box display="flex" color={(theme) => theme.palette.bgGray.main}>
              <IconWrapper
                fontSize="small"
                icon="information"
                color="disabled"
              />
              <Typography
                marginLeft={"8px"}
                marginBottom={"30px"}
                color={(theme) => theme.palette.bgGray.main}
              >
                Please mention if you need the candidate to submit a video
                resume
              </Typography>
            </Box>
            <RadioGroup
              className="checkbox_signup"
              defaultValue="female"
              aria-labelledby="demo-customized-radios"
              name="customized-radios"
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <RadioButtonBox
                value={1}
                label="Yes"
                handleChange={handleCount}
                count={count}
                name="Yes"
                num={1}
                bg={true}
              />
              <RadioButtonBox
                value={2}
                label="No"
                handleChange={handleCount}
                count={count}
                name="No"
                num={2}
                bg={true}
              />
            </RadioGroup>
            {count === "1" && (
              <Grid container mb={2}>
                <Grid
                  item
                  md={6}
                  xs={12}
                  sm={12}
                  display={"flex"}
                  justifyContent={"stretch"}
                  flexDirection={"row"}
                >
                  <Box>
                    <AutoCompleteSearch
                      options={category}
                      handleChange={handleChangeCategory}
                      text={"Select Category"}
                      placeholder={"Enter category"}
                      width={{
                        md: "200px",
                        sm: "400px",
                        xs: "200px",
                        xl: "200px",
                      }}
                      defaultValue={categoryName || ""}
                    />
                    <Typography
                      variant="body2"
                      textAlign={"start"}
                      color={"error"}
                    >
                      {categoryName?.length > 0 ? "" : errors["category"]}
                    </Typography>
                  </Box>
                  {/* <Box
              color={(theme) => theme.palette.primary.main}
              mt={7}
              ml={1}
            >
              <IconWrapper
                fontSize="medium"
                icon="plus-symbol"
                color="primary"
                onClick={handleCount1}
              />
            </Box> */}
                  <Box
                    color={(theme) => theme.palette.primary.main}
                    mt={7}
                    ml={1}
                  >
                    <IconWrapper
                      fontSize="medium"
                      icon="edit"
                      color="primary"
                    />
                  </Box>
                </Grid>

                <Grid
                  item
                  md={6}
                  xs={12}
                  sm={12}
                  display={"flex"}
                  justifyContent={"stretch"}
                  flexDirection={"row"}
                >
                  <Box>
                    <AutoCompleteSearch
                      options={quizname}
                      handleChange={handleChangeQuiz}
                      text={"Select Quiz"}
                      placeholder={"Enter quiz"}
                      width={{
                        md: "200px",
                        sm: "400px",
                        xs: "200px",
                        xl: "200px",
                      }}
                      defaultValue={quizName || ""}
                    />
                    <Typography
                      variant="body2"
                      textAlign={"start"}
                      color={"error"}
                    >
                      {quizName?.length > 0 ? "" : errors["quiz"]}
                    </Typography>
                  </Box>
                  <Box
                    color={(theme) => theme.palette.primary.main}
                    mt={7}
                    ml={1}
                  >
                    <IconWrapper
                      fontSize="medium"
                      icon="plus-symbol"
                      color="primary"
                      // onClick={() => addNewDropdown()}
                    />
                  </Box>
                  <Box
                    color={(theme) => theme.palette.primary.main}
                    mt={7}
                    ml={1}
                  >
                    <IconWrapper
                      fontSize="medium"
                      icon="edit"
                      color="primary"
                    />
                  </Box>
                </Grid>
              </Grid>
            )}
            {/* <Divider />
            <Typography
              fontWeight={500}
              marginTop={2}
              mb={1}
              fontSize={18}
              color={(theme) => theme.palette.bgBlack.main}
            >
              Question Bank
            </Typography>
            <Grid container mb={2}>
              <Grid
                item
                md={4}
                xs={12}
                sm={12}
                sx={{ display: "flex", direction: "row" }}
              >
                <TextFieldComponent
                  width={{ md: "200px", sm: "400px", xs: "200px", xl: "200px" }}
                  text="Category Name"
                  valid
                />
                <Box
                  color={(theme) => theme.palette.primary.main}
                  mt={7}
                  ml={1}
                >
                  <IconWrapper
                    fontSize="medium"
                    icon="plus-symbol"
                    color="primary"
                  />
                </Box>
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
                sm={12}
                display={"flex"}
                justifyContent={"stretch"}
                flexDirection={"row"}
              >
                <DropDownComponent
                  width={{ md: "200px", sm: "400px", xs: "200px", xl: "200px" }}
                  text="Select Quiz"
                  values={category}
                  valid
                />
                <Box
                  color={(theme) => theme.palette.primary.main}
                  mt={7}
                  ml={1}
                >
                  <IconWrapper
                    fontSize="medium"
                    icon="plus-symbol"
                    color="primary"
                  />
                </Box>
                <Box
                  color={(theme) => theme.palette.primary.main}
                  mt={7}
                  ml={1}
                >
                  <IconWrapper fontSize="medium" icon="edit" color="primary" />
                </Box>
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
                sm={12}
                display={"flex"}
                justifyContent={"stretch"}
                flexDirection={"row"}
              >
                <DropDownComponent
                  width={{ md: "200px", sm: "400px", xs: "200px", xl: "200px" }}
                  text="Question Category"
                  values={queCategory}
                  onChange={handleChangeOption}
                />
                <Box
                  color={(theme) => theme.palette.primary.main}
                  mt={7}
                  ml={1}
                >
                  <IconWrapper
                    fontSize="medium"
                    icon="plus-symbol"
                    color="primary"
                  />
                </Box>
              </Grid>
            </Grid> */}
            {option === "Interactive Questions" && (
              <>
                {/* <Box display="flex" alignItems="center" gap={1}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item md={8} xs={12} sm={12}>
                      <TextFieldComponent
                        text="Question Text"
                        type="text"
                        placeholder="enter your question"
                        width="100%"
                        name="question"
                        value={data?.question?.value}
                        onChange={handleChangeInput}
                      />
                    </Grid>
                    <Box
                      mt={7}
                      color={(theme: any) => theme.palette.primary.main}
                    >
                      <AddIcon fontSize="large" onClick={addNewQuestion} />
                    </Box>
                  </Grid>
                </Box> */}
                {input.map((item: any, i: number) => {
                  return (
                    item.label && (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        marginTop="25px"
                      >
                        {/* <Typography
                          fontWeight={400}
                          fontSize={"16px"}
                          color={(theme) => theme.palette.bgBlack.main}
                        >
                          Q.{i} {item.label}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <FormGroup>
                            <FormControlLabel
                              label="Mandatory"
                              control={
                                <Checkbox
                                  icon={<RadioButtonUncheckedIcon />}
                                  checkedIcon={<CheckCircleIcon />}
                                />
                              }
                            />
                          </FormGroup>
                          <Box
                            marginLeft="15px"
                            color={(theme) => theme.palette.bgGray.main}
                          >
                            <ModeEditOutlinedIcon fontSize="medium" />
                          </Box>
                          <Box
                            marginLeft="15px"
                            color={(theme) => theme.palette.bgGray.main}
                          >
                            <DeleteIcon
                              fontSize="medium"
                              onClick={() => handleDelete(item.label)}
                            />
                          </Box>
                        </Box> */}
                      </Box>
                    )
                  );
                })}
              </>
            )}
            {option === "Objective Questions" && (
              <>
                {/* <Grid
                  item
                  md={4}
                  xs={12}
                  sm={12}
                  display={"flex"}
                  justifyContent={"stretch"}
                  flexDirection={"row"}
                  mb={2}
                >
                  <DropDownComponent
                    width={{
                      md: "200px",
                      sm: "400px",
                      xs: "200px",
                      xl: "200px",
                    }}
                    text="Question Type"
                    values={queType}
                  />
                </Grid>
                <Grid container gap={3} alignItems="center" display="flex">
                  <Grid item md={8} xs={12} sm={12}>
                    <TextFieldComponent
                      text="Question Text"
                      type="text"
                      placeholder="enter your question"
                      width="100%"
                      name="question"
                      value={data?.question?.value}
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Box mt={5} color={(theme) => theme.palette.bgGray.main}>
                    <AttachFileIcon fontSize="medium" />
                  </Box>
                  <Box mt={5}>
                    <FormGroup>
                      <FormControlLabel
                        label="Mandatory"
                        control={
                          <Checkbox
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                          />
                        }
                      />
                    </FormGroup>
                  </Box>
                </Grid>

                <Grid item md={8} xs={12} sm={12} mb={3}>
                  <Box display="flex" gap={1}>
                    <Typography
                      fontWeight={500}
                      marginTop={2}
                      mb={1}
                      fontSize={18}
                      color="rgba(0, 0, 0, 0.6)"
                    >
                      option
                    </Typography>
                  </Box>
                  <Box display="flex" gap={1} mb={2}>
                    <TextFieldComponent
                      type="text"
                      width="100%"
                      value="1850s"
                    />
                    <RadioButtonCheck
                      label="Correct"
                      value="1"
                      handleChange={handleCount1}
                      count={count1}
                      num={1}
                      bg={true}
                    />
                  </Box>
                  <Box display="flex" gap={1} mb={2}>
                    <TextFieldComponent
                      type="text"
                      width="100%"
                      value="1880s"
                    />
                    <RadioButtonCheck
                      label="Correct"
                      value="2"
                      handleChange={handleCount1}
                      count={count1}
                      num={2}
                      bg={true}
                    />
                  </Box>
                  <Box display="flex" gap={1} mb={2}>
                    <TextFieldComponent
                      type="text"
                      width="100%"
                      value="1930s"
                    />
                    <RadioButtonCheck
                      label="Correct"
                      value="3"
                      handleChange={handleCount1}
                      count={count1}
                      num={3}
                      bg={true}
                    />
                  </Box>
                  <Box display="flex" gap={1} mb={2}>
                    <TextFieldComponent
                      type="text"
                      width="100%"
                      value="1950s"
                    />
                    <RadioButtonCheck
                      label="Correct"
                      value="4"
                      handleChange={handleCount1}
                      count={count1}
                      num={4}
                      bg={true}
                    />
                  </Box>
                </Grid>
                <Divider />
                <Typography
                  fontWeight={500}
                  marginTop={2}
                  mb={1}
                  fontSize={18}
                  color={(theme) => theme.palette.bgBlack.main}
                >
                  Preview
                </Typography> */}
                {input.map((item: any, i: number) => {
                  return (
                    item.label && (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        marginTop="25px"
                      >
                        {/* <Typography
                          fontWeight={400}
                          fontSize={"16px"}
                          color={(theme) => theme.palette.bgBlack.main}
                        >
                          Q.{i} {item.label}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <FormGroup>
                            <FormControlLabel
                              label="Mandatory"
                              control={
                                <Checkbox
                                  icon={<RadioButtonUncheckedIcon />}
                                  checkedIcon={<CheckCircleIcon />}
                                />
                              }
                            />
                          </FormGroup>
                          <Box
                            marginLeft="15px"
                            color={(theme) => theme.palette.bgGray.main}
                          >
                            <ModeEditOutlinedIcon fontSize="medium" />
                          </Box>
                          <Box
                            marginLeft="15px"
                            color={(theme) => theme.palette.bgGray.main}
                          >
                            <DeleteIcon
                              fontSize="medium"
                              onClick={() => handleDelete(item.label)}
                            />
                          </Box>
                        </Box> */}
                      </Box>
                    )
                  );
                })}

                <Divider />
                <Typography
                  fontWeight={500}
                  marginTop={2}
                  mb={1}
                  fontSize={18}
                  color={(theme) => theme.palette.bgBlack.main}
                >
                  Passing Criteria
                </Typography>

                <Grid container mb={2} gap={2} justifyContent="space-between">
                  <Grid
                    item
                    md={4}
                    xs={12}
                    sm={12}
                    sx={{ display: "flex", direction: "row" }}
                  >
                    <TextFieldComponent
                      width="100%"
                      text="Randomize Non Mandatory Questions"
                    />
                  </Grid>
                  <Grid
                    item
                    md={3}
                    xs={12}
                    sm={12}
                    sx={{ display: "flex", direction: "row" }}
                  >
                    <TextFieldComponent
                      width="100%"
                      text="Mandatory Score Threshold"
                    />
                  </Grid>
                  <Grid
                    item
                    md={4}
                    xs={12}
                    sm={12}
                    sx={{ display: "flex", direction: "row" }}
                  >
                    <TextFieldComponent
                      width="100%"
                      text="Non Mandatory Score Threshold"
                    />
                  </Grid>
                </Grid>

                <Grid display="flex" justifyContent="flex-end" mt={2}>
                  <ButtonOutlined
                    width="auto"
                    borderRadius="50px"
                    text="Save Questions"
                    startIcon={<IconWrapper fontSize="medium" icon="save" />}
                  />
                </Grid>
              </>
            )}
            <Box display="flex" justifyContent={"flex-end"} marginTop={5}>
              <ButtonOutlined
                text={"Save"}
                width="auto"
                height="35px"
                borderRadius={5}
                onClick={CreateRequisition}
                loading={loading}
              />
            </Box>
          </StyledAccordianDetails>
        </StyledAccordian>
      </Box>
    </>
  );
}
