import PaperContainer from "@components/common/paperContainer";
import React from "react";
import { Stack, Grid, Button, Typography, Box } from "@mui/material";
import ReqPositionDetails from "@components/requisition-pipeline/reqPositionDetails";
import ReqRequirmentBrief from "@components/requisition-pipeline/reqRequirmentBrief";
import { IconWrapper } from "@components/common/customSvgIcon";
import { useRouter } from "next/router";
import { numDifferentiation } from "@lib/calculateCTC";
import { PriorityType } from "@lib/enum";
import { useConfirm } from "material-ui-confirm";

export default function RequisitionsList({
  tab,
  requisitionList = [],
  count = 0,
  type,
}: any) {
  const router = useRouter();
  const confirmDialogue = useConfirm();

  const _deleteDraftRequisition = async () => {
    confirmDialogue({
      description: "Do you want to delete this requisition!",
    })
      .then(() => {
        /* ... */
      })
      .catch(() => {
        /* ... */
      });
  };
  return (
    <Grid container>
      {requisitionList.map((item: any, idx: number) => {
        return (
          <Grid
            key={item.requisitionId}
            item
            container
            xs={12}
            component={PaperContainer}
            mb={2}
            spacing={1}
          >
            <Grid item md={3} xs={12}>
              <Stack>
                <ReqPositionDetails
                  reqId={item?.requisitionCode}
                  title={item?.jobTitle}
                  clientName={item?.client?.clientName}
                  location={item?.location}
                  color={item.color}
                  label={PriorityType[item?.priority]}
                />
              </Stack>
            </Grid>
            <Grid item md={3} xs={12}>
              <Stack direction="row" spacing={2}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                  spacing={2}
                >
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display={"flex"}
                    alignItems={"center"}
                    gap={1}
                  >
                    <IconWrapper fontSize="small" icon="business" />
                    Industry
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display={"flex"}
                    alignItems={"center"}
                    gap={1}
                  >
                    <IconWrapper fontSize="small" icon="degree" />
                    Education
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                  spacing={2}
                >
                  <Typography
                    variant="caption"
                    fontWeight={"bold"}
                    color="textPrimary"
                    noWrap
                  >
                    {item?.industry || "-"}
                  </Typography>
                  <Typography
                    variant="caption"
                    fontWeight={"bold"}
                    color="textPrimary"
                  >
                    {(item?.educations && item?.educations[0]) || "-"}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item md={3} xs={12}>
              <ReqRequirmentBrief
                noOfPosition={item?.positionCount}
                CTC={`${numDifferentiation(
                  item?.compensation?.minSalary || 0,
                  0
                )} - ${numDifferentiation(
                  item?.compensation?.maxSalary || 0,
                  0
                )}`}
                Exp={`${
                  item?.workExperience?.minimumYear ||
                  item?.workExperience?.totalMinimumYear ||
                  0
                } - ${
                  item?.workExperience?.maximumYear ||
                  item?.workExperience?.totalMaximumYear ||
                  0
                } years`}
              />
            </Grid>
            <Grid item md={3} xs={12} textAlign="right">
              <Button
                size="small"
                onClick={() => {
                  _deleteDraftRequisition()
                }}
                color="inherit"
                sx={{
                  flexDirection: "column",
                  fontWeight: "bold",
                  width: "40%",
                }}
              >
                <IconWrapper fontSize="medium" icon="delete" color="error" />
                <Typography variant="caption" fontWeight={"bold"}>
                  Delete Requisition
                </Typography>
              </Button>
              <Button
                size="small"
                onClick={() => {
                  router.push(
                    `/client/edit-requisition?requisitionId=${item?.requisitionId}`
                  );
                }}
                color="inherit"
                sx={{
                  flexDirection: "column",
                  fontWeight: "bold",
                  width: "40%",
                }}
              >
                <IconWrapper fontSize="medium" icon="edit" color="primary" />
                <Typography variant="caption" fontWeight={"bold"}>
                  Finalize Requisition
                </Typography>
              </Button>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
