import React, { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTheme } from "@mui/material";
import LoginForm from "@components/auth/loginForm";
import { useTranslation } from "react-i18next";
import LoginSignupContainer from "@components/auth/loginSignupContainer";

const Login = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.bgWhite.main;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <LoginSignupContainer
      line1="Delivering great"
      line2="recruitment outcomes"
      imgSrc="/assets/img/login_bg.gif"
    >
      <LoginForm />
    </LoginSignupContainer>
  );
};
export const getStaticProps = async ({ locale = "en" }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
    pageTitle: "Partner Login",
  },
});
export default Login;
