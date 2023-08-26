import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  width: 100%;
  padding: 5px;
`;

interface SelectBoxProps {
  defaultValue: string;
  defaultName: string;
  optionList?: string[];
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  defaultValue,
  defaultName,
  optionList,
  onChange,
  ...props
}) => {
  return (
    <StyledSelect onChange={onChange} {...props}>
      <option value={defaultValue}>{defaultName}</option>
      {optionList &&
        optionList.length > 0 &&
        optionList.map((ele) => (
          <option value={ele} key={ele}>
            {ele}
          </option>
        ))}
    </StyledSelect>
  );
};

export default SelectBox;
