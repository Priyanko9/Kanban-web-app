import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as CheckmarkSvg } from "../assets/icon-check.svg";

const StyledTextbox = styled.input`
  width: 300px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
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
