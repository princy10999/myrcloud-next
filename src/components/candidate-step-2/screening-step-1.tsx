import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import ButtonText from "@components/Layout/ButtonText";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconWrapper } from "@components/common/customSvgIcon";
import { useDispatch } from "react-redux";
import { updateScreeningQuestion } from "@redux/Redux/Actions/Client";
import { responseEnum } from "@lib/enum";
import { useAppSelector } from "@redux/Redux/app/hooks";
import StyledAccordian from "@components/common/styledAccordian";
import StyledAccordianDetails from "@components/common/styledAccordianDetail";
import StyledAccordianSummary from "@components/common/styledAccordianSummary";
import useSnackBar from "@redux/hooks/useSnackBar";
import ErrorHandler from "@lib/errorHandler";
import ButtonOutlined from "@components/Layout/ButtonOutlined";

export default function Screening({ editRequisitionData }: any) {
  //Hooks
  const dispatch = useDispatch();
  const { setSnackBar } = useSnackBar();

  //State
  const [checked, setChecked] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);
  const [data, setData] = React.useState<any>({});
  const [newInput, setNewInput] = React.useState<any>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<any>("");
  const [errorType, setErrorType] = React.useState<any>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [count, setCount] = React.useState<any>({});

  const requisitionData = useAppSelector(
    (state: any) => state?.client?.isGetCreateRequisition?.requistionData
  );

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const addNewQuestion = () => {
    if (isEdit) {
      newInput[index].question = data?.question;
    } else {
      setNewInput((s: any) => {
        return [
          ...s,
          {
            question: data?.question,
            isMandatory: false,
          },
        ];
      });
    }
    setData({ question: "" });
    setIsEdit(false);
  };
  const handleDelete = (id: any) => {
    const newList = newInput.filter((item: any) => item.question !== id);
    setNewInput(newList);
  };
  const handleEdit = (id: any, index: number) => {
    setData({
      ...data,
      question: id,
    });
    setIsEdit(true);
    setIndex(index);
  };
  const handleChecked = (e: any) => {
    newInput.forEach((element: any, index: number) => {
      if (e === index) {
        newInput[index].isMandatory = !newInput?.[index]?.isMandatory;
      }
    });
    setChecked(!checked);
  };

  const submitQuestion = async () => {
    try {
      setLoading(true);
      const body = {
        requisitionId: count?.requisitionId,
        questions: newInput,
      };
      const dispatchQuestion = await dispatch(updateScreeningQuestion(body));

      let error = await ErrorHandler(dispatchQuestion, setSnackBar);

      if (error) {
        setSnackBar("success", "Screening Questions update successfully.");
        setLoading(false);
      } else {
        setLoading(false);
      }

      setLoading(false);
    } catch (error) {
      setSnackBar("error", "Something went wrong !");
      setLoading(false);
    }
  };
  React.useEffect(() => {
    if (editRequisitionData) {
      setNewInput(editRequisitionData?.jd?.questions);
    }
  }, [editRequisitionData]);
  React.useEffect(() => {
    if (requisitionData) {
      setCount(requisitionData?.data);
    }
  }, [requisitionData]);
  React.useEffect(() => {
    if (editRequisitionData) {
      setCount(editRequisitionData);
    }
  }, [editRequisitionData]);

  return (
    <>
      <Box mb={1.5}>
        <StyledAccordian>
          <StyledAccordianSummary
            expandIcon={<IconWrapper fontSize="11px" icon="down" />}
            aria-controls="panel1a-content"
            id="panel1"
          >
            <Typography fontWeight={"inherit"}>Screening Questions</Typography>
          </StyledAccordianSummary>
          <StyledAccordianDetails>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={3}
              mt={1.5}
            >
              <Grid container spacing={3}>
                <Grid item md={12} xs={12} sm={12}>
                  <TextFieldComponent
                    type="text"
                    placeholder="Enter Your Question"
                    width="100%"
                    name="question"
                    value={data?.question}
                    onChange={handleChangeInput}
                  />
                </Grid>
              </Grid>
              <ButtonText
                width="200px"
                fontWeight={700}
                fontSize={"16px"}
                color={(theme: any) => theme.palette.primary.main}
                text={isEdit ? "Edit Question" : "Add Question"}
                onClick={addNewQuestion}
              />
            </Box>
            {newInput.map((item: any, i: any) => {
              return (
                item.question && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    marginTop="25px"
                  >
                    <Typography
                      fontWeight={400}
                      fontSize={"16px"}
                      color={(theme) => theme.palette.bgBlack.main}
                    >
                      Q.{i + 1} {item.question}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <FormGroup>
                        <FormControlLabel
                          label="Mandatory"
                          control={
                            <Checkbox
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<CheckCircleIcon />}
                              onChange={() => handleChecked(i)}
                            />
                          }
                        />
                      </FormGroup>
                      <Box
                        ml={2}
                        color={(theme) => theme.palette.bgGray.main}
                        alignItems="center"
                      >
                        <IconWrapper
                          fontSize="medium"
                          icon="edit"
                          color="inherit"
                          onClick={() => handleEdit(item.question, i)}
                        />
                      </Box>
                      <Box
                        ml={2}
                        color={(theme) => theme.palette.bgGray.main}
                        alignItems="center"
                      >
                        <IconWrapper
                          fontSize="medium"
                          icon="delete"
                          color="inherit"
                          onClick={() => handleDelete(item.question)}
                        />
                      </Box>
                    </Box>
                  </Box>
                )
              );
            })}
            <Box display="flex" justifyContent={"flex-end"} marginTop={5}>
              <ButtonOutlined
                text={"Save"}
                width="auto"
                height="35px"
                borderRadius={5}
                onClick={submitQuestion}
                loading={loading}
              />
            </Box>
          </StyledAccordianDetails>
        </StyledAccordian>
      </Box>
    </>
  );
}
