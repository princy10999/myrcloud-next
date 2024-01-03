import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import DropDownComponent from "@components/Layout/DropDownComponent";
import ButtonText from "@components/Layout/ButtonText";
import ButtonContained from "@components/Layout/ButtonContained";
import { useDispatch } from "react-redux";
import {
  getBanks,
  getCity,
  getCountry,
  getState,
} from "@redux/Redux/Actions/country";
import { useAppSelector } from "@redux/Redux/app/hooks";
import AutoCompleteSearch from "@components/Layout/CustomAutoCompleteDropDown";
import {
  UpdatePartnerComplianceInformationSelf,
  getPartnerComplianceInformationSelf,
} from "@redux/Redux/Actions/Partners";
import { useTheme } from "@mui/material";
import { IconWrapper } from "@components/common/customSvgIcon";
import Router from "next/router";
import localStoreUtil from "@redux/Api/localstore.util";
import ProfileSteper from "@components/common/profileSteper";
import useSnackBar from "@redux/hooks/useSnackBar";
import ErrorHandler from "@lib/errorHandler";
import ButtonOutlined from "@components/Layout/ButtonOutlined";

const regexPin = new RegExp("^[1-9][0-9]{5}$");
const aadharRegex = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
const placementFee = [10, 20, 30, 40];
const AboutPartnerForm2 = () => {
  //Hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const { setSnackBar } = useSnackBar();

  //State
  const [data, setData] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [partnerComplianceInfoData, setPartnerComplianceInfoData] =
    React.useState<any>({});
  const [errors, setError] = React.useState<any>({});
  const [errorForPincode, setErrorForPincode] = React.useState(false);

  // const handleChange = (event: any) => {
  //   setAge(event.target.value);
  // };

  const handleForm = (e: any) => {
    const { value, name } = e.target;
    if (name === "pincode" && value.length > 6) {
      return;
    }
    if (name === "aadhaarCardNumber" && value.length > 12) {
      return;
    }
    setData({ ...data, [name]: value });
  };
  const handleChange = async (e: any, newValue: any) => {
    const bbb = countryList?.filter((y: any) => y?.countryName === newValue);
    setData({ ...data, country: bbb[0]?.value });
  };
  const handleChangeState = async (e: any, newValue: any) => {
    if (newValue !== "Please select country") {
      const bbb = stateList?.filter((y: any) => y?.stateName === newValue);
      setData({ ...data, state: bbb[0]?.value });
    }
  };
  const handleChangeCity = async (e: any, newValue: any) => {
    if (newValue !== "Please select state") {
      const bbb = cityList?.filter((y: any) => y?.cityName === newValue);
      setData({ ...data, city: bbb[0]?.value });
    }
  };
  const handleChangeBank = async (e: any, newValue: any) => {
    const bbb = banksList?.filter((y: any) => y?.description === newValue);
    setData({
      ...data,
      bankName: bbb[0]?.description,
      bankId: bbb[0]?.id,
      bankCode: bbb[0]?.code,
    });
  };

  const countryList1 = useAppSelector(
    (state: any) => state?.auth?.IsCountrySet?.country?.data
  );
  const countryList = countryList1 || [];

  const banksList1 = useAppSelector(
    (state: any) => state?.auth?.IsBanksSet?.banks?.data
  );
  const banksList = banksList1 || [];

  const stateList1 = useAppSelector(
    (state: any) => state?.auth?.IsStateSet?.state?.data
  );

  const stateList = stateList1 || [];

  const cityList1 = useAppSelector(
    (state: any) => state?.auth?.IsCitySet?.city?.data
  );

  const cityList = cityList1 || [];
  const dummy1: any = [];
  countryList?.map((e: any) => dummy1.push(e?.countryName));

  const validateForm = () => {
    let errors: any = {};
    let formIsValid = true;
    if (!data?.addressLine1) {
      formIsValid = false;
      errors["addressLine1"] = "Please enter address line 1";
    }
    if (!data?.addressLine2) {
      formIsValid = false;
      errors["addressLine2"] = "Please enter address line 2";
    }
    if (!data?.city) {
      formIsValid = false;
      errors["city"] = "Please enter city";
    }
    if (!data?.pincode) {
      formIsValid = false;
      errors["pincode"] = "Please enter pincode";
    }
    if (data?.pincode && !regexPin.test(data?.pincode)) {
      formIsValid = false;
      errors["pincode1"] = "Please enter valid pincode";
    }
    if (!data?.state) {
      formIsValid = false;
      errors["state"] = "Please enter state";
    }
    if (!data?.country) {
      formIsValid = false;
      errors["country"] = "Please enter country";
    }
    if (!data?.msmeNumber) {
      formIsValid = false;
      errors["msmeNumber"] = "Please enter MEME number";
    }
    if (!data?.aadhaarCardNumber) {
      formIsValid = false;
      errors["aadhaarCardNumber"] = "Please enter aadhar card number";
    }
    if (data?.aadhaarCardNumber?.length !== 12) {
      formIsValid = false;
      errors["aadhaarCardNumber2"] = "Please enter correct aadhar card number";
    }
    // if (data?.aadhaarCardNumber && !aadharRegex.test(data?.aadhaarCardNumber)) {
    //   formIsValid = false;
    //   errors["aadhaarCardNumber1"] = "Please enter valid aadhar card number";
    // }
    // if (!data?.placementFee) {
    //   formIsValid = false;
    //   errors["placementFee"] = "Please enter placement fee";
    // }
    if (!data?.bankName) {
      formIsValid = false;
      errors["bankname"] = "Please enter bank name";
    }
    if (!data?.ifscCode) {
      formIsValid = false;
      errors["ifscCode"] = "Please enter IFSC code";
    }
    if (!data?.accountNumber) {
      formIsValid = false;
      errors["accountNumber"] = "Please enter name of account";
    }
    setError(errors);
    return formIsValid;
  };

  const step2 = async () => {
    if (validateForm()) {
      setLoading(true);
      const body = {
        address: {
          addressLine1: data?.addressLine1,
          addressLine2: data?.addressLine2,
          pincode: data?.pincode,
          city: data?.city,
          state: data?.state,
          country: data?.country,
        },
        business: {
          msmeNumber: data?.msmeNumber,
          aadhaarCardNumber: data?.aadhaarCardNumber,
          placementFee: data?.placementFee,
        },
        bank: {
          bankName: data?.bankName,
          bankId: data?.bankId,
          bankCode: data.bankCode,
          ifscCode: data?.ifscCode,
          accountNumber: data?.accountNumber,
        },
      };
      await dispatch(UpdatePartnerComplianceInformationSelf(body));
      await setLoading(false);
    }
  };
  const _getPartnerComplianceInformation = async () => {
    const _partnerComplianceInfo = await dispatch(
      getPartnerComplianceInformationSelf()
    );
    let _partnerComplianceInfoData = _partnerComplianceInfo?.payload?.data;
    _partnerComplianceInfoData = {
      ..._partnerComplianceInfoData?.address,
      ..._partnerComplianceInfoData?.bank,
      ..._partnerComplianceInfoData?.business,
    };
    _partnerComplianceInfoData.bankName = _partnerComplianceInfoData?.bankName;
    setData(_partnerComplianceInfoData || {});
  };
  useEffect(() => {
    dispatch(getCountry());
    dispatch(getBanks());
    _getPartnerComplianceInformation();
    localStoreUtil.store_data("isStep1", true);
  }, []);
  useEffect(() => {
    const body = `?CountryId=${data?.country?.id}`;
    {
      data?.country?.id && dispatch(getState(body));
    }
  }, [data?.country?.id]);
  useEffect(() => {
    const body = `?StateId=${data?.state?.stateId}`;
    {
      data?.state?.stateId && dispatch(getCity(body));
    }
  }, [data?.state?.stateId]);

  return (
    <>
      <Box p={2}>
        <ProfileSteper step={2} />
        <Typography fontSize="18px" fontWeight={600} mb={2} mt={2}>
          Address
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <TextFieldComponent
              text="Address line 1"
              type="text"
              // placeholder="Please enter address"
              width="100%"
              valid
              name="addressLine1"
              onChange={handleForm}
              labelSize={"14px"}
              value={data.addressLine1}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.addressLine1?.length > 0 ? "" : errors["addressLine1"]}
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <TextFieldComponent
              text="Address line 2 "
              type="text"
              // placeholder="Please enter address"
              width="100%"
              name="addressLine2"
              onChange={handleForm}
              labelSize={"14px"}
              value={data.addressLine2}
              valid
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.addressLine2?.length > 0 ? "" : errors["addressLine2"]}
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            {/* <AutoCompleteSearch
              text="City"
              width={"100%"}
              name="city"
              placeholder="Select city"
              handleChange={handleChangeCity}
              options={cityList && cityList?.map((e: any) => e?.cityName)}
              labelSize={"14px"}
              handleChangeInput={handleForm}
              valid
              defaultValue={data?.city}
            /> */}
            <TextFieldComponent
              text="Pin code"
              type="number"
              placeholder="Please enter pincode"
              width="100%"
              valid
              name="pincode"
              onChange={handleForm}
              labelSize={"14px"}
              value={data.pincode}
              inputProps={{ min: 1, maxLength: 6 }}
              onKeyDown={(event: any) => {
                if (event.code === "Minus" || event.code === "NumpadSubtract") {
                  event.preventDefault();
                }
              }}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.pincode?.length > 0 ? "" : errors["pincode"]}
            </Typography>
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {regexPin.test(data?.pincode) ? "" : errors["pincode1"]}
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <TextFieldComponent
              text="City"
              type="text"
              placeholder="Please enter city"
              width="100%"
              valid
              name="city"
              onChange={handleForm}
              labelSize={"14px"}
              value={data?.city}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.city?.length > 0 ? "" : errors["city"]}
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            {/* <AutoCompleteSearch
              text="State"
              width={"100%"}
              placeholder="Select state"
              name="state"
              handleChange={handleChangeState}
              options={stateList && stateList?.map((e: any) => e?.stateName)}
              labelSize={"14px"}
              handleChangeInput={handleForm}
              valid
              defaultValue={data?.state || ''}
            /> */}
            <TextFieldComponent
              text="Country"
              type="text"
              placeholder="Please enter state"
              width="100%"
              valid
              name="state"
              onChange={handleForm}
              labelSize={"14px"}
              value={data?.state}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.state?.length > 0 ? "" : errors["state"]}
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            {/* <AutoCompleteSearch
              text="Country"
              placeholder="Select country"
              width={"100%"}
              name="country"
              handleChange={handleChange}
              options={
                countryList && countryList?.map((e: any) => e?.countryName)
              }
              labelSize={"14px"}
              handleChangeInput={handleForm}
              valid
              defaultValue={data?.country}
            /> */}
            <TextFieldComponent
              text="Country"
              type="text"
              placeholder="Please enter country"
              width="100%"
              valid
              name="country"
              onChange={handleForm}
              labelSize={"14px"}
              value={data?.country}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.country?.length > 0 ? "" : errors["country"]}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography
            component={"p"}
            fontWeight={600}
            fontSize="18px"
            mr={1}
            mb={0.5}
          >
            Business Details
          </Typography>
          <Box display={"flex"} flexDirection={"row"} gap={1}>
            <IconWrapper
              fontSize="10px"
              icon="information"
              color={"disabled"}
            />
            <Typography component={"p"} fontSize="14px" color="#B6B6B6" mr={1}>
              {" "}
              Your business details will solely be used for verification.
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <TextFieldComponent
              text="MSME Number"
              type="number"
              placeholder=""
              width="100%"
              name="msmeNumber"
              onChange={handleForm}
              labelSize={"14px"}
              value={data.msmeNumber}
              inputProps={{ min: 1 }}
              onKeyDown={(event: any) => {
                if (event.code === "Minus" || event.code === "NumpadSubtract") {
                  event.preventDefault();
                }
              }}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.msmeNumber?.length > 0 ? "" : errors["msmeNumber"]}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextFieldComponent
              text="Aadhar card Number"
              type="number"
              placeholder=""
              width="100%"
              valid
              name="aadhaarCardNumber"
              onChange={handleForm}
              labelSize={"14px"}
              value={data.aadhaarCardNumber}
              inputProps={{ min: 1 }}
              onKeyDown={(event: any) => {
                if (event.code === "Minus" || event.code === "NumpadSubtract") {
                  event.preventDefault();
                }
              }}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.aadhaarCardNumber?.length > 0
                ? ""
                : errors["aadhaarCardNumber"]}
            </Typography>
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.aadhaarCardNumber?.length === 12
                ? ""
                : errors["aadhaarCardNumber2"]}
            </Typography>
            {/* <Typography variant="body2" textAlign={"start"} color={"error"}>
              {aadharRegex.test(data?.aadhaarCardNumber)
                ? ""
                : errors["aadhaarCardNumber1"]}
            </Typography> */}
          </Grid>
          {/* <Grid item md={6} xs={12}>
            <DropDownComponent
              text="Placement Fee"
              value={data?.placementFee}
              defaultValue={data?.placementFee}
              values={placementFee}
              width="100%"
              valid
              name="placementFee"
              onChange={handleForm}
              labelSize={"14px"}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.placementFee?.length > 0 ? "" : errors["placementFee"]}
            </Typography>
          </Grid> */}
        </Grid>
        <Box mt={2}>
          <Typography
            component={"p"}
            fontWeight={600}
            fontSize="18px"
            mr={1}
            mb={0.5}
          >
            Bank Details
          </Typography>

          <Box display={"flex"} flexDirection={"row"} gap={1}>
            <IconWrapper
              fontSize="10px"
              icon="information"
              color={"disabled"}
            />
            <Typography component={"p"} fontSize="14px" color="#B6B6B6" mr={1}>
              {" "}
              Your business Your business details will solely be used for
              verification.{" "}
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <TextFieldComponent
              text="Name of Account"
              type="text"
              placeholder=""
              width="100%"
              valid
              name="accountNumber"
              onChange={handleForm}
              labelSize={"14px"}
              value={data.accountNumber}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.accountNumber?.length > 0 ? "" : errors["accountNumber"]}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextFieldComponent
              text="IFSC Code"
              type="text"
              placeholder=""
              width="100%"
              valid
              name="ifscCode"
              onChange={handleForm}
              labelSize={"14px"}
              value={data.ifscCode}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.ifscCode?.length > 0 ? "" : errors["ifscCode"]}
            </Typography>
          </Grid>
          <Grid item md={12} xs={12} lg={12} mb={2}>
            <AutoCompleteSearch
              text="Bank Name"
              width={"100%"}
              name="bankName"
              placeholder="Please enter bank name"
              handleChange={handleChangeBank}
              options={banksList && banksList?.map((e: any) => e?.description)}
              labelSize={"14px"}
              defaultValue={data?.bankName}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.bankName?.length > 0 ? "" : errors["bankname"]}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        bgcolor={theme.palette.bgLightGray.main}
        width="100%"
        mt={0.5}
        position="sticky"
        bottom="0px"
      >
        <Box
          width="100%"
          bgcolor={theme.palette.bgLightGray.main}
          border-top="1px solid #DDDDDD"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
           <Box>
           <ButtonOutlined
              marginLeft="8px"
              height="auto"
              borderRadius="30px"
              width="150px"
              text="Previous"
              onClick={() => {
                Router.back();
              }}
            />
          <ButtonText
            text="Skip for now"
            width="128px"
            onClick={() => {
              Router.push("/partner");
            }}
          />
           </Box>
          <ButtonContained
            marginBottom="12px"
            marginTop="12px"
            borderRadius="30px"
            text="Next"
            marginRight="20px"
            width="15%"
            height="38px"
            loading={loading}
            onClick={step2}
          />
        </Box>
      </Box>
    </>
  );
};

export default AboutPartnerForm2;
