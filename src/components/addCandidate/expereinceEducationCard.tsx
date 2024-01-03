import React from "react";
import CommonComponentProps from "@customTypes/commonComponentProps";
import { Avatar, Typography, Box, Stack } from "@mui/material";
import { IconWrapper } from "@components/common/customSvgIcon";
import ReadMoreLessHelper from "@components/common/readMoreLessHelper";
type ExpereinceEducationCardProps = CommonComponentProps & {
  institutionName?: string;
  courseName?: string;
  Designation?: string;
  employmentType?: string;
  duration?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  grade?: string;
  description?: any;
  isEducation?: boolean;
  onEdit?: any;
  onDelete?: any;
  hideEdit?: boolean;
  jobTitle?:any;
  skill?:any;
  onClick?:any
};

export default function ExpereinceEducationCard({
  jobTitle,
  institutionName,
  courseName,
  Designation,
  employmentType,
  duration,
  startDate,
  endDate,
  location,
  grade,
  description,
  isEducation,
  onDelete,
  hideEdit,skill,
  onEdit
}: ExpereinceEducationCardProps) {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.bgLightGray.main,
        borderRadius: "10px",
        display: "flex",
        flexDirection: "row",
      }}
      padding={2}
      marginTop={4}
    >
      <Avatar
        sx={{
          height: "50px",
          width: "50px",
          backgroundColor: (theme) => theme.palette.common.white,
          color: (theme) => theme.palette.grey[500],
          border: "1px solid",
        }}
      >
        {isEducation ? (
          <IconWrapper fontSize="small" icon="business" color={"disabled"} />
        ) : (
          <IconWrapper fontSize="small" icon="business" color={"disabled"} />
        )}
      </Avatar>
     <Box display={"flex"} justifyContent={"space-between"} width="100%">
     <Stack direction={"column"} marginLeft={2}  width={"100%"}>
        {isEducation ? (
          <>
            <Typography variant="subtitle1" fontWeight={"bold"}>
              {institutionName ? institutionName : "UI/UX Designer"}
            </Typography>
            <Typography
              variant="subtitle2"
              marginTop={"4px"}
              color={"textPrimary"}
            >
              {courseName ? courseName : "Relevel by Unacademy"}
            </Typography>
            <Typography
              variant="body2"
              marginTop={"4px"}
              color={"textSecondary"}
            >
              {duration ? duration :"Apr 2019 - Present"}
            </Typography>
            <Typography
              variant="body2"
              marginTop={"4px"}
              fontWeight={"bold"}
              color={"textSecondary"}
            >
              {skill ? skill : ""}
            </Typography>
            <Typography
              variant="body2"
              marginTop={"4px"}
              fontWeight={"bold"}
              color={"textSecondary"}
            >
              {grade ? grade : ""}
            </Typography>
            <Typography
              width={"100%"}
              marginTop={2}
              variant="body2"
              color={"textPrimary"}
            >
            <ReadMoreLessHelper>
              {description}
            </ReadMoreLessHelper>
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="subtitle1" fontWeight={"bold"}>
              {jobTitle}
            </Typography>
            <Typography
              variant="subtitle2"
              marginTop={"4px"}
              color={"textPrimary"}
            >
              {Designation}
            </Typography>
            <Typography
              variant="subtitle2"
              marginTop={"4px"}
              color={"textPrimary"}
            >
              {institutionName}
            </Typography>
            <Typography
              variant="body2"
              marginTop={"4px"}
              color={"textSecondary"}
            >
              {duration}
            </Typography>
            <Typography
              variant="body2"
              marginTop={"4px"}
              color={"textSecondary"}
            >
              {location}
            </Typography>
            <Typography
              width={"100%"}
              marginTop={2}
              variant="body2"
              color={"textPrimary"}
            >
            <ReadMoreLessHelper>
              {description}
            </ReadMoreLessHelper>
            </Typography>
          </>
        )}

       
      </Stack>
      {hideEdit?"":  <Box display={"flex"} gap={2}>
     <Avatar
     onClick={onDelete}
          sx={{
            height: "35px",
            width: "35px",
            backgroundColor: (theme) => theme.palette.common.white,
            color: (theme) => theme.palette.grey[500],
            border: "1px solid",
          }}
        ><IconWrapper fontSize="small" icon="delete" /></Avatar>
       
         <Avatar
         onClick={onEdit}
          sx={{
            height: "35px",
            width: "35px",
            backgroundColor: (theme) => theme.palette.common.white,
            color: (theme) => theme.palette.grey[500],
            border: "1px solid",
          }}
        > <IconWrapper fontSize="small" icon="edit" /></Avatar>
     </Box>}
     </Box>

   
    </Box>
  );
}
