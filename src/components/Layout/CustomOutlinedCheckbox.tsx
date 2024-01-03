import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from "@mui/material";

const OutlinedCheckbox = ({
  label,
  selected,
  handleSelect,
  value,
  name,
  
}: any) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      border={
        selected
          ? `1px solid ${theme.palette.primary.main}`
          : `1px solid #DDDDDD`
      }
      borderRadius="5px"
      bgcolor={
        selected ? "rgba(27, 163, 156, 0.05)" : theme.palette.bgWhite.main
      }
      color={selected ? theme.palette.primary.main : theme.palette.bgGray.main}
    >
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              marginLeft: 1,
              "& .MuiSvgIcon-root": {
                fontSize: { lg: 22, md: 17, xs: 18, sm: 20 },
              },
            }}
            onChange={handleSelect}
            value={value}
            name={name}
            checked={selected}
          />
        }
        label={
          <Typography
            fontSize={{ lg: "14px", md: "10px", xs: "10px", sm: "12px" }}
          >
            {label}
          </Typography>
        }
      />
    </Box>
  );
};

export default OutlinedCheckbox;
