import { IconWrapper } from "@components/common/customSvgIcon";
import PaperContainer from "@components/common/paperContainer";
import AutoCompleteSearch from "@components/Layout/CustomAutoCompleteDropDown";
import { Box, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";

export default function AllocationDetails() {
  const [chip1, setChip1] = React.useState<any>([]);
  const [chip2, setChip2] = React.useState<any>([]);
  const [chip3, setChip3] = React.useState<any>([]);
  const [chip4, setChip4] = React.useState<any>([]);

  const handleChange1 = (e: any, newValue: any) => {
    console.log(newValue);
    setChip1([...chip1, newValue]);
  };
  const handleChange2 = (e: any, newValue: any) => {
    setChip2([...chip2, newValue]);
  };
  const handleChange3 = (e: any, newValue: any) => {
    setChip3([...chip3, newValue]);
  };
  const handleChange4 = (e: any, newValue: any) => {
    setChip4([...chip1, newValue]);
  };

  const accountManager = ["Prateek ", "Roopal", "Naman"];

  const handleChip1Delete = (chipToDelete: any) => () => {
    setChip1((item: any) =>
      chip1.filter((item: any) => item?.key !== chipToDelete?.key)
    );
  };
  const handleChip2Delete = (chipToDelete: any) => () => {
    setChip2((item: any) =>
      chip2.filter((item: any) => item?.key !== chipToDelete?.key)
    );
  };
  const handleChip3Delete = (chipToDelete: any) => () => {
    setChip3((item: any) =>
      chip3.filter((item: any) => item?.key !== chipToDelete?.key)
    );
  };
  const handleChip4Delete = (chipToDelete: any) => () => {
    setChip4((item: any) =>
      chip4.filter((item: any) => item?.key !== chipToDelete?.key)
    );
  };

  const handleSubmit = () => {
    const data = {
      clientId: "string",
      accountManager: {
        personaId: "string",
        authId: 0,
        personaName: "string",
      },
      coordinator: {
        personaId: "string",
        authId: 0,
        personaName: "string",
      },
      qcManager: {
        personaId: "string",
        authId: 0,
        personaName: "string",
      },
    };
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
            Allocation Details
          </Typography>
          <Box display="flex" color={(theme) => theme.palette.bgGray.main}>
            <IconWrapper fontSize="small" icon="information" />
            <Typography
              fontSize={14}
              fontWeight={400}
              mb={2}
              marginLeft={"8px"}
              marginBottom={"15px"}
              color={(theme) => theme.palette.bgGray.main}
            >
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequa
            </Typography>
          </Box>
          <Divider />
          <Typography
            variant={"h5"}
            color={(theme) => theme.palette.bgBlack.main}
            fontWeight={500}
            fontSize={"18px"}
            mb={2}
            mt={2}
          >
            Account Manager
          </Typography>
          <Box className="search_filed" width={"100%"}>
            <AutoCompleteSearch
              width={"100%"}
              placeholder={"Search"}
              handleChange={handleChange1}
              options={chip1}
            />
          </Box>
          <Grid item md={12} xs={12} sm={12}>
            <Stack
              display={"flex"}
              direction={"row"}
              spacing={1}
              flexWrap="wrap"
              mb={1}
              mt={2}
            >
              {chip1.map(({ item, index }: any) => {
                return (
                  <Chip
                    key={index}
                    color="primary"
                    variant="outlined"
                    label={item}
                    onDelete={handleChip1Delete(item)}
                  />
                );
              })}
            </Stack>
          </Grid>
          <Typography
            variant={"h5"}
            color={(theme) => theme.palette.bgBlack.main}
            fontWeight={500}
            fontSize={"18px"}
            mb={2}
            mt={2}
          >
            Coordinator
          </Typography>
          <Box className="search_filed" width={"100%"}>
            <AutoCompleteSearch
              width={"100%"}
              placeholder={"Search"}
              handleChange={handleChange2}
              options={accountManager}
            />
          </Box>
          <Grid item md={12} xs={12} sm={12}>
            <Stack
              display={"flex"}
              direction={"row"}
              spacing={1}
              flexWrap="wrap"
              mb={1}
              mt={2}
            >
              {chip2.map(({ item, index }: any) => {
                return (
                  <Chip
                    key={index}
                    color="primary"
                    variant="outlined"
                    label={item}
                    onDelete={handleChip2Delete(item)}
                  />
                );
              })}
            </Stack>
          </Grid>
          <Typography
            variant={"h5"}
            color={(theme) => theme.palette.bgBlack.main}
            fontWeight={500}
            fontSize={"18px"}
            mb={2}
            mt={2}
          >
            QC Manager
          </Typography>
          <Box className="search_filed" width={"100%"}>
            <AutoCompleteSearch
              width={"100%"}
              placeholder={"Search"}
              handleChange={handleChange3}
              options={accountManager}
            />
          </Box>
          <Grid item md={12} xs={12} sm={12}>
            <Stack
              display={"flex"}
              direction={"row"}
              spacing={1}
              flexWrap="wrap"
              mb={1}
              mt={2}
            >
              {chip3.map(({ item, index }: any) => {
                return (
                  <Chip
                    key={index}
                    color="primary"
                    variant="outlined"
                    label={item}
                    onDelete={handleChip3Delete(item)}
                  />
                );
              })}
            </Stack>
          </Grid>
          {/* <Typography
            variant={"h5"}
            color={(theme) => theme.palette.bgBlack.main}
            fontWeight={500}
            fontSize={"18px"}
            mb={2}
            mt={2}
          >
            Partner Manager
          </Typography>
          <Box className="search_filed" width={"100%"}>
            <AutoCompleteSearch
              width={"100%"}
              placeholder={"Search"}
              handleChange={handleChange4}
              options={accountManager}
            />
          </Box>
          <Grid item md={12} xs={12} sm={12}>
            <Stack
              display={"flex"}
              direction={"row"}
              spacing={1}
              flexWrap="wrap"
              mb={1}
              mt={2}
            >
              {chip4.map(({ item, index }: any) => {
                return (
                  <Chip
                    key={index}
                    color="primary"
                    variant="outlined"
                    label={item}
                    onDelete={handleChip4Delete(item)}
                  />
                );
              })}
            </Stack>
          </Grid> */}
        </PaperContainer>
      </Box>
    </>
  );
}
