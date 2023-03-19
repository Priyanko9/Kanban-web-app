import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  background: ${(props) =>
    props.isSecondary
      ? props.theme.button.secondary.bgcolor
      : props.isDestructive
      ? props.theme.button.destructive.bgcolor
      : props.theme.button.primary.bgcolor};
  border-radius: 25px;
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
  margin-top: 10px;
  color: ${(props) =>
    props.isSecondary
      ? props.theme.button.secondary.textColor
      : props.isDestructive
      ? props.theme.button.destructive.textColor
      : props.theme.button.primary.textColor};
  border: 1px solid
    ${(props) =>
      props.isSecondary
        ? props.theme.button.secondary.bgcolor
        : props.isDestructive
        ? props.theme.button.destructive.bgcolor
        : props.theme.button.primary.bgcolor};
  cursor: pointer;
  margin-right: 5px;
  margin-left: 5px;
`;

const Button = (props) => {
  const { children } = props;
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
