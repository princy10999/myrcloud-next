import { IconWrapper } from "@components/common/customSvgIcon";
import DatePickerCommon from "@components/common/DatePickerCommon";
import PaperContainer from "@components/common/paperContainer";
import DropDownComponent from "@components/Layout/DropDownComponent";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import localStoreUtil from "@redux/Api/localstore.util";
import { updateContractInfo } from "@redux/Redux/Actions/ClientCreation";
import { useAppSelector } from "@redux/Redux/app/hooks";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Contract({
  handleLoading,
  isSubmitStep,
  handleNext,
}: any) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [data, setData] = React.useState<any>({
    contractNumber: 0,
    contractDate: null,
    contractValidityPeriod: 0,
    contractRenewalDate: null,
    perPositionPlateformFee: 0,
    oneTimePlateformFee: 0,
    replacementPeriod: 0,
    creditPeriod: 0,
    paymentClearanceDays: 0,
  });
  const clientId = useAppSelector(
    (state: any) => state?.rcloud?.isCreateClient?.createClientData?.clientId
  );
  const clientDetails = useAppSelector(
    (state: any) => state?.rcloud?.isCreateClient?.createClientData
  );
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
const handleChangeContractDate = (e:any) => {
  setData({
    ...data,
    contractDate: e,
  });
}
const handleChangeContractRenewalDate = (e:any) => {
  setData({
    ...data,
    contractRenewalDate: e,
  });
}
const handleChangeContractValidityPeriod = (e:any) => {
  setData({
    ...data,
    contractValidityPeriod: e,
  });
}
  useEffect(() => {
    if (isSubmitStep > 0) {
      handleSubmit();
    }
  }, [isSubmitStep]);

  const handleSubmit = async () => {
    handleLoading();
    const body = {
      contractNumber: parseInt(data?.contractNumber),
      contractDate: data?.contractDate ? format(new Date(data?.contractDate), "yyyy-MM-dd") : null,
      contractValidityPeriod: parseInt(data?.contractValidityPeriod),
      contractRenewalDate: data?.contractRenewalDate ? format(new Date(data?.contractRenewalDate),"yyyy-MM-dd") : null,
      perPositionPlateformFee: parseInt(data?.perPositionPlateformFee),
      oneTimePlateformFee: parseInt(data?.oneTimePlateformFee),
      replacementPeriod: parseInt(data?.replacementPeriod),
      creditPeriod: parseInt(data?.creditPeriod),
      paymentClearanceDays: parseInt(data?.paymentClearanceDays),
      clientId: clientId,
    };
    await dispatch(updateContractInfo(body));
    handleNext();
  };

  useEffect(() => {
    if (clientDetails) {
      setData({
        contractNumber: clientDetails?.contract?.contractNumber || 0,
        contractDate: clientDetails?.contract?.contractDate || "",
        contractValidityPeriod:
          clientDetails?.contract?.contractValidityPeriod || 0,
        contractRenewalDate: clientDetails?.contract?.contractRenewalDate || "",
        perPositionPlateformFee:
          clientDetails?.contract?.perPositionPlateformFee || 0,
        oneTimePlateformFee: clientDetails?.contract?.oneTimePlateformFee || 0,
        replacementPeriod: clientDetails?.contract?.replacementPeriod || 0,
        creditPeriod: clientDetails?.contract?.creditPeriod || 0,
        paymentClearanceDays:
          clientDetails?.contract?.paymentClearanceDays || 0,
      });
    }
  }, [clientDetails]);

  const fy = ["1", "2", "3"];
  const year = ["2020", "2021", "2022"];
  const hiresLastYear = ["10", "49", "67", "90"];
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
            Contract Information
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

          <Grid container spacing={2}>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="number"
                text="Contract Number"
                width="100%"
                name="contractNumber"
                value={data?.contractNumber}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              {/* <TextFieldComponent
                type="date"
                text="Date of Contract"
                width="100%"
                name="contractDate"
                value={data?.contractDate}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              /> */}
              <DatePickerCommon
              inputLabel="Date of Contract"
                name="contractDate"
                value={data?.contractDate}
                onChange={handleChangeContractDate}
                 />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="number"
                text="Contract Validity period (Months)"
                width="100%"
                name="contractValidityPeriod"
                value={data?.contractValidityPeriod}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              {/* <TextFieldComponent
                type="date"
                text="Contract renewal Date"
                width="100%"
                name="contractRenewalDate"
                value={data?.contractRenewalDate}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              /> */}
              <DatePickerCommon
               inputLabel="Contract renewal Date"
               name="contractRenewalDate"
               value={data?.contractRenewalDate}
                onChange={handleChangeContractRenewalDate} />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="number"
                text="Platform Fee per position opened"
                width="100%"
                name="perPositionPlateformFee"
                value={data?.perPositionPlateformFee}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="number"
                text="Platform fee (One Time)"
                width="100%"
                name="oneTimePlateformFee"
                value={data?.oneTimePlateformFee}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="number"
                text="Replacement Period"
                width="100%"
                name="replacementPeriod"
                value={data?.replacementPeriod}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="number"
                text="Credit Period"
                width="100%"
                name="creditPeriod"
                value={data?.creditPeriod}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="number"
                text="Payment Clearance within "
                placeholder="Enter Days of Invoice submission"
                width="100%"
                name="paymentClearanceDays"
                value={data?.paymentClearanceDays}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
          </Grid>
          {/* <Box mt={2} mb={2}>
            <Typography
              variant={"h5"}
              color={(theme) => theme.palette.bgBlack.main}
              fontWeight={500}
              fontSize={"18px"}
            >
              Hiring Plans
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12} sm={6}>
              <DropDownComponent
                width="100%"
                text="FY"
                values={fy}
                name="fy"
                value={data?.fy}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="No Of Hires "
                width="100%"
                name="hiresNo"
                value={data?.hiresNo}
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
                name="hiringRemarks"
                value={data?.hiringRemarks}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
          </Grid>
          <Box mt={2} mb={2}>
            <Typography
              variant={"h5"}
              color={(theme) => theme.palette.bgBlack.main}
              fontWeight={500}
              fontSize={"18px"}
            >
              Last 3 years Hiring Pattern
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12} sm={6}>
              <DropDownComponent
                width="100%"
                text="Year"
                values={year}
                name="year"
                value={data?.year}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <DropDownComponent
                width="100%"
                text="No. Of hires"
                values={hiresLastYear}
                name="hiresLastYear"
                value={data?.hiresLastYear}
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
                name="lastYearRemarks"
                value={data?.lastYearRemarks}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
          </Grid> */}
        </PaperContainer>
      </Box>
    </>
  );
}
