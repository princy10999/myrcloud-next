import React from "react";
import PasswordForm from "@components/auth/passwordForm";
import { useTheme } from "@mui/material";
import LoginSignupContainer from "@components/auth/loginSignupContainer";

export default function Password() {
  const theme = useTheme();
  React.useEffect(() => {
    document.body.style.backgroundColor = theme.palette.bgWhite.main;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <>
      <LoginSignupContainer
        imgSrc2="/assets/img/lock.gif"
        subText="Length. Length is important because the longer the password is,
      the harder it is for a program to guess it"
        noHeader
        imgSrc2MaxWidth={"300px"}
        marginTop={16}
      >
        <PasswordForm />
      </LoginSignupContainer>
    </>
  );
}
