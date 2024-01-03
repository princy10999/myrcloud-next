import React from "react";
import {
  Grid,
  Stack,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Box,
  useTheme,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { IconWrapper } from "@components/common/customSvgIcon";
import ButtonContained from "@components/Layout/ButtonContained";
import SearchTextFieldBeforeDropDownComponents from "@components/Layout/SearchTextFieldBeforeDropDown";
import CustomDrawer from "@components/common/CustomDrawer";
import CustomeDrawerHeader from "@components/common/customDrawerHeader";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import ButtonText from "@components/Layout/ButtonText";
import DropDownComponent from "@components/Layout/DropDownComponent";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    fontSize: 17,
    fontWeight: 500,
    textAlign: "center",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#eaf1fb",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const tableData = [
  {
    id: 1,
    groupName: "Group-1",
    clients:
      "Nayara Energy, DelphianLogic Technologies Vedanta Electrosteel and Ikaria",
    employee:
      "Manoj Kumar, Rajendra Vesvikar, Varsha Jadhav and Milan Janak Joshi,  more...",
    industry: "IT",
  },
  {
    id: 2,
    groupName: "Group-2",
    clients:
      "Nayara Energy, DelphianLogic Technologies Vedanta Electrosteel and Ikaria",
    employee:
      "Manoj Kumar, Rajendra Vesvikar, Varsha Jadhav and Milan Janak Joshi,  more...",
    industry: "IT",
  },
  {
    id: 3,
    groupName: "Group-3",
    clients:
      "Nayara Energy, DelphianLogic Technologies Vedanta Electrosteel and Ikaria",
    employee:
      "Manoj Kumar, Rajendra Vesvikar, Varsha Jadhav and Milan Janak Joshi,  more...",
    industry: "IT",
  },
];

const industries = ["IT", "Civil", "Manufecturing"];
const clients = ["Vedanta", "Lithium", "Tesco"];
const employees = ["Manoj Kumar", "Rajendra Kumar", "Varsha Jadhav"];

const GroupTab = () => {
  //Hooks
  const theme = useTheme();
  //State
  const [isGroupOpen, setIsGroupOpen] = React.useState<boolean>(false);
  const [errors, setError] = React.useState<any>({});
  const [data, setData] = React.useState<any>({
    groupName: "",
    industry: "",
    client: "",
    employee: "",
  });

  //Handler
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
    if (!data?.groupName) {
      formIsValid = false;
      errors["groupName"] = "* enter group name";
    }
    if (!data?.industry) {
      formIsValid = false;
      errors["industry"] = "* select industry";
    }
    if (!data?.client) {
      formIsValid = false;
      errors["client"] = "* select client";
    }

    setError(errors);
    return formIsValid;
  };
  const addGroup = () => {
    if (validateStep()) {
      console.log("Added Group");
    }
  };
  return (
    <>
      <Box display={{ lg: "flex" }} justifyContent={"space-between"}>
        <Stack>
          <Typography fontSize="22px" fontWeight={600} mb={2}>
            Group
          </Typography>
        </Stack>
        <Stack
          direction={{
            lg: "row",
            md: "row",
            xs: "column",
            sm: "row",
          }}
          alignItems={"center"}
          gap={{ lg: 2, md: 2, xs: 1, sm: 1 }}
          mt={{ lg: 0, md: 3, xs: 0, sm: 2 }}
        >
          <SearchTextFieldBeforeDropDownComponents
            placeholder={"Search"}
          // onChange={searchFilter}
          />
          <ButtonContained
            borderRadius="24px"
            text={"New Group"}
            endIcon={<IconWrapper fontSize="19px" icon="plus-symbol" />}
            onClick={() => {
              setIsGroupOpen(true);
            }}
          />
        </Stack>
      </Box>
      <Grid item container lg={12} md={12} xs={12} spacing={2}>
        <Box bgcolor={"white"} mt={4}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ width: "5%" }}>#</StyledTableCell>
                <StyledTableCell sx={{ width: "10%" }}>
                  Group Name
                </StyledTableCell>
                <StyledTableCell sx={{ width: "25%" }}>Clients</StyledTableCell>
                <StyledTableCell sx={{ width: "30%" }}>
                  Employees
                </StyledTableCell>
                <StyledTableCell sx={{ width: "25%" }}>
                  Industry
                </StyledTableCell>
                <StyledTableCell sx={{ width: "15%" }}>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.id}
                  </StyledTableCell>
                  <StyledTableCell>{item.groupName}</StyledTableCell>
                  <StyledTableCell>{item.clients}</StyledTableCell>
                  <StyledTableCell>{item.employee}</StyledTableCell>
                  <StyledTableCell>{item.industry}</StyledTableCell>
                  <StyledTableCell>
                    <IconWrapper fontSize="19px" icon="edit" onClick={() => {
                      setIsGroupOpen(true)
                      setData({
                        ...data,
                        groupName: item?.groupName,
                        industry: item?.clients,
                        client: item?.employee,
                        employee: item?.industry,
                      })
                    }} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Grid>
      {isGroupOpen && (
        <CustomDrawer
          isDrawerOpen={isGroupOpen}
          handleClose={() => {
            setData({
              groupName: "",
              industry: "",
              client: "",
              employee: "",
            })
            setIsGroupOpen(false);
          }}
          anchor={"right"}
        >
          <Box sx={{ marginTop: 0 }}>
            <CustomeDrawerHeader
              handleClose={() => {
                setData({
                  groupName: "",
                  industry: "",
                  client: "",
                  employee: "",
                })
                setIsGroupOpen(false)
              }}
              title="Add Group"
            />
            <Stack p={2}>
              <Grid container spacing={1}>
                <Grid item md={12} xs={12}>
                  <TextFieldComponent
                    type="text"
                    width="100%"
                    text={"Group Name"}
                    name="groupName"
                    value={data?.groupName}
                    onChange={handleChangeInput}
                    valid
                  />
                  <Typography
                    variant="body2"
                    textAlign={"start"}
                    color={"error"}
                  >
                    {data?.groupName?.length > 0 ? "" : errors["groupName"]}
                  </Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                  <DropDownComponent
                    width="100%"
                    text="Industries"
                    values={industries}
                    name="industry"
                    defaultValue={"Select"}
                    labelSize={"14px"}
                    value={data?.industry}
                    onChange={handleChangeInput}
                    valid
                  />
                  <Typography
                    variant="body2"
                    textAlign={"start"}
                    color={"error"}
                  >
                    {data?.industry?.length > 0 ? "" : errors["industry"]}
                  </Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                  <DropDownComponent
                    width="100%"
                    text="Select Clients"
                    values={clients}
                    name="client"
                    defaultValue={"Select"}
                    labelSize={"14px"}
                    value={data?.client}
                    onChange={handleChangeInput}
                    valid
                  />
                  <Typography
                    variant="body2"
                    textAlign={"start"}
                    color={"error"}
                  >
                    {data?.client?.length > 0 ? "" : errors["client"]}
                  </Typography>
                </Grid>

                <Grid item md={12} xs={12}>
                  <DropDownComponent
                    width="100%"
                    text="Select Employees"
                    values={employees}
                    name="employee"
                    defaultValue={"Select"}
                    labelSize={"14px"}
                    value={data?.employee}
                    onChange={handleChangeInput}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <Box
            width="100%"
            border-top="1px solid #DDDDDD"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mt={4}
          >
            <ButtonText
              borderRadius="30px"
              text="Cancel"
              marginRight="20px"
              width="15%"
              height="33px"
              onClick={() => {
                setData({
                  groupName: "",
                  industry: "",
                  client: "",
                  employee: "",
                })
                setIsGroupOpen(false)
              }}
              color={"inherit"}
            />
            <ButtonContained
              borderRadius="30px"
              text="Save"
              marginRight="20px"
              width="15%"
              height="33px"
              onClick={addGroup}
            />
          </Box>
        </CustomDrawer>
      )}
    </>
  );
};

export default GroupTab;
