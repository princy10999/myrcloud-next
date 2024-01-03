import React from "react";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import Accordion from "@mui/material/Accordion";
import Divider from "@mui/material/Divider";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import { IconWrapper } from "@components/common/customSvgIcon";
import ButtonText from "@components/Layout/ButtonText";
import { useDispatch } from "react-redux";
import { UpdateCompensation } from "@redux/Redux/Actions/Client";
import { NumericFormat } from "react-number-format";
import { responseEnum } from "@lib/enum";
import { useAppSelector } from "@redux/Redux/app/hooks";
import StyledAccordian from "@components/common/styledAccordian";
import StyledAccordianSummary from "@components/common/styledAccordianSummary";
import StyledAccordianDetails from "@components/common/styledAccordianDetail";
import { numDifferentiation } from "@lib/calculateCTC";
import useSnackBar from "@redux/hooks/useSnackBar";
import ErrorHandler from "@lib/errorHandler";
import ButtonOutlined from "@components/Layout/ButtonOutlined";

export default function Compensation({ editRequisitionData }: any) {
  //Hooks
  const dispatch = useDispatch();
  const { setSnackBar } = useSnackBar();

  //State
  const [currency, setCurrency] = React.useState(0);
  const [minValue, setMinValue] = React.useState<any>("");
  const [maxValue, setMaxValue] = React.useState<any>("");
  const [data, setData] = React.useState<any>({});
  const [errors, setError] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const handleChange = (event: any) => {
    setCurrency(event.target.value);
  };
  const requisitionData = useAppSelector(
    (state: any) => state?.client?.isGetCreateRequisition?.requistionData
  );
  const handleAccordion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      if (data?.requisitionId) {
        setExpanded(newExpanded ? panel : false);
      }
    };
  const validateForm = () => {
    let errors: any = {};
    let formIsValid = true;
    if (minValue?.length === 0) {
      formIsValid = false;
      errors["min"] = "Please enter min value";
    }
    if (maxValue?.length === 0) {
      formIsValid = false;
      errors["max"] = "Please enter max value";
    }
    if (
      parseInt(maxValue.replaceAll(",", "")) <=
      parseInt(minValue.replaceAll(",", ""))
    ) {
      formIsValid = false;
      errors["max2"] = "Please enter correct max value";
    }
    setError(errors);
    return formIsValid;
  };
  const CreateRequisition = async () => {
    if (validateForm()) {
      setLoading(true);
      const body = {
        requisitionId: data?.requisitionId,
        minamount: parseInt(minValue.replaceAll(",", "")),
        maxAmount: parseInt(maxValue.replaceAll(",", "")),
        currencyType: currency === 0 ? "INR" : "USD",
        currencySymbol: currency === 0 ? "₹" : "$",
      };
      const updateCompensation = await dispatch(UpdateCompensation(body));
      let error = await ErrorHandler(updateCompensation, setSnackBar);

      if (error) {
        setSnackBar("success", "Compensation budget update successfully.");
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    setLoading(false);
  };
  React.useEffect(() => {
    if (requisitionData) {
      setData(requisitionData?.data);
    }
  }, [requisitionData]);
  React.useEffect(() => {
    if (editRequisitionData) {
      setData(editRequisitionData);
      setMaxValue(
        JSON.stringify(editRequisitionData?.jd?.compensation?.minSalary)
      );
      setMinValue(
        JSON.stringify(editRequisitionData?.jd?.compensation?.maxSalary)
      );
    }
  }, [editRequisitionData]);
  return (
    <>
      <Box marginBottom={1.5}>
        <StyledAccordian
          expanded={expanded === "panel14"}
          onChange={handleAccordion("panel14")}
        >
          <StyledAccordianSummary
            expandIcon={<IconWrapper fontSize="11px" icon="down" />}
            aria-controls="panel1a-content"
            id="panel14"
          >
            <Typography fontWeight={"inherit"}>Compensation</Typography>
          </StyledAccordianSummary>
          <StyledAccordianDetails>
            <Typography
              fontWeight={400}
              marginTop={2}
              mb={1}
              fontSize={"14px"}
              color={(theme) => theme.palette.bgGray.main}
            >
              Set your compensation budget *
            </Typography>
            <Box display="flex">
              <Typography
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                gap={"10px"}
              >
                <Box>
                  <Select
                    value={currency}
                    onChange={handleChange}
                    style={{ width: "80px" }}
                  >
                    <MenuItem value={0}>INR</MenuItem>
                    <MenuItem value={1}>USD</MenuItem>
                  </Select>
                </Box>
                <Box>
                  <NumericFormat
                    type="text"
                    value={minValue}
                    thousandsGroupStyle="lakh"
                    thousandSeparator=","
                    customInput={TextField}
                    onValueChange={(values, sourceInfo) => {
                      setMinValue(values.formattedValue);
                    }}
                    name="min"
                  />
                  <Typography
                    variant="body2"
                    textAlign={"start"}
                    color={"error"}
                    position="absolute"
                  >
                    {minValue?.length > 0 ? "" : errors["min"]}
                  </Typography>
                  {minValue && maxValue && (
                    <Typography
                      variant="body2"
                      textAlign={"start"}
                      color={"error"}
                      position="absolute"
                    >
                      {parseInt(maxValue?.replaceAll(",", "")) >=
                      parseInt(minValue?.replaceAll(",", ""))
                        ? ""
                        : errors["max2"]}
                    </Typography>
                  )}
                </Box>
                -
                <Box>
                  <NumericFormat
                    type="text"
                    value={maxValue}
                    thousandsGroupStyle="lakh"
                    thousandSeparator=","
                    customInput={TextField}
                    onValueChange={async (values, sourceInfo) => {
                      setMaxValue(values.formattedValue);
                    }}
                    name="max"
                  />
                  <Typography
                    variant="body2"
                    textAlign={"start"}
                    color={"error"}
                    position="absolute"
                  >
                    {maxValue?.length > 0 ? "" : errors["max"]}
                  </Typography>
                </Box>
              </Typography>
              <Box
                sx={{
                  marginLeft: "20px",
                  textAlign: "center",
                  height: "100%",
                  width: "287px",
                  borderRadius: "10px",
                  padding: "20px",
                  backgroundColor: "#FFBE5E",
                }}
              >
                <Typography>Salary Range</Typography>
                <Typography fontSize="22px" fontWeight={600}>
                  {numDifferentiation(minValue?.replaceAll(",", ""), currency)}{" "}
                  -{" "}
                  {numDifferentiation(maxValue?.replaceAll(",", ""), currency)}
                </Typography>
              </Box>
            </Box>
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
