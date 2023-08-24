import React,{FC,InputHTMLAttributes} from "react";
import styled from "styled-components";

interface StyledTextboxProps extends InputHTMLAttributes<HTMLInputElement>{
  isError: boolean;
}

const StyledTextbox = styled.input<StyledTextboxProps>`
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 5px;
  border-radius: 5px;
  ${(props) => (props.isError ? `border:1px solid red;` : ``)}
  height: 25px;
`;

const StyledLabel = styled.label`
  position: relative;
`;

const Textbox:FC<StyledTextboxProps> = (props) => {
  return (
    <>
      <StyledLabel>
        <StyledTextbox type="text" {...props} />
      </StyledLabel>
    </>
  );
};

export default Textbox;
