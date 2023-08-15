import React,{ useState } from "react";
import styled from "styled-components";
import { ReactComponent as CheckmarkSvg } from "../assets/icon-check.svg";

const StyledCheckbox = styled.input`
  appearance: none;
  background-color: ${(props) => (props.checked ? "#635fc7" : "white")};
  width: 15px;
  height: 15px;
  border: 1px solid grey;
`;

const StyledLabel = styled.label`
  position: relative;
`;

const StyledSvgContainer = styled.span`
  position: absolute;
  left: 6px;
`;

const StyledText = styled.span`
  position: relative;
  bottom: 5px;
  text-decoration: ${(props) =>
    props.checked && props.strikeThrough ? "line-through" : "none"};
`;

const Checkbox = ({ textLabel, strikeThrough, checkedState, inputProps }) => {
  const [checked, setIsChecked] = useState(checkedState || false);
  return (
    <>
      <StyledLabel>
        <StyledCheckbox
          type="checkbox"
          onChange={() => setIsChecked(!checked)}
          checked={checked}
          {...inputProps}
        />
        {checked ? (
          <StyledSvgContainer>
            <CheckmarkSvg />
          </StyledSvgContainer>
        ) : null}
      </StyledLabel>
      <StyledText checked={checked} strikeThrough={strikeThrough}>
        {textLabel}
      </StyledText>
    </>
  );
};

export default Checkbox;
