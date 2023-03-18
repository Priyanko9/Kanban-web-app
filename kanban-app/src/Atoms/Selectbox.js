import styled from "styled-components";

const StyledSelect = styled.select`
  width: 100%;
  padding: 5px;
`;

const SelectBox = ({
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
