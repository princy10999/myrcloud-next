import { createTheme } from "@mui/material/styles";

// Create a theme instance.

export const defaultPrimaryColor: string = "#1BA39C";
export const defaultWarningColor: string = "#FFBE5E";
export const defaultInfoColor: string = "#2F80ED";
export const defaultBgLightBlue: string = "#EAF4FE";
export const defaultBgLightBlue2: string = "#00AEEF";
export const defaultBgLightGray: string = "#F5F5F5";
export const defaultBgLightWhite: string = "#FFFFFF";
export const defaultBgRejectColor: string = "#EF627A";
export const defaultBgSuccessColor: string = "#37bb00de";
export const defaultBgBlueColor: string = "#4E85C5";
export const defaultBgGray: string = "#777777";
export const defaultBgBlack: string = "#444444";
export const defaultBgDarkBlack: string = "#222222";
export const defaultBgLightGreen: string = "#5EC394";
export const defaultBgLightBlack: string = "#B6B6B6";
export const defaultBackgroundColor: string = "#CCCCC";
export const defaultBgDarkCyan: string = "#1ba39c1a";
export const defaultBgPurple: string = "#646CE1";
export const defaultBgTrendGreen: string = "#ECF8F3";
export const defaultBgTrendRed: string = "#FDE8EB";
export const defaultBgTrendOrange: string = "#FFF5E5";
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: defaultPrimaryColor,
    },
    warning: {
      main: defaultWarningColor,
    },
    info: {
      main: defaultInfoColor,
    },
    bgLightBlue: {
      main: defaultBgLightBlue,
    },
    bgLightBlue2: {
      main: defaultBgLightBlue2,
    },
    bgLightGray: {
      main: defaultBgLightGray,
    },
    bgWhite: {
      main: defaultBgLightWhite,
    },
    error: {
      main: defaultBgRejectColor,
    },
    bgSuccess: {
      main: defaultBgSuccessColor,
    },
    bgGray: {
      main: defaultBgGray,
    },
    bgBlue: {
      main: defaultBgBlueColor,
    },
    bgBlack: {
      main: defaultBgBlack,
    },
    bgDarkBlack: {
      main: defaultBgDarkBlack,
    },
    bgLightBlack: {
      main: defaultBgLightBlack,
    },
    bgLightGreen: {
      main: defaultBgLightGreen,
    },
    bgTrendGreen: {
      main: defaultBgTrendGreen,
    },
    bgTrendRed: {
      main: defaultBgTrendRed,
    },
    backgroundDefaultColor: {
      main: defaultBackgroundColor,
    },
    bgCyan: {
      main: defaultBgDarkCyan,
    },
    bgPurple: {
      main: defaultBgPurple,
    },
    bgTrendOrange: {
      main: defaultBgTrendOrange,
    },
    background: { default: "#EFEFEF" },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        //disableRipple: true, // No more ripple, on the whole application 💣!
        disableTouchRipple: true,
      },
    },
    // MuiAlert: {
    //   styleOverrides: {
    //     standardSuccess: {
    //       backgroundColor: "#ABC9BB",
    //     },
    //   },
    // },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: defaultPrimaryColor,
    },
    warning: {
      main: defaultWarningColor,
    },
    info: {
      main: defaultInfoColor,
    },
    bgLightBlue: {
      main: defaultBgLightBlue,
    },
    bgLightBlue2: {
      main: defaultBgLightBlue2,
    },
    bgLightGray: {
      main: defaultBgLightGray,
    },
    bgWhite: {
      main: defaultBgLightWhite,
    },
    error: {
      main: defaultBgRejectColor,
    },
    bgSuccess: {
      main: defaultBgSuccessColor,
    },
    bgGray: {
      main: defaultBgGray,
    },
    bgBlue: {
      main: defaultBgBlueColor,
    },
    bgBlack: {
      main: defaultBgBlack,
    },
    bgDarkBlack: {
      main: defaultBgDarkBlack,
    },
    bgLightBlack: {
      main: defaultBgLightBlack,
    },
    bgLightGreen: {
      main: defaultBgLightGreen,
    },
    bgTrendGreen: {
      main: defaultBgTrendGreen,
    },
    bgTrendRed: {
      main: defaultBgTrendRed,
    },
    backgroundDefaultColor: {
      main: defaultBackgroundColor,
    },
    bgCyan: {
      main: defaultBgDarkCyan,
    },
    bgPurple: {
      main: defaultBgPurple,
    },
    bgTrendOrange: {
      main: defaultBgTrendOrange,
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        //disableRipple: true, // No more ripple, on the whole application 💣!
        disableTouchRipple: true,
      },
    },
    // MuiAlert: {
    //   styleOverrides: {
    //     standardSuccess: {
    //       backgroundColor: "#ABC9BB",
    //     },
    //   },
    // },
  },
});
