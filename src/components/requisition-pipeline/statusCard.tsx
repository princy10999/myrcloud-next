import { Box, Typography } from "@mui/material";
interface StatusCardProps {
  status: string;
}
export default function StatusCard(props: StatusCardProps) {
  const { status } = props;

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          status === "Open"
            ? theme.palette.bgLightBlue.main
            : theme.palette.bgLightGray.main,
        padding: "8px",
        textAlign: "center",
        borderRadius: "5px",
        width: "60%",
      }}
    >
      <Typography variant="subtitle2" color="textPrimary" textAlign={"center"}>
        Status
      </Typography>
      <Typography
        variant="subtitle1"
        fontWeight={"bold"}
        color="textPrimary"
        textAlign={"center"}
      >
        {status}
      </Typography>
    </Box>
  );
}
