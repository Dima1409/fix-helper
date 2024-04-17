import styled from "styled-components";
import { theme } from "theme/theme";

const LabelForm = styled.label`
  margin-bottom: 6px;
  color: ${theme.colors.accentActive};
`;

const InputForm = styled.input`
  width: 70px;
  text-align: center;
  margin: 2px;
  padding: 4px;
  border: none;
  outline: none;
  border-radius: ${theme.radii.small};
`;

const SelectForm = styled.select`
  width: 120px;
  text-align: center;
  padding: 4px;
  border: none;
  outline: none;
  border-radius: ${theme.radii.small};
`;

const TextAreaForm = styled.textarea`
  width: 200px;
`;

export { LabelForm, InputForm, SelectForm, TextAreaForm };
