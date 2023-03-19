import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as CheckmarkSvg } from "../assets/icon-check.svg";

const StyledTextbox = styled.input`
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  ${(props) => (props.isError ? `border:1px solid red;` : ``)}
  height: 25px;
`;

const StyledLabel = styled.label`
  position: relative;
`;

const Textbox = (props) => {
  return (
    <>
      <StyledLabel>
        <StyledTextbox type="text" {...props} />
      </StyledLabel>
    </>
  );
};

export default Textbox;
