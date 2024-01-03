import React from "react";
import { Box, Typography, Button, Stack, Grid, Paper } from "@mui/material";
import ReqRequirmentBrief from "@components/requisition-pipeline/reqRequirmentBrief";
import ReqPositionDetails from "@components/requisition-pipeline/reqPositionDetails";
import Assets from "@components/common/image_container";
import usePagination from "@components/common/pagination";
import { Pagination } from "@mui/lab";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material";
import StatusCard from "@components/requisition-pipeline/statusCard";
import { IconWrapper } from "@components/common/customSvgIcon";
import { numDifferentiation } from "@lib/calculateCTC";
import { PriorityType } from "@lib/enum";

export default function PublishedRequistions({
  tab,
  publishedRequisitionForPartner,
  rejectRequisition,
  count = 0,
  page,
  handlePageChange,
  PER_PAGE,
  length,
}: any) {
  //Hooks
  const theme = useTheme();
  const router = useRouter();

  //State
  const publishReq =
    publishedRequisitionForPartner?.length > 0
      ? publishedRequisitionForPartner?.map((e: any) => e?.requisition)
      : [];

  const publishReq1 =
    rejectRequisition?.length > 0
      ? rejectRequisition?.map((e: any) => e?.requisition)
      : [];

  const pageCount = Math.ceil(count / PER_PAGE);

  const _DATA = usePagination(tab === 1 ? publishReq : publishReq1, PER_PAGE);

  return (
    <>
      <Grid container spacing={2} alignItems="stretch">
        {_DATA.currentData().map((item: any, idx: any) => {
          return (
            <>
              <Grid key={idx} item xs={12} md={12} lg={12} sm={12}>
                <Paper elevation={0} sx={{ p: 1 }}>
                  <Grid display={"flex"}>
                    <Grid
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      spacing={5}
                      sx={{
                        display: "flex",
                        flexDirection: {
                          lg: "row",
                          md: "column",
                          sm: "column",
                          xs: "column",
                        },
                      }}
                    >
                      <Grid item md={6} xs={12} lg={3} sm={12} p={0}>
                        <ReqPositionDetails
                          reqId={item?.requisitionCode}
                          title={item?.jobTitle}
                          clientName={item?.client?.clientName}
                          location={item?.location}
                          color={item.color}
                          label={PriorityType[item?.priority]}
                        />
                      </Grid>
                      <Grid
                        container
                        item
                        md={12}
                        lg={12}
                        xs={12}
                        sm={12}
                        spacing={{ lg: 2, md: 6, sm: 6, xs: 6 }}
                        p={{ lg: 1, md: 1, sm: 1, xs: 1 }}
                      >
                        <Grid
                          item
                          lg={tab === 3 ? 3 : 4}
                          md={3}
                          xs={6}
                          sm={6}
                          display={"flex"}
                          alignContent={"center"}
                        >
                          <Stack direction="row" width={"100%"} spacing={2}>
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
                              >
                                {item?.industry || "-"}
                              </Typography>
                              <Typography
                                variant="caption"
                                fontWeight={"bold"}
                                color="textPrimary"
                              >
                                {item?.educations[0] || "-"}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid
                          item
                          lg={tab === 3 ? 3.5 : 4.5}
                          md={3}
                          xs={6}
                          sm={6}
                          alignSelf={"center"}
                        >
                          <ReqRequirmentBrief
                            noOfPosition={item?.positionCount}
                            providedCVCount={0}
                            CVLimit={parseInt(item?.cvLimit)}
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
                            showCvLimitBar={false}
                          />
                        </Grid>
                        <Grid
                          item
                          lg={tab === 3 ? 3 : 3}
                          md={3}
                          xs={6}
                          sm={6}
                          display={"flex"}
                          alignContent={"center"}
                        >
                          <Stack direction="row" width={"100%"} spacing={1}>
                            <Stack
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                              }}
                              spacing={1}
                            >
                              <Typography
                                variant="caption"
                                color="textSecondary"
                                display={"flex"}
                                alignItems={"center"}
                                gap={1}
                              >
                                <Assets src={`/icon/circle-dollar.svg`} />
                                Potential Revenue
                              </Typography>
                            </Stack>
                            <Stack
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                              }}
                              spacing={1.5}
                            >
                              <Typography
                                variant="caption"
                                fontWeight={"bold"}
                                color="textPrimary"
                              >
                                {numDifferentiation(
                                  item?.potentialRevenue || 0,
                                  0
                                )}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        {tab === 3 && (
                          <Grid
                            item
                            lg={tab === 3 ? 2.5 : 3}
                            md={2}
                            xs={6}
                            sm={6}
                            display={"flex"}
                            alignSelf={"center"}
                            justifyContent="center"
                          >
                            <StatusCard
                              status={
                                item?.requisitionStatus === 1 ? "Open" : "Close"
                              }
                            />
                          </Grid>
                        )}
                      </Grid>
                      <Grid
                        item
                        md={12}
                        xs={12}
                        lg={4}
                        sm={12}
                        display={"flex"}
                        justifyContent={"space-evenly"}
                        flexDirection={"row"}
                        alignSelf={"center"}
                        ml={{ lg: 0, md: 10, sm: 4, xs: 4 }}
                      >
                        <Button
                          size="small"
                          onClick={() => {
                            if (tab === "3") {
                              router.push(
                                `/partner/assistantstore/?requisitionId=${item?.requisitionId}&&id=1`
                              );
                            } else {
                              router.push(
                                `/partner/assistantstore/?requisitionId=${item?.requisitionId}`
                              );
                            }
                          }}
                          color="inherit"
                          sx={{
                            flexDirection: "column",
                            fontWeight: "bold",
                            width: "40%",
                          }}
                        >
                          <IconWrapper
                            fontSize="medium"
                            icon="visibility"
                            color="primary"
                          />
                          <Typography variant="caption" fontWeight={"bold"}>
                            View Requisition To Accept
                          </Typography>
                        </Button>
                        {tab === 3 && (
                          <Button
                            size="small"
                            onClick={() => {
                              router.push(
                                `/partner/assistantstore/?requisitionId=${item?.requisitionId}&&id=1`
                              );
                            }}
                            color="inherit"
                            sx={{
                              flexDirection: "column",
                              fontWeight: "bold",
                              width: "40%",
                            }}
                          >
                            <IconWrapper
                              fontSize="medium"
                              icon="comment"
                              color="primary"
                            />
                            View Rejection Reason
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </>
          );
        })}
      </Grid>
      {length > 3 && (
        <Box
          mt={2}
          justifyContent={"center"}
          display={"flex"}
          bgcolor={theme.palette.bgLightGray.main}
          width="100%"
          position="sticky"
          bottom="0px"
          p={3}
        >
          {pageCount > 1 && (
            <Pagination
              count={pageCount}
              size="small"
              page={page}
              variant="text"
              // shape="rounded"
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-icon": {
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 5,
                  height: "35px",
                  minWidth: "35px",
                  color: theme.palette.bgWhite.main,
                  fontSize: "14px",
                },
                "& .mui-1ba2zw7-MuiButtonBase-root-MuiPaginationItem-root": {
                  padding: "14px 10px 13px 10px",
                  borderRadius: "50%",
                  height: "20px",
                  minWidth: "10px",
                },
                "& .mui-rbegq8-MuiPagination-root .MuiPaginationItem-icon": {
                  fontSize: "54px",
                },
              }}
            />
          )}
        </Box>
      )}
    </>
  );
}
