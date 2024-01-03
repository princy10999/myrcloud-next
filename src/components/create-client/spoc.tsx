import { IconWrapper } from "@components/common/customSvgIcon";
import PaperContainer from "@components/common/paperContainer";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import localStoreUtil from "@redux/Api/localstore.util";
import { updateSpoc } from "@redux/Redux/Actions/ClientCreation";
import { useAppSelector } from "@redux/Redux/app/hooks";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function SopcInformation({
  handleLoading,
  handleNext,
  isSubmitStep,
}: any) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const clientId = useAppSelector(
    (state: any) => state?.rcloud?.isCreateClient?.createClientData?.clientId
  );
  const clientDetails = useAppSelector(
    (state: any) => state?.rcloud?.isCreateClient?.createClientData
  );
  const [errors, setError] = React.useState<any>({});
  const [data, setData] = React.useState<any>({
    secondaryName: "",
    secondaryDesignation: "",
    secondaryEmail: "",
    secondaryCellNo: "",
    secondaryRemarks: "",
    keyPersonName: "",
    keyPersonDesignation: "",
    keyPersonEmail: "",
    keyPersoncellNo: "",
    keyPersonRemarks: "",
    financeName: "",
    financeDesignation: "",
    financeEmail: "",
    financeCellNo: "",
    financeRemarks: "",
  });

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const validate = () => {
    let isFormValid = true;
    let errors: any = {};
    if (
      data?.secondaryDesignation ||
      data?.secondaryEmail ||
      data?.secondaryCellNo ||
      data?.secondaryRemarks
    ) {
      if (data?.secondaryName.length <= 0) {
        isFormValid = false;
        errors["secondaryName"] = "Please enter a name";
      }
    }
    if (
      data?.keyPersonDesignation ||
      data?.keyPersonEmail ||
      data?.keyPersoncellNo ||
      data?.keyPersonRemarks
    ) {
      if (data?.keyPersonName.length <= 0) {
        isFormValid = false;
        errors["keyPersonName"] = "Please enter a name";
      }
    }
    if (
      data?.financeDesignation ||
      data?.financeEmail ||
      data?.financeCellNo ||
      data?.financeRemarks
    ) {
      if (data?.financeName.length <= 0) {
        isFormValid = false;
        errors["financeName"] = "Please enter a name";
      }
    }
    setError(errors)
    return isFormValid;
  };

  useEffect(() => {
    if (clientDetails) {
      setData({
        secondaryName:
          clientDetails?.spokePersons?.secondaryContact?.name || "",
        secondaryDesignation:
          clientDetails?.spokePersons?.secondaryContact?.designation || "",
        secondaryEmail:
          clientDetails?.spokePersons?.secondaryContact?.officialEmailId || "",
        secondaryCellNo:
          clientDetails?.spokePersons?.secondaryContact?.mobileNumber || "",
        secondaryRemarks:
          clientDetails?.spokePersons?.secondaryContact?.remarks || "",
        keyPersonName:
          clientDetails?.spokePersons?.keyDecisionMaker?.name || "",
        keyPersonDesignation:
          clientDetails?.spokePersons?.keyDecisionMaker?.designation || "",
        keyPersonEmail:
          clientDetails?.spokePersons?.keyDecisionMaker?.officialEmailId || "",
        keyPersoncellNo:
          clientDetails?.spokePersons?.keyDecisionMaker?.mobileNumber || "",
        keyPersonRemarks:
          clientDetails?.spokePersons?.keyDecisionMaker?.remarks || "",
        financeName: clientDetails?.spokePersons?.financeContact?.name || "",
        financeDesignation:
          clientDetails?.spokePersons?.financeContact?.designation || "",
        financeEmail:
          clientDetails?.spokePersons?.financeContact?.officialEmailId || "",
        financeCellNo:
          clientDetails?.spokePersons?.financeContact?.mobileNumber || "",
        financeRemarks:
          clientDetails?.spokePersons?.financeContact?.remarks || "",
      });
    }
  }, [clientDetails]);

  useEffect(() => {
    if (isSubmitStep > 0) {
      if (validate()) {
        handleSubmit();
      }
    }
  }, [isSubmitStep]);

  const handleSubmit = async () => {
    handleLoading();
    const body = {
      clientId: clientId,
      secondaryContact: {
        name: data?.secondaryName,
        designation: data?.secondaryDesignation,
        officialEmailId: data?.secondaryEmail,
        mobileNumber: data?.secondaryCellNo,
        remarks: data?.secondaryRemarks,
      },
      keyDecisionMaker: {
        name: data?.keyPersonName,
        designation: data?.keyPersonDesignation,
        officialEmailId: data?.keyPersonEmail,
        mobileNumber: data?.keyPersoncellNo,
        remarks: data?.keyPersonRemarks,
      },
      financeContact: {
        name: data?.financeName,
        designation: data?.financeDesignation,
        officialEmailId: data?.financeEmail,
        mobileNumber: data?.financeCellNo,
        remarks: data?.financeRemarks,
      },
    };
    await dispatch(updateSpoc(body));
    handleNext();
  };

  return (
    <>
      <Box marginBottom="11px">
        <PaperContainer>
          <Typography
            variant={"h5"}
            color={(theme) => theme.palette.bgBlack.main}
            fontWeight={700}
            fontSize={"24px"}
            mb={1}
          >
            SPOC Information
          </Typography>
          <Box display="flex" color={(theme) => theme.palette.bgGray.main}>
            <IconWrapper fontSize="small" icon="information" />
            <Typography
              fontSize={14}
              fontWeight={400}
              marginLeft={"8px"}
              marginBottom={"15px"}
              color={(theme) => theme.palette.bgGray.main}
            >
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequa
            </Typography>
          </Box>
          <Box mt={2} mb={2}>
            <Typography
              variant={"h5"}
              color={(theme) => theme.palette.bgBlack.main}
              fontWeight={500}
              fontSize={"18px"}
            >
              Secondary Contact
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Contact Person Name"
                width="100%"
                // defaultValue="Prateek"
                name="secondaryName"
                value={data?.secondaryName}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.secondaryName?.length > 0 ? "" : errors["secondaryName"]}
              </Typography>
            </Grid>
            
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Designation"
                width="100%"
                name="secondaryDesignation"
                value={data?.secondaryDesignation}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Official Email ID"
                width="100%"
                name="secondaryEmail"
                value={data?.secondaryEmail}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Cell Number"
                width="100%"
                name="secondaryCellNo"
                value={data?.secondaryCellNo}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Remarks"
                width="100%"
                name="secondaryRemarks"
                value={data?.secondaryRemarks}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
          </Grid>
          <Box mt={3} mb={2}>
            <Typography
              variant={"h5"}
              color={(theme) => theme.palette.bgBlack.main}
              fontWeight={500}
              fontSize={"18px"}
            >
              Key Decision Maker
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Contact Person Name"
                width="100%"
                name="keyPersonName"
                value={data?.keyPersonName}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
               <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.keyPersonName?.length > 0 ? "" : errors["keyPersonName"]}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Designation"
                width="100%"
                name="keyPersonDesignation"
                value={data?.keyPersonDesignation}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
                onChange={handleChangeInput}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Official Email ID"
                width="100%"
                name="keyPersonEmail"
                value={data?.keyPersonEmail}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Cell Number"
                width="100%"
                name="keyPersoncellNo"
                value={data?.keyPersoncellNo}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Remarks"
                width="100%"
                name="keyPersonRemarks"
                value={data?.keyPersonRemarks}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            {/* <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Platform Fee per position"
                width="100%"
                name="platform"
                value={data?.platform}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid> */}
          </Grid>

          <Box mt={3} mb={2}>
            <Typography
              variant={"h5"}
              color={(theme) => theme.palette.bgBlack.main}
              fontWeight={500}
              fontSize={"18px"}
            >
              Finance Person
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Contact Person Name"
                width="100%"
                name="financeName"
                value={data?.financeName}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.financeName?.length > 0 ? "" : errors["financeName"]}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Designation"
                width="100%"
                name="financeDesignation"
                value={data?.financeDesignation}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Official Email ID"
                width="100%"
                name="financeEmail"
                value={data?.financeEmail}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Cell Number"
                width="100%"
                name="financeCellNo"
                value={data?.financeCellNo}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Remarks"
                width="100%"
                name="financeRemarks"
                value={data?.financeRemarks}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
          </Grid>
        </PaperContainer>
      </Box>
    </>
  );
}
