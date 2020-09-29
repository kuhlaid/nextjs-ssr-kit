/* eslint-disable react/button-has-type */
import styled from "@emotion/styled";
import { ButtonProps } from "~types";

const StyledButton = ({
  dataTestId,
  disabled,
  className,
  children,
  onClick,
  style,
  type,
}: ButtonProps): JSX.Element => (
  <button
    data-testid={dataTestId}
    disabled={disabled}
    type={type}
    className={className}
    onClick={onClick}
    style={style}
  >
    {children}
  </button>
);

const Button = styled(StyledButton)`
  cursor: pointer;
  color: ${({ danger, primary }) => {
    if (primary || danger) return "#fff";
    return "#ccc";
  }};
  background: ${({ danger, primary }) => {
    if (primary) return "#0076ff";
    if (danger) return "#e60f00";
    return "#000";
  }};
  border: 1px solid
    ${({ danger, primary }) => {
      if (primary) return "#0076ff";
      if (danger) return "#e60f00";
      return "transparent";
    }};
  font-size: 16px;
  padding: ${({ padding }) => padding || "0.5rem 2rem"};
  text-align: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  text-transform: uppercase;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 2px 7px 0
    ${({ danger, primary }) => {
      if (primary) return "rgba(3, 77, 243, 0.39);";
      if (danger) return "rgba(239, 52, 52, 0.39);";
      return "rgba(130, 130, 130, 0.19);";
    }};

  :hover {
    text-decoration: none;
    color: #fff;
    background: ${({ danger, primary }) => {
      if (primary) return "#006ae6";
      if (danger) return "#d71002";
      return "#000";
    }};
    box-shadow: 0 3px 10px 0
      ${({ danger, primary }) => {
        if (primary) return "rgba(3, 77, 243, 0.39);";
        if (danger) return "rgba(239, 52, 52, 0.39);";
        return "rgba(140, 140, 140, 0.39);";
      }};
  }
`;

export default Button;
/* eslint-enable react/button-has-type */
