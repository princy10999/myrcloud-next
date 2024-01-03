import { IconWrapper } from "@components/common/customSvgIcon";
import Assets from "@components/common/image_container";
import PaperContainer from "@components/common/paperContainer";
import PartnerProfilePic from "@components/partner/partnerProfilePic";
import CommonComponentProps from "@customTypes/commonComponentProps";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { clientDetailById } from "@redux/Redux/Actions/ClientCreation";
import { useAppSelector } from "@redux/Redux/app/hooks";
import { format } from "date-fns";
import React from "react";
import { useDispatch } from "react-redux";
import DocumentComponent from "./documentComponent";

export default function PreviewClient({ handleEditStep }: any) {
  const dispatch = useDispatch();
  const clientDetails = useAppSelector(
    (state: any) => state?.rcloud?.isCreateClient?.createClientData
  );
  const onSuccess = async () => {
    if (clientDetails && clientDetails.clientId) {
      const body = `?ClientId=${clientDetails.clientId}`;
      await dispatch(clientDetailById(body));
    }
  };
  console.log(clientDetails);
  return (
    <Box>
      <PaperContainer>
        <Stack direction="row">
          <PartnerProfilePic
            partnerLogo={clientDetails?.clientLogo}
            partnerName={clientDetails?.clientName}
            width={120}
            height={120}
            hideUploadText
            type="client"
            clientId={clientDetails?.clientId}
            onSuccess={onSuccess}
          />
          <Stack direction={"column"} m={2}>
            <Stack direction="row" alignItems={"center"}>
              <Typography fontSize={"22px"} fontWeight={600}>
                {clientDetails?.clientName}
              </Typography>
              {/* {clientDetails?.social?.linkedInUrl && ( */}
              <a
                style={{
                  marginLeft: "8px",
                }}
                href={clientDetails?.social?.linkedInUrl}
              >
                <Assets src="/icon/linkedin.svg" className="email_img_verify" />
              </a>
              {/* )} */}
              <IconButton
                sx={{
                  marginLeft: "4px",
                }}
                aria-label="close"
                onClick={() => {
                  handleEditStep(0);
                }}
              >
                <IconWrapper fontSize="small" icon="edit" />
              </IconButton>
              {/* <IconButton
                sx={{
                  marginLeft: "4px",
                }}
                aria-label="close"
                onClick={() => {
                  //   handleDialogClose();
                }}
              >
                <IconWrapper fontSize="small" icon="share" />
              </IconButton>
              <IconButton
                sx={{
                  marginLeft: "4px",
                }}
                aria-label="close"
                onClick={() => {
                  //   handleDialogClose();
                }}
              >
                <IconWrapper fontSize="small" icon="download" />
              </IconButton> */}
            </Stack>
            <Typography fontSize={"14px"} fontWeight={600}>
              {[
                clientDetails?.address?.addressLine1,
                [clientDetails?.address?.city, clientDetails?.address?.pincode]
                  .filter((t) => Boolean(t))
                  .join(":"),
                clientDetails?.address?.state,
                clientDetails?.address?.country,
              ]
                .filter((t) => Boolean(t))
                .join(", ")}
            </Typography>
            <Stack direction={"row"}>
              {clientDetails?.social?.webSite && (
                <Stack
                  direction={"row"}
                  color={(theme) => theme.palette.text.secondary}
                  alignItems={"center"}
                >
                  <IconWrapper fontSize="inherit" color="inherit" icon="web" />
                  <Typography
                    variant="caption"
                    color={"texSecondary"}
                    marginLeft={1}
                  >
                    {clientDetails?.social?.webSite}
                  </Typography>
                </Stack>
              )}
              {clientDetails?.spokePersons?.primaryContact?.officialEmailId && (
                <Stack
                  direction={"row"}
                  color={(theme) => theme.palette.text.secondary}
                  alignItems={"center"}
                  marginLeft={2}
                >
                  <IconWrapper
                    fontSize="inherit"
                    color="inherit"
                    icon="e-mail"
                  />
                  <Typography
                    variant="caption"
                    color={"texSecondary"}
                    marginLeft={1}
                  >
                    {
                      clientDetails?.spokePersons?.primaryContact
                        ?.officialEmailId
                    }
                  </Typography>
                </Stack>
              )}
            </Stack>
            <Stack direction={"row"}>
              {clientDetails?.clientId && (
                <Stack
                  direction={"row"}
                  color={(theme) => theme.palette.text.secondary}
                  alignItems={"center"}
                >
                  <IconWrapper
                    fontSize="inherit"
                    color="inherit"
                    icon="id-card"
                  />
                  <Typography
                    variant="caption"
                    color={"texSecondary"}
                    marginLeft={1}
                  >
                    {clientDetails?.clientId}
                  </Typography>
                </Stack>
              )}
              {/* {clientDetails?.socialspokePersons?.primaryContact
                ?.officialEmailId && ( */}
              <Stack
                direction={"row"}
                color={(theme) => theme.palette.text.secondary}
                alignItems={"center"}
                marginLeft={2}
              >
                <IconWrapper
                  fontSize="inherit"
                  color="inherit"
                  icon="user-group"
                />
                <Typography
                  variant="caption"
                  color={"texSecondary"}
                  marginLeft={1}
                >
                  GroupName
                </Typography>
              </Stack>
              {/* )} */}
            </Stack>
          </Stack>
        </Stack>
      </PaperContainer>
      <SectionTitleAndEdit
        title="Primary Information"
        handleEditStep={() => {
          handleEditStep(0);
        }}
      />
      <PaperContainer
        sx={{
          marginTop: "8px",
        }}
      >
        <Stack direction="column">
          <Grid container xs={12}>
            <Grid container xs={12} mt={2}>
              {clientDetails?.spokePersons?.primaryContact?.name || clientDetails?.spokePersons?.primaryContact?.designation ||  clientDetails?.address?.mobileNumber ?
              <Grid item xs={12} md={4}>
                <Typography fontSize={"14px"} fontWeight={700}>
                  {clientDetails?.spokePersons?.primaryContact?.name}
                </Typography>
                <Typography
                  fontSize={"14px"}
                  fontWeight={400}
                  color={"textSecondary"}
                >
                  {[
                    clientDetails?.spokePersons?.primaryContact?.designation,

                    clientDetails?.address?.mobileNumber,
                  ]
                    .filter((t) => Boolean(t))
                    .join(", ")}
                </Typography>
              </Grid> : ""}
              <Grid item xs={12} md={4}>
                <ValueWithField
                  fieldName={"GST Number "}
                  fieldValue={clientDetails?.gstNumber || "-"}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <ValueWithField
                  fieldName={"Client Industry"}
                  fieldValue={clientDetails?.clientIndustry?.value || "-"}
                />
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </PaperContainer>
      <SectionTitleAndEdit
        title="SPOC Information"
        handleEditStep={() => {
          handleEditStep(1);
        }}
      />
      {clientDetails?.spokePersons?.secondaryContact && (
        <SpocPersonCard
          type="Secondary Contact"
          name={clientDetails?.spokePersons?.secondaryContact?.name || "-"}
          designation={
            clientDetails?.spokePersons?.secondaryContact?.designation || "-"
          }
          remarks={
            clientDetails?.spokePersons?.secondaryContact?.remarks || "-"
          }
          mobileNumber={
            clientDetails?.spokePersons?.secondaryContact?.mobileNumber || "-"
          }
          officialEmailId={
            clientDetails?.spokePersons?.secondaryContact?.officialEmailId ||
            "-"
          }
        />
      )}
      {clientDetails?.spokePersons?.keyDecisionMaker && (
        <SpocPersonCard
          type="Key Decision Maker"
          name={clientDetails?.spokePersons?.keyDecisionMaker?.name || "-"}
          designation={
            clientDetails?.spokePersons?.keyDecisionMaker?.designation || "-"
          }
          remarks={
            clientDetails?.spokePersons?.keyDecisionMaker?.remarks || "-"
          }
          mobileNumber={
            clientDetails?.spokePersons?.keyDecisionMaker?.mobileNumber || "-"
          }
          officialEmailId={
            clientDetails?.spokePersons?.keyDecisionMaker?.officialEmailId ||
            "-"
          }
        />
      )}
      {clientDetails?.spokePersons?.financePerson && (
        <SpocPersonCard
          type="Finance Person"
          name={clientDetails?.spokePersons?.financePerson?.name || "-"}
          designation={
            clientDetails?.spokePersons?.financePerson?.designation || "-"
          }
          remarks={clientDetails?.spokePersons?.financePerson?.remarks || "-"}
          mobileNumber={
            clientDetails?.spokePersons?.financePerson?.mobileNumber || "-"
          }
          officialEmailId={
            clientDetails?.spokePersons?.financePerson?.officialEmailId || "-"
          }
        />
      )}
      <SectionTitleAndEdit
        title="Contract Information"
        handleEditStep={() => {
          handleEditStep(2);
        }}
      />
      <PaperContainer>
        <Grid container xs={12}>
          <Grid item xs={12} md={4}>
            <ValueWithField
              fieldName={"Contract Number"}
              fieldValue={clientDetails?.contract?.contractNumber || "-"}
            />
            <ValueWithField
              fieldName={"Contract renewal Date"}
              fieldValue={
                clientDetails?.contract?.contractRenewalDate &&
                clientDetails?.contract?.contractRenewalDate.length > 0
                  ? format(
                      new Date(
                        clientDetails?.contract?.contractRenewalDate || ""
                      ),
                      "dd-MMM-yyyy"
                    )
                  : "-"
              }
            />
            <ValueWithField
              fieldName={"Replacement Period"}
              fieldValue={
                clientDetails?.contract?.replacementPeriod ? clientDetails?.contract?.replacementPeriod + " Months" :"-"
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ValueWithField
              fieldName={"Date of Contract"}
              fieldValue={
                clientDetails?.contract?.contractDate &&
                clientDetails?.contract?.contractDate.length > 0
                  ? format(
                      new Date(clientDetails?.contract?.contractDate || ""),
                      "dd-MMM-yyyy"
                    )
                  : "-"
              }
            />
            <ValueWithField
              fieldName={"Platform Fee per position opened"}
              fieldValue={clientDetails?.contract?.perPositionPlateformFee || "-"}
            />
            <ValueWithField
              fieldName={"Credit Period"}
              fieldValue={clientDetails?.contract?.creditPeriod || "-"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ValueWithField
              fieldName={"Contract Validity period (Months)"}
              fieldValue={
                clientDetails?.contract?.contractValidityPeriod ? clientDetails?.contract?.contractValidityPeriod + " Months" : "-"
              }
            />
            <ValueWithField
              fieldName={"Platform fee (One Time)"}
              fieldValue={clientDetails?.contract?.oneTimePlateformFee || "-"}
            />
            <ValueWithField
              fieldName={"Payment Clearance within "}
              fieldValue={
                clientDetails?.contract?.paymentClearanceDays? clientDetails?.contract?.paymentClearanceDays  + " days"  : "-"
              }
            />
          </Grid>
        </Grid>
      </PaperContainer>
      <SectionTitleAndEdit
        title="Documents & Attachments"
        handleEditStep={() => {
          handleEditStep(2);
        }}
      />

      <PaperContainer
        sx={{
          marginTop: "16px",
        }}
      >
        <Stack direction="column">
          {clientDetails?.clientDocuments &&
          clientDetails?.clientDocuments.length > 0
            ? clientDetails?.clientDocuments.map(
                (item: any, index: React.Key | null | undefined) => {
                  return (
                    <Box key={index}>
                      <DocumentComponent
                        documentType={item.documentName}
                        docId={item.documentId}
                        clientId={clientDetails?.clientId}
                        document={item.file}
                        mandatory={item.isMandatory}
                        showPicker={false}
                      />
                      {index == clientDetails?.clientDocuments.length - 1 ? (
                        ""
                      ) : (
                        <Divider
                          sx={{
                            margin: "12px 0px",
                          }}
                        />
                      )}
                    </Box>
                  );
                }
              )
            : ""}
        </Stack>
      </PaperContainer>
    </Box>
  );
}

type spocPersons = CommonComponentProps & {
  type?: string;
  name?: string;
  designation?: string;
  remarks?: string;
  mobileNumber?: string;
  officialEmailId?: string;
};

const SpocPersonCard = ({
  type,
  name,
  designation,
  remarks,
  mobileNumber,
  officialEmailId,
}: spocPersons) => {
  console.log(name?.length)
  return (
    <PaperContainer
      sx={{
        marginTop: "8px",
      }}
    >
      <Stack direction="column">
        <Typography fontSize={"18px"} fontWeight={500}>
          {type}
        </Typography>
        {name && name.length > 1 ? (
          <Grid container xs={12} mt={2}>
            <Grid item xs={12} md={4}>
              <Typography fontSize={"14px"} fontWeight={700}>
                {name}
              </Typography>
              <Typography
                fontSize={"14px"}
                fontWeight={400}
                color={"textSecondary"}
              >
                {designation}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <ValueWithField
                fieldName={"Official Email ID"}
                fieldValue={officialEmailId}
              />
              <ValueWithField
                fieldName={"Mobile Number"}
                fieldValue={mobileNumber}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ValueWithField fieldName={"Remarks"} fieldValue={remarks} />
            </Grid>
          </Grid>
        ) : (
          <Typography variant="caption" justifyContent={"center"}>
            No Spoc added
          </Typography>
        )}
      </Stack>
    </PaperContainer>
  );
};

const ValueWithField = ({ fieldName, fieldValue }: any) => {
  return (
    <Box marginBottom={2}>
      <Typography fontSize={"14px"} fontWeight={400} color={"textSecondary"}>
        {fieldName}
      </Typography>
      <Typography fontSize={"14px"} fontWeight={400}>
        {fieldValue}
      </Typography>
    </Box>
  );
};

const SectionTitleAndEdit = ({ title, handleEditStep }: any) => {
  return (
    <Stack
      direction="row"
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography fontSize={"24px"} fontWeight={700} mt={2} mb={2}>
        {title}
      </Typography>

      <IconWrapper
        onClick={handleEditStep}
        style={{ cursor: "pointer" }}
        fontSize="small"
        icon="edit"
      />
    </Stack>
  );
};
