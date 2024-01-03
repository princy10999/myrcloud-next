import React from "react";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  Box,
  Stack,
  useTheme,
  FormGroup,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateCandidateAddress } from "@redux/Redux/Actions/Candidate";
import { useRouter } from "next/router";
import useSnackBar from "@redux/hooks/useSnackBar";
import ErrorHandler from "@lib/errorHandler";
import ButtonOutlined from "@components/Layout/ButtonOutlined";

const Address = ({ getCandidateAdditionalDetailsData }: any) => {
  //Hooks
  const dispatch = useDispatch();
  const router: any = useRouter();
  const theme = useTheme();
  const { setSnackBar } = useSnackBar();

  //State
  const [errors, setError] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>({
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });

  //Handler
  const validateStep1 = () => {
    let errors: any = {};
    let formIsValid = true;

    if (!data?.address) {
      formIsValid = false;
      errors["address"] = "* Please enter address";
    }
    if (!data?.pincode) {
      formIsValid = false;
      errors["pincode"] = "* Please enter pincode";
    }
    if (!data?.city) {
      formIsValid = false;
      errors["city"] = "* Please enter city";
    }
    if (!data?.state) {
      formIsValid = false;
      errors["state"] = "* Please enter state";
    }
    if (!data?.country) {
      formIsValid = false;
      errors["country"] = "* Please enter country";
    }
    if (!data?.sameAsPresent) {
      if (!data?.perAddress) {
        formIsValid = false;
        errors["perAddress"] = "* Please enter address";
      }
      if (!data?.perPinCode) {
        formIsValid = false;
        errors["perPinCode"] = "* Please enter pincode";
      }
      if (!data?.perCity) {
        formIsValid = false;
        errors["perCity"] = "* Please enter city";
      }
      if (!data?.perState) {
        formIsValid = false;
        errors["perState"] = "* Please enter state";
      }
      if (!data?.perCountry) {
        formIsValid = false;
        errors["perCountry"] = "* Please enter country";
      }
    }

    setError(errors);

    return formIsValid;
  };
  console.log("log", data);
  const handleChangeInput = (e: any) => {
    const { name, value, checked } = e.target;
    if (name === "sameAsPresent") {
      setData({
        ...data,
        [name]: checked,
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };
  const saveExperience = async () => {
    try {
      setLoading(true);

      if (validateStep1()) {
        const body = {
          presentAddress: {
            address: data?.address,
            pinCode: data?.pincode,
            city: data?.city,
            state: data?.state,
            country: data?.country,
          },
          permanentAddress: {
            address: data?.perAddress,
            pinCode: data?.perPinCode,
            city: data?.perCity,
            state: data?.perState,
            country: data?.perCountry,
            sameAsPresent: data?.sameAsPresent,
          },
          candidateId: router?.query?.candidateId,
        };
        let response = await dispatch(updateCandidateAddress(body));
        let error = await ErrorHandler(response, setSnackBar);

        if (error) {
          setSnackBar("success", response?.payload?.message);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      setSnackBar("error", "Something went wrong!!");
      setLoading(false);
    }
    setLoading(false);
  };
  React.useEffect(() => {
    setData({
      address:
        getCandidateAdditionalDetailsData?.address?.presentAddress?.address,
      city: getCandidateAdditionalDetailsData?.address?.presentAddress?.city,
      country:
        getCandidateAdditionalDetailsData?.address?.presentAddress?.country,
      state: getCandidateAdditionalDetailsData?.address?.presentAddress?.state,
      pinCode:
        getCandidateAdditionalDetailsData?.address?.presentAddress?.pinCode,
      perAddress:
        getCandidateAdditionalDetailsData?.address?.permanentAddress?.address,
      perCountry:
        getCandidateAdditionalDetailsData?.address?.permanentAddress?.country,
      perState:
        getCandidateAdditionalDetailsData?.address?.permanentAddress?.state,
      perCity:
        getCandidateAdditionalDetailsData?.address?.permanentAddress?.city,
      perPinCode:
        getCandidateAdditionalDetailsData?.address?.permanentAddress?.pinCode,
    });
  }, [getCandidateAdditionalDetailsData]);
  return (
    <Box>
      <Stack direction={"column"}>
        <Typography fontSize={"18px"} fontWeight={600}>
          Present Address
        </Typography>
        <Grid container spacing={3}>
          <Grid item md={8} xs={6} sm={6}>
            <TextFieldComponent
              type="text"
              text="Address"
              width="100%"
              name="address"
              value={data?.address}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
              onChange={handleChangeInput}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.address?.length > 0 ? "" : errors["address"]}
            </Typography>
          </Grid>
          <Grid item md={4} xs={6} sm={6}>
            <TextFieldComponent
              type="number"
              text="Pin code"
              width="100%"
              name="pincode"
              value={data?.pincode}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
              valid
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.pincode?.length > 0 ? "" : errors["pincode"]}
            </Typography>
          </Grid>
          <Grid item md={4} xs={6} sm={6}>
            <TextFieldComponent
              type="text"
              text="City"
              width="100%"
              name="city"
              value={data?.city}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
              valid
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.city?.length > 0 ? "" : errors["city"]}
            </Typography>
          </Grid>
          <Grid item md={4} xs={6} sm={6}>
            <TextFieldComponent
              type="text"
              text="State"
              width="100%"
              name="state"
              value={data?.state}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
              valid
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.state?.length > 0 ? "" : errors["state"]}
            </Typography>
          </Grid>
          <Grid item md={4} xs={6} sm={6}>
            <TextFieldComponent
              type="text"
              text="Country"
              width="100%"
              name="country"
              value={data?.country}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
              valid
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.country?.length > 0 ? "" : errors["country"]}
            </Typography>
          </Grid>
        </Grid>
      </Stack>
      <Stack direction={"column"} marginTop={4}>
        <Box display={"flex"} justifyContent="space-between">
          <Typography fontSize={"18px"} fontWeight={600}>
            Permanent Address
          </Typography>
          <Typography fontSize={"14px"} fontWeight={400}>
            <FormGroup>
              <FormControlLabel
                label="Same as present address"
                control={
                  <Checkbox name="sameAsPresent" onChange={handleChangeInput} />
                }
              />
            </FormGroup>
          </Typography>
        </Box>
        {!data?.sameAsPresent && (
          <Grid container spacing={3}>
            <Grid item md={8} xs={6} sm={6}>
              <TextFieldComponent
                type="text"
                text="Address"
                width="100%"
                name="perAddress"
                value={data?.perAddress}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
                onChange={handleChangeInput}
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.perAddress?.length > 0 ? "" : errors["perAddress"]}
              </Typography>
            </Grid>
            <Grid item md={4} xs={6} sm={6}>
              <TextFieldComponent
                type="number"
                text="Pin code"
                width="100%"
                name="perPinCode"
                value={data?.perPinCode}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
                valid
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.perPinCode?.length > 0 ? "" : errors["perPinCode"]}
              </Typography>
            </Grid>
            <Grid item md={4} xs={6} sm={6}>
              <TextFieldComponent
                type="text"
                text="City"
                width="100%"
                name="perCity"
                value={data?.perCity}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
                valid
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.perCity?.length > 0 ? "" : errors["perCity"]}
              </Typography>
            </Grid>
            <Grid item md={4} xs={6} sm={6}>
              <TextFieldComponent
                type="text"
                text="State"
                width="100%"
                name="perState"
                value={data?.perState}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
                valid
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.perState?.length > 0 ? "" : errors["perState"]}
              </Typography>
            </Grid>
            <Grid item md={4} xs={6} sm={6}>
              <TextFieldComponent
                type="text"
                text="Country"
                width="100%"
                name="perCountry"
                value={data?.perCountry}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
                valid
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.perCountry?.length > 0 ? "" : errors["perCountry"]}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Stack>
      <Stack direction={"row-reverse"} mt={2}>
        <ButtonOutlined
          text={"Save"}
          width="auto"
          height="35px"
          onClick={saveExperience}
          borderRadius={5}
          loading={loading}
        />
      </Stack>
    </Box>
  );
};

export default Address;
