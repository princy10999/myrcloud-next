import React from "react";
import Header, { HeaderProps } from "@components/Layout/Header";
import SecondaryMenu from "./SecondaryMenu";
type StandardLayoutProps = React.PropsWithChildren<{}> & HeaderProps;
export default function StandardLayout({
  children,
  title,
  menuCode,
  position,
  hasBottomBorder,
}: StandardLayoutProps) {
  return (
    <>
      <Header
        title={title}
        menuCode={menuCode}
        position={position}
        hasBottomBorder={hasBottomBorder}
      />
      <SecondaryMenu menuCode={menuCode} />
      {children}
    </>
  );
}
