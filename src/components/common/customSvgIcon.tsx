import React, { ImgHTMLAttributes } from "react";
import {
  Icon,
  IconPropsColorOverrides,
  SvgIcon,
  useTheme,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    iconStyle: {
      verticalAlign: "middle",
      marginTop: "5px",
    },
    spriteSvg: {
      ["--primary-fill"]: theme.palette.primary.main,
      ["--border-fill"]: theme.palette.mode == "dark" ? "#ccc" : "#222222",
    },
    fontIcons: {
      position: "relative",
      "&:before,&:after": {
        position: "absolute",
        left: 0,
        top: 0,
      },
    },
  };
});

export type IconWrapperProps = {
  id?: string;
  icon?: string;
  viewBox?: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  fontSize?: "inherit" | "large" | "medium" | "small" | string;
  color?: OverridableStringUnion<
    | "inherit"
    | "action"
    | "disabled"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning",
    IconPropsColorOverrides
  >;
  onClick?: React.MouseEventHandler;
};
export const IconWrapper = ({
  id,
  icon,
  viewBox,
  width,
  height,
  style,
  fontSize,
  color,
  onClick,
}: IconWrapperProps) => {
  const { classes, cx } = useStyles();
  return id ? (
    <svg
      className={cx(classes.iconStyle, classes.spriteSvg)}
      width={width || "45"}
      height={height || "45"}
      viewBox={viewBox || "0 0 50 50"}
      style={{ width: "45px", ...style }}
      onClick={onClick}
    >
      <use xlinkHref={`/assets/img/sprite.svg?v=1.3#${id}`}></use>
    </svg>
  ) : (
    <Icon
      fontSize={fontSize as any}
      baseClassName="icon"
      className={cx(classes.fontIcons, `icon-${icon}`)}
      color={color}
      style={{ ...style }}
      onClick={onClick}
    ></Icon>
  );
};

export type IllustrationsWrapperProps = {
  filename: string;
  asSvg?: boolean;
  imgProps?: ImgHTMLAttributes<HTMLImageElement>;
};
export const IllustrationsWrapper = ({
  filename,
  imgProps = {},
  asSvg = false,
}: IllustrationsWrapperProps) => {
  const theme = useTheme();
  const { style = {}, ...rest } = imgProps;
  const [svgData, setSvgData] = React.useState<string | null>(null);
  const [svgLoadFailed, setSvgLoadFailed] = React.useState(false);
  React.useEffect(() => {
    if (asSvg) {
      fetch(`/assets/img/illustrations/${filename}`)
        .then((t) => t.text())
        .then((data) => {
          data = (data || "")
            .replace(/var\(--primary-fill.+?\)/gi, theme.palette.primary.main)
            .replace(
              /var\(--border-fill.+?\)/gi,
              theme.palette.mode == "dark" ? "#ccc" : "#222222"
            );
          setSvgData(`data:image/svg+xml;base64,${btoa(data)}`);
        })
        .catch(() => setSvgLoadFailed(true));
    }
  }, []);
  return asSvg ? (
    svgData ? (
      <img
        src={svgData}
        style={{ maxWidth: 200, width: "100%", ...style }}
        {...rest}
      />
    ) : (
      <div style={{ minHeight: 180 }}></div>
    )
  ) : (
    <img
      src={`/assets/img/illustrations/${filename}`}
      style={{ maxWidth: 200, width: "100%", ...style }}
      {...rest}
    />
  );
};
