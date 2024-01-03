import { IconWrapper } from "@components/common/customSvgIcon";
import PaperContainer from "@components/common/paperContainer";
import DropDownComponent from "@components/Layout/DropDownComponent";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import {
  Autocomplete,
  Box,
  Grid,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  createClient,
  updateBasicDetails,
} from "@redux/Redux/Actions/ClientCreation";
import { getIndustryPreferenceList } from "@redux/Redux/Actions/Partners";
import { useAppSelector } from "@redux/Redux/app/hooks";
import { setDate } from "date-fns";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function PrimaryInformation({
  handleLoading,
  isSubmitStep,
  handleNext,
}: any) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [errors, setError] = React.useState<any>({});
  const [industryList, setIndustryList] = React.useState<any[]>([]);
  const [data, setData] = React.useState<any>({
    code: "",
    name: "",
    legal: "",
    address: "",
    pinCode: "",
    city: "",
    state: "",
    country: "",
    pName: "",
    designation: "",
    email: "",
    cNo: "",
    remark: "",
    website: "",
    gstNo: "",
    industry: "",
    subSector: "",
    linkedin:"",
  });
  var emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var mobNumber = /^[1-9]{1}[0-9]{9}$/;
  const clientDetails = useAppSelector(
    (state: any) => state?.rcloud?.isCreateClient?.createClientData
  );
  const clientId = useAppSelector(
    (state: any) => state?.rcloud?.isCreateClient?.createClientData?.clientId
  );
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const validateStep = () => {
    let errors: any = {};
    let formIsValid = true;

    if (!data?.name) {
      formIsValid = false;
      errors["name"] = "* Please Enter Client Name";
    }
    if (data?.cNo.length > 0 && data?.cNo.length != 10) {
      formIsValid = false;
      errors["cNo"] = "Mobile Number should be 10 digits";
    }
    console.log(data?.email.match(emailRegex));
    if (data?.email.length > 0 && data?.email.match(emailRegex)) {
      formIsValid = false;
      errors["email"] = "Please Enter a vaild email";
    }
    
    setError(errors);
    return formIsValid;
  };

  useEffect(() => {
    getIndustryList({ PageIndex: 1, PageSize: 10 });
  }, []);

  useEffect(() => {
    if (clientDetails) {
      setData({
        code: "",
        name: clientDetails?.clientName || "",
        legal: clientDetails?.legalName || "",
        address: clientDetails?.address?.addressLine1 || "",
        pinCode: clientDetails?.address?.pincode || "",
        city: clientDetails?.address?.city || "",
        state: clientDetails?.address?.state || "",
        country: clientDetails?.address?.country || "",
        pName: clientDetails?.spokePersons?.primaryContact?.name || "",
        designation:
          clientDetails?.spokePersons?.primaryContact?.designation || "",
        email:
          clientDetails?.spokePersons?.primaryContact?.officialEmailId || "",
        cNo: clientDetails?.spokePersons?.primaryContact?.mobileNumber || "",
        remark: clientDetails?.spokePersons?.primaryContact?.remarks || "",
        website: clientDetails?.social?.webSite || "",
        gstNo: clientDetails?.gstNumber || "",
        industry: clientDetails?.clientIndustry || "",
        subSector: "",
        linkedin: clientDetails?.social?.linkedInUrl || "",
      });
    }
  }, [clientDetails]);

  useEffect(() => {
    if (isSubmitStep > 0) {
      handleSubmit();
    }
  }, [isSubmitStep]);

  const handleSubmit = async () => {
    if (validateStep()) {
      handleLoading();
      if (!clientId) {
        const body = {
          clientName: data?.name,
          address: {
            addressLine1: data?.address,
            addressLine2: "",
            pincode: data?.pinCode,
            city: data?.city,
            state: data?.state,
            country: data?.country,
          },
          social: {
            webSite: data?.website,
            linkedInUrl: data?.linkedin,
          },
          legalEntity: data?.legal,
          primaryContact: {
            name: data?.pName,
            designation: data?.designation,
            officialEmailId: data?.email,
            mobileNumber: data?.cNo,
            remarks: data?.remark,
          },
          gstNumber: data?.gstNo,
          clientIndustry: {
            id: data?.industry?.id,
            code: data?.industry?.code,
            value: data?.industry?.description,
          },
        };
        await dispatch(createClient(body));
        handleNext();
      } else {
        const body = {
          clientName: data?.name,
          address: {
            addressLine1: data?.address,
            addressLine2: "",
            pincode: data?.pinCode,
            city: data?.city,
            state: data?.state,
            country: data?.country,
          },
          social: {
            webSite: data?.website,
            linkedInUrl: data?.linkedin,
          },
          legalEntity: data?.legal,
          primaryContact: {
            name: data?.pName,
            designation: data?.designation,
            officialEmailId: data?.email,
            mobileNumber: data?.cNo,
            remarks: data?.remark,
          },
          gstNumber: data?.gstNo,
          clientIndustry: {
            id: data?.industry?.id,
            code: data?.industry?.code,
            value: data?.industry?.description,
          },
          clientId: clientId,
        };
        await dispatch(updateBasicDetails(body));
        handleNext();
      }
    }
  };
  const getIndustryList = async ({ PageIndex, PageSize, SearchText }: any) => {
    const body = SearchText
      ? `?PageIndex=${PageIndex}&PageSize=${PageSize}&SearchText=${SearchText}`
      : `?PageIndex=${PageIndex}&PageSize=${PageSize}`;
    const industry = await dispatch(getIndustryPreferenceList(body));
    const industryPreference: any = industry?.payload?.data;
    setIndustryList(industryPreference);
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
            Primary Information
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
            {/* <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Client Code"
                width="100%"
                defaultValue="348"
                name="code"
                value={data?.code}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
                valid
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.code?.length > 0 ? "" : errors["code"]}
              </Typography>
            </Grid> */}
            <Grid item md={8} xs={12} sm={12}>
              <TextFieldComponent
                type="text"
                text="Client Name"
                width="100%"
                name="name"
                // defaultValue="Eversource "
                valid
                value={data?.name}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.name?.length > 0 ? "" : errors["name"]}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Legal Entity"
                width="100%"
                // defaultValue="Eversource Capital"
                name="legal"
                value={data?.legal}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={8} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Address"
                width="100%"
                name="address"
                // defaultValue ="1201-1202, Quantum Towers, Rambaug Lane, Malad West"
                value={data?.address}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="PIN Code"
                // defaultValue="400064"
                width="100%"
                name="pinCode"
                value={data?.pinCode}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="City"
                // defaultValue="Mumbai"
                width="100%"
                name="city"
                value={data?.city}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="State"
                // defaultValue="Maharashtra"
                width="100%"
                name="state"
                value={data?.state}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Country"
                // defaultValue="India"
                width="100%"
                name="country"
                value={data?.country}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Contact Person Name"
                // defaultValue="Prashant"
                width="100%"
                name="pName"
                value={data?.pName}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Designation"
                // defaultValue="Sr. MAnager"
                width="100%"
                name="designation"
                value={data?.designation}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Official Email Id"
                // defaultValue="prashant@zinghr.com"
                width="100%"
                name="email"
                value={data?.email}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
               <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.email?.length <= 0 ? "" : errors["email"]}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Mobile Number"
                // defaultValue="+91 78 94561232"
                width="100%"
                name="cNo"
                value={data?.cNo}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
               <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.cNo?.length <= 0 ? "" : errors["cNo"]}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Remarks"
                width="100%"
                name="remark"
                value={data?.remark}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Website URL "
                // defaultValue="https://www.zinghr.com/"
                width="100%"
                name="website"
                value={data?.website}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="Linkedin URL"
                // defaultValue="18AABCU9603R1ZM"
                width="100%"
                name="linkedin"
                value={data?.linkedin}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <TextFieldComponent
                type="text"
                text="GST Number"
                // defaultValue="18AABCU9603R1ZM"
                width="100%"
                name="gstNo"
                value={data?.gstNo}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              {/* <DropDownComponent
                width="100%"
                text="Client Industry"
                values={industryList}
                name="industry"
                value={data?.industry}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              /> */}
              <Box
                mt={1.5}
                mb={1}
                display="flex"
                fontSize="12px"
                flexDirection={"row"}
              >
                <InputLabel
                  sx={{
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "textSecondary",
                  }}
                >
                  Client Industry
                </InputLabel>
              </Box>
              <Autocomplete
                disablePortal
                options={industryList || []}
                onChange={(e, newVal) => {
                  setData({
                    ...data,
                    industry: newVal,
                  });
                }}
                getOptionLabel={(option) => option.description}
                fullWidth
                ListboxProps={{
                  style: {
                    maxHeight: "180px",
                    border: "1px solid white",
                  },
                }}
                isOptionEqualToValue={(option, value) =>
                  option.code === value.code
                }
                renderInput={(params: any) => (
                  <TextField
                    className="searchInput"
                    {...params}
                    placeholder={"Select"}
                    onChange={(event) => {
                      if (event.currentTarget.value.length >= 3) {
                        getIndustryList({
                          PageIndex: 1,
                          PageSize: 10,
                          SearchText: event.currentTarget.value,
                        });
                      } else if (event.currentTarget.value.length == 0) {
                        getIndustryList({
                          PageIndex: 1,
                          PageSize: 10,
                        });
                      }
                    }}
                  />
                )}
              ></Autocomplete>
            </Grid>
            {/* <Grid item md={4} xs={12} sm={6}>
              <DropDownComponent
                width="100%"
                text="Sub Sector"
                values={subSector}
                name="subSector"
                value={data?.subSector}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
              />
            </Grid> */}
          </Grid>
        </PaperContainer>
      </Box>
    </>
  );
}
