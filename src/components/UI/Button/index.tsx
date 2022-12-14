import { useMemo } from "react";
import { colors } from "../../../constants/colors";
import styles from "./Button.module.css";

const Button = ({
  children,
  type = "button",
  disabled = false,
  color = colors.turquoise,
  size,
  textColor,
  onClick,
}: {
  children: any;
  type?: "button" | "submit";
  disabled?: boolean;
  color?: string;
  size?: "extraSmall" | "small" | "medium" | "big";
  textColor?: string;
  onClick?: VoidFunction;
}) => {
  const buttonSize = useMemo<string>(() => {
    switch (size) {
      case "extraSmall":
        return styles.extraSmall;
      case "small":
        return styles.small;
      case "medium":
        return styles.medium;
      case "big":
        return styles.big;
      default:
        return styles.medium;
    }
  }, [size]);

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${buttonSize}`}
      style={{
        backgroundColor: color,
        color: textColor,
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
