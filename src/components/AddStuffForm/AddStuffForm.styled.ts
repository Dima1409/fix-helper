import styled from "styled-components";
import { theme } from "theme/theme";

const Form = styled.form`
  padding: 20px 0;
`;

const WrapperForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const LabelForm = styled.label`
  color: ${theme.colors.accentActive};
  font-size: ${theme.fontSizes.small};
`;

const InputForm = styled.input`
  text-align: center;
  padding: 4px;
  border: ${theme.borders.normal} transparent;
  outline: none;
  border-radius: ${theme.radii.small};
  &:valid {
    border-color: ${theme.colors.valid};
  }
  &:invalid {
    border-color: ${theme.colors.invalid};
  }
`;

const SelectForm = styled.select`
  text-align: center;
  padding: 4px;
  border: ${theme.borders.normal} transparent;
  outline: none;
  border-radius: ${theme.radii.small};
  max-width: 200px;
  &:valid {
    border-color: ${theme.colors.valid};
  }
  &:invalid {
    border-color: ${theme.colors.invalid};
  }
`;

const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  border-radius: ${theme.radii.small};
  background-color: ${theme.colors.accentActive};
  color: ${theme.colors.light};
  padding: 6px 8px;
  transition: ${theme.transitions.durations.default};
  &:disabled {
    background-color: ${theme.colors.disabled};
  }
  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    cursor: pointer;
    box-shadow: 0 0 6px ${theme.colors.accentActive};
    color: ${theme.colors.light};
  }
`;

const ButtonSubmit = styled(AddButton)`
  margin: 10px auto;
  padding: 10px 20px;
  background-color: ${theme.colors.valid};
`;

export {
  Form,
  WrapperForm,
  LabelForm,
  InputForm,
  SelectForm,
  AddButton,
  ButtonSubmit,
};
