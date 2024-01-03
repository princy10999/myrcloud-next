import React, { useState } from "react";
import StandardLayout from "@components/Layout/StandardLayout";
import FullPageLayout from "@components/Layout/FullPageLayout";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Rating,
  Avatar,
  Divider,
  useTheme,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import PaperContainer from "@components/common/paperContainer";
import Assets from "@components/common/image_container";
import { IconWrapper } from "@components/common/customSvgIcon";
import ButtonOutlined from "@components/Layout/ButtonOutlined";
import ButtonContained from "@components/Layout/ButtonContained";
import CustomDialog from "@components/common/CustomDialog";
import { DialogContent, IconButton } from "@mui/material";
import { HealthCheckBoxes } from ".";
import PieChartComponent from "@components/common/PieChartCommon";
import { makeStyles } from "tss-react/mui";
import CustomTooltip from "@components/common/customTooltip";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  getPartnerDetails,
  getPartnerDetailsById,
  getPartnerComplianceInformationSelf,
  getPartnerComplianceInformation,
  approvePartner,
  updatePartnerPlacementFeeByPsm,
} from "@redux/Redux/Actions/Partners";
import {
  getPartnerUploadedDocumentSelfPersona,
  getPartnerUploadedDocumentSelf,
  getPartnerUploadedDocument,
} from "@redux/Redux/Actions/Profile";
import { useDispatch } from "react-redux";
import FullWidthLoader from "@components/common/FullWidthLoader";
import Link from "next/link";
import { RecruiterType, PlacementFeeType } from "@lib/enum";
import { useRouter } from "next/router";
import { PartnerSubscriptionType } from "@lib/enum";
import stringAvatar from "@lib/stringAvatar";
import PartnerProfilePic from "@components/partner/partnerProfilePic";
import DocViewer from "react-doc-viewer";
import DocPreview from "@components/common/docPreview";
import { getFileIcon } from "@lib/getFileIconName";
import CustomeDrawerHeader from "@components/common/customDrawerHeader";
import CustomDrawer from "@components/common/CustomDrawer";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import ButtonText from "@components/Layout/ButtonText";
import { PlacementFeeForm } from "@components/auth/signupForm";
import useSnackBar from "@redux/hooks/useSnackBar";
import usePageLoader from "@redux/hooks/usePageLoader";
import { numDifferentiation } from "@lib/calculateCTC";

type ProfileProps = {
  profileData?: any;
  hiringInfo?: any;
  partnerComplianceInfoData?: any;
  partnerUploadedDocumentData?: any;
  profileLoading?: boolean;
  isVerify?: boolean;
  partnerId?: any;
  getPartnerDetails?: any;
};
export default function AgencyProfile({ menuCode }: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [profileLoading, setProfileLoading] = React.useState(true);
  const [profileData, setProfileData] = React.useState({});
  const [partnerComplianceInfoData, setPartnerComplianceInfoData] =
    React.useState({});
  const [hiringInfo, setHiringInfo] = React.useState<any>([]);
  const [partnerUploadedDocumentData, setPartnerUploadedDocumentData] =
    React.useState<any>([]);

  const isVerify = router.query.isVerify == "1";
  const partnerId = router.query.id;
  const _getPartnerDetails = async () => {
    setProfileLoading(true);
    const _partnerDetails = await dispatch(
      isVerify
        ? getPartnerDetailsById(`?partnerId=${partnerId}`)
        : getPartnerDetails()
    );
    const _partnerComplianceInfo = await dispatch(
      isVerify
        ? getPartnerComplianceInformation(`?partnerId=${partnerId}`)
        : getPartnerComplianceInformationSelf()
    );
    const _partnerUploadedDocumentSelf = await dispatch(
      isVerify
        ? getPartnerUploadedDocument(`?partnerId=${partnerId}`)
        : getPartnerUploadedDocumentSelfPersona()
    );
    const _profileData = _partnerDetails?.payload?.data;
    const _partnerComplianceInfoData = _partnerComplianceInfo?.payload?.data;
    const _partnerUploadedDocumentData =
      _partnerUploadedDocumentSelf?.payload?.data;

    setProfileData(_profileData || {});
    setPartnerComplianceInfoData(_partnerComplianceInfoData || {});
    setPartnerUploadedDocumentData(_partnerUploadedDocumentData || []);
    setProfileLoading(false);
    if (_profileData) {
      const _hiringInfo = [];
      _hiringInfo.push({
        label: "Team Size",
        text: `${_profileData.teamSize || 0} Employees`,
      });
      _hiringInfo.push({
        label: "Number of jobs you can work on at a time",
        text: `${_profileData.concurrentJobCapacity || "-"}`,
      });
      _hiringInfo.push({
        label: "Hiring Expertise",
        text: `${(_profileData.hiringExpertise || [])
          .map((t: any) => t.value)
          .join(", ")}`,
        display: "chips",
        value: _profileData.hiringExpertise.map((t: any) => t.value) || [],
      });
      _hiringInfo.push({
        label: "Years of Recruitment Experience",
        text: `${_profileData.expInYear || 0} Years`,
      });
      setHiringInfo(_hiringInfo);
    }
  };

  React.useEffect(() => {
    if (!router.isReady) return;
    _getPartnerDetails();
  }, [router.isReady]);
  return (
    <StandardLayout title="Agency Profile" menuCode={menuCode || "partner"}>
      <PaperContainer>
        <FullPageLayout>
          <ProfileHeader
            profileData={profileData}
            profileLoading={profileLoading}
            partnerComplianceInfoData={partnerComplianceInfoData}
            isVerify={isVerify}
            partnerId={partnerId}
            getPartnerDetails={_getPartnerDetails}
          />
        </FullPageLayout>
      </PaperContainer>
      <ProfileBody
        profileData={profileData}
        profileLoading={profileLoading}
        partnerComplianceInfoData={partnerComplianceInfoData}
        partnerUploadedDocumentData={partnerUploadedDocumentData}
        hiringInfo={hiringInfo}
        isVerify={isVerify}
        getPartnerDetails={_getPartnerDetails}
        partnerId={partnerId}
      />
    </StandardLayout>
  );
}

export const ProfileHeader = ({
  profileData,
  profileLoading,
  partnerComplianceInfoData,
  isVerify,
  partnerId,
  getPartnerDetails,
}: ProfileProps) => {
  const dispatch = useDispatch();
  const [rating, setRating] = React.useState<number | null>(2);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isReject, setIsReject] = React.useState(false);
  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const _approvePartner = async (isApproved = true, comment = "") => {
    setIsSubmitting(true);
    const _approvePartnerRes = await dispatch(
      approvePartner({
        partnerId: partnerId,
        isApproved: isApproved,
        comment: comment,
      })
    );
    setIsSubmitting(false);
    if (isApproved) {
      handleDialogOpen();
    } else {
      setIsReject(true);
      handleDialogOpen();
      setIsDrawerOpen(false);
    }

    if (getPartnerDetails) {
      getPartnerDetails();
    }
  };
  return (
    <>
      <Grid container spacing={2} xs={12} p={1}>
        <FullWidthLoader open={isSubmitting} />
        {profileLoading ? (
          <Grid item xs={12}>
            <FullWidthLoader open />
          </Grid>
        ) : (
          <>
            <Grid item xs={12} md={4} lg={4}>
              <Box display={"flex"} gap={2}>
                <PartnerProfilePic
                  partnerLogo={profileData.partnerLogo}
                  partnerName={profileData.partnerName}
                  width={45}
                  height={45}
                  hideUploadText
                />

                <Stack spacing={0.5}>
                  <Box display={"flex"} gap={2}>
                    <Typography
                      fontWeight={600}
                      color={(theme) => theme.palette.bgBlack.main}
                    >
                      {profileData.partnerName}
                    </Typography>
                    {profileData?.social?.linkedInUrl && (
                      <a
                        href={profileData?.social?.linkedInUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <Assets
                          src="/icon/linkedin.svg"
                          className="email_img_verify"
                        />
                      </a>
                    )}

                    <Box
                      bgcolor={"#FFBE5E"}
                      fontWeight={400}
                      fontSize={"10px"}
                      textAlign={"center"}
                      borderRadius={5}
                      width={80}
                      p={0.2}
                      textTransform="capitalize"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {
                        PartnerSubscriptionType[
                          profileData?.partnerSubscriptionType || 1
                        ]
                      }{" "}
                      Partner
                    </Box>
                  </Box>
                  {/* <Typography
                    display={"flex"}
                    gap={1}
                    fontWeight={700}
                    fontSize={"14px"}
                    color={"#000000"}
                  >
                    <Rating
                      value={rating}
                      onChange={(event, value) => {
                        setRating(value);
                      }}
                      precision={0.5}
                      color={"primary"}
                      size="small"
                      readOnly
                    />
                  </Typography> */}
                  <Typography
                    fontSize={14}
                    fontWeight={400}
                    color={(theme) => theme.palette.bgDarkBlack.main}
                  >
                    Partner ID - {profileData?.partnerCode}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Stack spacing={1}>
                <Box display={"flex"} gap={2} flexWrap="wrap">
                  <Box
                    bgcolor="#EAF4FE"
                    color="#1BA39C"
                    padding={"10px"}
                    borderRadius={"100%"}
                    height={"40px"}
                    width={"40px"}
                  >
                    <IconWrapper fontSize="small" icon="geo" />
                  </Box>
                  <Box maxWidth={"280px"}>
                    <Typography
                      fontSize={14}
                      color={(theme) => theme.palette.bgDarkBlack.main}
                    >
                      {partnerComplianceInfoData?.address?.completeAddress ||
                        "-"}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  display={"flex"}
                  gap={2}
                  flexWrap="wrap"
                  alignItems={"center"}
                >
                  <Box
                    bgcolor="#EAF4FE"
                    color="#1BA39C"
                    padding={"10px"}
                    borderRadius={"100%"}
                    height={"40px"}
                    width={"40px"}
                  >
                    <IconWrapper fontSize="small" icon="web" />
                  </Box>
                  <Typography
                    fontSize={14}
                    color={(theme) => theme.palette.bgDarkBlack.main}
                    {...(profileData?.social?.webSite
                      ? {
                          component: "a",
                          href: profileData?.social?.webSite,
                          target: "_blank",
                        }
                      : null)}
                  >
                    {profileData?.social?.webSite || "-"}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2} lg={2} textAlign="right">
              {isVerify ? (
                !profileData?.isApplicable ? (
                  <>
                    <Typography color="error" variant="subtitle1">
                      Partner Rejected
                    </Typography>
                    <Typography color="textSecondary" noWrap variant="caption">
                      Remarks - {profileData?.comment}
                    </Typography>
                  </>
                ) : (
                  !profileData?.isApproved && (
                    <>
                      <Box
                        display="flex"
                        justifyContent={"space-between"}
                        gap={2}
                      >
                        <ButtonOutlined
                          borderRadius="30px"
                          height="32px"
                          width="100%"
                          text="Reject"
                          onClick={() => {
                            setIsDrawerOpen(true);
                            //approvePartner(false, "Rejected by testing");
                          }}
                        />
                        <ButtonContained
                          borderRadius="30px"
                          height="32px"
                          width="100%"
                          text="Verify"
                          disabled={
                            partnerComplianceInfoData?.business
                              ?.placementFeeType == 0
                          }
                          onClick={() => {
                            _approvePartner(true);
                          }}
                        />
                      </Box>
                    </>
                  )
                )
              ) : (
                <Link href={"/profile"}>
                  <CustomTooltip title={"edit profile"}>
                    <span>
                      <ButtonContained
                        borderRadius="30px"
                        height="32px"
                        text="Edit profile"
                        startIcon={
                          <IconWrapper
                            color="inherit"
                            style={{ fontSize: "0.6em" }}
                            icon="edit"
                          />
                        }
                      />
                    </span>
                  </CustomTooltip>
                </Link>
              )}
            </Grid>
          </>
        )}
      </Grid>

      {isOpen && (
        <CustomDialog isOpen={isOpen} handleClose={handleDialogClose}>
          <DialogContent
            sx={{
              bgcolor: (theme) =>
                isReject
                  ? theme.palette.error.main
                  : theme.palette.primary.main,
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "500px",
              color: (theme) => theme.palette.bgWhite.main,
              textAlign: "center",
            }}
          >
            <IconButton
              aria-label="close"
              onClick={() => {
                handleDialogClose();
              }}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.bgWhite.main,
              }}
            >
              <IconWrapper fontSize="small" icon="wrong" />
            </IconButton>
            <Typography sx={{ p: 1 }}>
              <IconWrapper fontSize="large" icon="ok" />
            </Typography>
            <Typography
              variant="h5"
              component="div"
              gutterBottom
              fontWeight={400}
              lineHeight={1.1}
              mb={3}
              mt={1}
            >
              {profileData?.partnerType == RecruiterType.freelancer
                ? "Independent Recruiter, "
                : "Agency, "}
              {profileData?.partnerName}{" "}
              {isReject ? "Rejected!" : "verified successfully!"}
            </Typography>
            <Typography gutterBottom>NEED HELP?</Typography>
          </DialogContent>
        </CustomDialog>
      )}
      {isDrawerOpen && (
        <CustomDrawer
          isDrawerOpen={isDrawerOpen}
          handleClose={() => {
            setIsDrawerOpen(false);
          }}
          anchor={"right"}
        >
          <Box sx={{ marginTop: 0 }}>
            <CustomeDrawerHeader
              handleClose={() => setIsDrawerOpen(false)}
              title="Rejection reason"
            />
            <Stack direction="column" spacing={1} marginTop={2} ml={2} mr={2}>
              <TextFieldComponent
                text="Remarks"
                type="text"
                placeholder=""
                width="100%"
                rows={4}
                name="comment"
                multiline={true}
                value={comment}
                onChange={(e: any) => {
                  setComment(e.target.value);
                }}
                valid
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {comment?.length > 0 ? "" : "Rejection remarks are mandatory"}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={3}
              marginTop={2}
              ml={2}
              mr={2}
              justifyContent={"end"}
            >
              <ButtonText
                text="Cancel"
                width="15%"
                height="40px"
                onClick={() => {
                  setIsDrawerOpen(false);
                }}
              />
              <ButtonContained
                marginBottom="20px"
                marginTop="20px"
                borderRadius="30px"
                text="Reject"
                width="20%"
                color="error"
                height="40px"
                onClick={() => {
                  // setIsHelpDrawerOpen(true);
                  _approvePartner(false, comment);
                }}
                loading={isSubmitting}
                disabled={!(comment || "").trim()}
              />
            </Stack>
          </Box>
        </CustomDrawer>
      )}
    </>
  );
};

const useStyles = makeStyles()((theme) => {
  return {
    item: {
      backgroundColor: "#FFF",
      borderRadius: 5,
      padding: 5,
    },
    talent_logo: {
      marginTop: 5,
      marginBottom: 5,
    },
    fixBox: {
      border: "1px solid #DDDDDD",
      borderRadius: 5,
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "start",
      padding: 10,
    },
    trendUp: {
      background: "#ECF8F3",
      borderRadius: 5,
      alignItems: "center",
      display: "flex",
      padding: 10,
      color: "#5EC394",
      gap: 5,
    },
    trendDown: {
      background: "#FDE8EB",
      borderRadius: 5,
      alignItems: "center",
      display: "flex",
      padding: 10,
      color: "#EF627A",
      gap: 5,
    },
    status: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      flexWrap: "wrap",
      height: "36px",
      margin: "2px auto",
    },
  };
});

const ProfileBody = ({
  profileData,
  profileLoading,
  partnerComplianceInfoData,
  partnerUploadedDocumentData,
  hiringInfo = [],
  isVerify,
  getPartnerDetails,
  partnerId,
}: ProfileProps) => {
  const { classes } = useStyles();
  const theme = useTheme();
  return (
    <FullPageLayout>
      <Grid container spacing={2.5} my={2} alignItems={"flex-start"}>
        <Grid item container lg={4} md={4} xs={12} spacing={2}>
          <Grid item xs={12}>
            <PaperContainer>
              <Typography fontWeight={"bold"}>Hiring Information</Typography>
              <Box mt={1}>
                {hiringInfo.map((item: any, idx: number) => (
                  <Box my={1} key={idx}>
                    {item.display == "chips" ? (
                      <>
                        <Typography variant="caption" color="textSecondary">
                          {item.label}
                        </Typography>
                        <Box>
                          {item.value.map((t: any, idx: number) => (
                            <Chip
                              key={idx}
                              label={t}
                              variant="outlined"
                              color="primary"
                              sx={{
                                my: 0.5,
                                mx: 0.5,
                                height: "26px",
                              }}
                            />
                          ))}
                        </Box>
                      </>
                    ) : (
                      <LabelWithText label={item.label} text={item.text} />
                    )}
                  </Box>
                ))}
              </Box>
            </PaperContainer>
          </Grid>
          <Grid item xs={12}>
            <PaperContainer>
              <Typography fontWeight={"bold"}>Industry Preference</Typography>
              <Box mt={1}>
                {(profileData?.industryPreference || []).map(
                  (item: any, idx: any) => (
                    <Chip
                      key={idx}
                      label={item.value}
                      variant="outlined"
                      color="primary"
                      sx={{
                        my: 0.5,
                        mx: 0.5,
                        height: "26px",
                      }}
                    />
                  )
                )}
              </Box>
            </PaperContainer>
          </Grid>
          <Grid item xs={12}>
            <PaperContainer>
              <Typography fontWeight={"bold"}>Role Preference</Typography>
              <Box mt={1}>
                {(profileData?.rolePreference || []).map(
                  (item: any, idx: any) => (
                    <Chip
                      key={idx}
                      label={item.value}
                      variant="outlined"
                      color="primary"
                      sx={{
                        my: 0.5,
                        mx: 0.5,
                        height: "26px",
                      }}
                    />
                  )
                )}
              </Box>
            </PaperContainer>
          </Grid>
          <Grid item xs={12}>
            <PaperContainer>
              <Typography fontWeight={"bold"}>Bio</Typography>
              <Box mt={1}>
                <Typography variant="subtitle2">
                  {profileData?.aboutMe || ""}
                </Typography>
              </Box>
            </PaperContainer>
          </Grid>
        </Grid>
        <Grid item container lg={8} md={8} xs={12} spacing={2}>
          <Grid item xs={12}>
            <PaperContainer>
              <Stack direction="row" justifyContent={"space-between"}>
                <Typography fontWeight={"bold"}>Business Details</Typography>
                {!isVerify ||
                  (true && (
                    <Link href={"/profile/update-profile-step-2"}>
                      <CustomTooltip title={"update business details"}>
                        <IconButton>
                          <IconWrapper
                            color="action"
                            style={{ fontSize: "0.6em" }}
                            icon="edit"
                          />
                        </IconButton>
                      </CustomTooltip>
                    </Link>
                  ))}
              </Stack>

              <Box mt={1}>
                <Grid container spacing={2}>
                  <Grid item md={4} xs={12}>
                    <LabelWithText
                      label={"MSME Number"}
                      text={
                        partnerComplianceInfoData?.business?.msmeNumber || "-"
                      }
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <LabelWithText
                      label={"Aadhar Card Number"}
                      text={
                        partnerComplianceInfoData?.business
                          ?.aadhaarCardNumber || "-"
                      }
                    />
                  </Grid>
                  {isVerify ? (
                    <Grid item md={4} xs={12}>
                      <LabelWithText
                        label={"Placement Fee"}
                        text={
                          <PlacementFeeComponent
                            placementFeeType={
                              partnerComplianceInfoData?.business
                                ?.placementFeeType
                            }
                            placementFee={
                              partnerComplianceInfoData?.business?.placementFee
                            }
                            onClose={getPartnerDetails}
                            partnerId={partnerId}
                          />
                        }
                      />
                    </Grid>
                  ) : null}
                </Grid>
              </Box>
              <Typography mt={1} fontWeight={"bold"}>
                Bank Details
              </Typography>
              <Box mt={1}>
                <Grid container spacing={2}>
                  <Grid item md={4} xs={12}>
                    <LabelWithText
                      label={"Bank Name"}
                      text={partnerComplianceInfoData?.bank?.bankName || "-"}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <LabelWithText
                      label={"Account Number"}
                      text={
                        partnerComplianceInfoData?.bank?.accountNumber || "-"
                      }
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <LabelWithText
                      label={"IFSC Code"}
                      text={`${
                        partnerComplianceInfoData?.bank?.ifscCode || "-"
                      }`}
                    />
                  </Grid>
                </Grid>
              </Box>
            </PaperContainer>
          </Grid>
          <Grid item xs={12}>
            <PaperContainer>
              <Stack direction="row" justifyContent={"space-between"}>
                <Typography fontWeight={"bold"}>
                  Documents and Attachments
                </Typography>
                {!isVerify ||
                  (true && (
                    <Link href={"/profile/upload-document-step-2"}>
                      <CustomTooltip title={"update business details"}>
                        <IconButton>
                          <IconWrapper
                            color="action"
                            style={{ fontSize: "0.6em" }}
                            icon="edit"
                          />
                        </IconButton>
                      </CustomTooltip>
                    </Link>
                  ))}
              </Stack>
              <Box mt={1}>
                <Grid container spacing={2}>
                  {partnerUploadedDocumentData.map((item: any, idx: number) => (
                    <Grid key={idx} item md={4} xs={12}>
                      <DocWithPreview
                        docArray={item.file.length > 0 ? item.file : []}
                        src={item.file.length > 0 ? item.file[0].fileUrl : ""}
                        docName={item.documentName}
                        canEdit={!isVerify}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </PaperContainer>
          </Grid>
        </Grid>
      </Grid>
    </FullPageLayout>
  );
};

const LabelWithText = ({ label, text }: { label: string; text: any }) => {
  return (
    <>
      <Typography variant="caption" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="subtitle1">{text}</Typography>
    </>
  );
};

export const DocWithPreview = ({
  docArray = [],
  src = "",
  docName = "",
  canEdit = false,
  width = "",
  height = "",
  maxWidth = "",
}: {
  docArray: any;
  src: any;
  docName: string;
  canEdit?: boolean;
  width?: any;
  height?: any;
  maxWidth?: any;
}) => {
  console.log(docArray);
  const [open, setOpen] = React.useState(false);
  const [currIndex, setCurrIndex] = React.useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("here");
    setOpen(false);
  };
  return (
    <>
      <PaperContainer
        sx={{
          backgroundColor: (theme) => theme.palette.action.hover,
          cursor: "pointer",
        }}
        onClick={docArray[currIndex]?.fileUrl && handleClickOpen}
      >
        <Box
          sx={{
            backgroundImage: src ? `url(${src})` : null,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: (theme) => theme.palette.action.disabled,
          }}
          width={width ? width : "100%"}
          maxWidth={maxWidth ? maxWidth : "240px"}
          height={height ? height : "176px"}
          mb={1.5}
        >
          {!src && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Typography color="textSecondary">No File Uploaded</Typography>
            </Box>
          )}
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {
            <Typography fontWeight="bold" color="textSecondary" marginRight={2}>
              {docName}
            </Typography>
          }
          <Typography>
            {docArray.length > 1 ? "+" + (docArray.length - 1) + " items" : ""}
          </Typography>
          {false && canEdit && (
            <CustomTooltip title={"edit/upload document"}>
              <Link href={"/profile/upload-document-step-2"}>
                <IconButton>
                  <IconWrapper
                    color="action"
                    style={{ fontSize: "0.6em" }}
                    icon="edit"
                  />
                </IconButton>
              </Link>
            </CustomTooltip>
          )}
        </Box>

        {/* <Dialog onClose={handleClose} open={open}>
        <DocViewer
          documents={fileArr}
          config={{ header: { disableHeader: true, disableFileName: true } }}
        ></DocViewer>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog> */}
      </PaperContainer>
      {open && (
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
          <DialogTitle>
            {docName}
            <IconButton sx={{ float: "right" }} onClick={handleClose}>
              <IconWrapper
                color="primary"
                style={{ fontSize: "medium" }}
                icon="wrong"
              />
            </IconButton>
          </DialogTitle>
          <DocPreview
            link={docArray[currIndex].fileUrl}
            iconName={getFileIcon({ fileName: docArray[currIndex].fileName })}
            octateFile={false}
          ></DocPreview>
          {docArray && docArray.length > 1 ? (
            <DialogActions>
              <Button
                autoFocus
                disabled={currIndex == 0 ? true : false}
                onClick={() => {
                  setCurrIndex((val) => val - 1);
                }}
              >
                Previous
              </Button>
              <Button
                disabled={currIndex == docArray.length - 1 ? true : false}
                onClick={() => {
                  setCurrIndex((val) => val + 1);
                }}
                autoFocus
              >
                Next
              </Button>
            </DialogActions>
          ) : (
            ""
          )}
        </Dialog>
      )}
    </>
  );
};

const PlacementFeeComponent = ({
  placementFeeType,
  placementFee,
  onClose,
  partnerId,
}: any) => {
  const dispatch = useDispatch();
  const { setSnackBar } = useSnackBar();
  const setFullPageLoader = usePageLoader();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [data, setData] = React.useState<any>({
    placementFeeType: placementFeeType,
    placementFee: placementFee,
  });
  const [errors, setError] = React.useState<any>({});

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const validateForm = () => {
    let errors: any = {};
    let formIsValid = true;
    if (!data?.placementFeeType) {
      formIsValid = false;
      errors["placementFeeType"] = "* select placement fee type";
    } else if (!data?.placementFee) {
      formIsValid = false;
      errors["placementFeeType"] = "* enter placement fee";
    } else if (data?.placementFeeType == PlacementFeeType.Percentage) {
      if (isNaN(data?.placementFee)) {
        formIsValid = false;
        errors["placementFeeType"] =
          "* enter valid placement fee between 0 to 100";
      } else {
        if (
          !(
            Number(data?.placementFee) >= 0 && Number(data?.placementFee) <= 100
          )
        ) {
          formIsValid = false;
          errors["placementFeeType"] =
            "* enter valid placement fee between 0 to 100";
        }
      }
    } else if (data?.placementFeeType == PlacementFeeType.Fixed) {
      if (isNaN(data?.placementFee)) {
        formIsValid = false;
        errors["placementFeeType"] =
          "* enter valid placement fee between 0 to 100";
      } else {
        if (Number(data?.placementFee) <= 0) {
          formIsValid = false;
          errors["placementFeeType"] = "* enter valid placement fee";
        }
      }
    }

    setError(errors);
    return formIsValid;
  };
  const updatePlacementFeeData = async () => {
    if (validateForm()) {
      setFullPageLoader(true);
      const response = await dispatch(
        updatePartnerPlacementFeeByPsm({
          partnerId: partnerId,
          placementFeeType: Number(data?.placementFeeType),
          placementFee: Number(data?.placementFee),
        })
      );
      if (response?.payload?.code != 1) {
        setSnackBar("error", response?.payload?.message);
      } else {
        setSnackBar("success", response?.payload?.message);
        setIsDrawerOpen(false);
        if (onClose) onClose();
      }
      setFullPageLoader(false);
    }
  };

  React.useEffect(() => {
    if (placementFeeType) {
      setData({
        placementFeeType: placementFeeType,
        placementFee: placementFee,
      });
    }
  }, [placementFeeType, placementFee]);

  return (
    <>
      <CustomTooltip title={"update placement fee"}>
        <Typography
          variant="caption"
          color="error"
          sx={{
            cursor: "pointer",
          }}
          onClick={() => setIsDrawerOpen(true)}
        >
          {placementFeeType == 0 ? (
            "* Please update Placement Fee"
          ) : placementFee ? (
            <>
              {`${
                placementFeeType == PlacementFeeType.Percentage
                  ? placementFee + "% "
                  : numDifferentiation(placementFee,0) + " "
              }`}
            </>
          ) : null}

          <IconWrapper color="inherit" fontSize="inherit" icon="edit" />
        </Typography>
      </CustomTooltip>
      {isDrawerOpen && (
        <CustomDrawer
          isDrawerOpen={isDrawerOpen}
          handleClose={() => {
            setIsDrawerOpen(false);
          }}
          anchor={"right"}
        >
          <Box sx={{ marginTop: 0 }}>
            <CustomeDrawerHeader
              handleClose={() => setIsDrawerOpen(false)}
              title="Update Placement Fee"
            />
            <Stack direction="column" spacing={1} marginTop={2} ml={2} mr={2}>
              <PlacementFeeForm
                data={data}
                errors={errors}
                handleChangeInput={handleChangeInput}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={3}
              marginTop={"auto"}
              ml={2}
              mr={2}
              justifyContent={"end"}
            >
              <ButtonText
                text="Cancel"
                width="15%"
                height="40px"
                onClick={() => {
                  setIsDrawerOpen(false);
                }}
              />
              <ButtonContained
                marginBottom="20px"
                marginTop="20px"
                borderRadius="30px"
                text="Save"
                width="20%"
                color="primary"
                height="40px"
                onClick={() => {
                  updatePlacementFeeData();
                }}
                //disabled={!(comment || "").trim()}
              />
            </Stack>
          </Box>
        </CustomDrawer>
      )}
    </>
  );
};
