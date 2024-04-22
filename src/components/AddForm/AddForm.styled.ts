import styled from "styled-components";
import { theme } from "theme/theme";

const Form = styled.form`
  padding: 20px 0px;
`;

const WrapperForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const WrapperBaseKit = styled.div`
  border: ${theme.borders.normal} ${theme.colors.light};
  border-radius: ${theme.radii.small};
  padding: 2px;
  margin-bottom: 10px;
`;

const LabelForm = styled.label`
  color: ${theme.colors.accentActive};
  font-size: ${theme.fontSizes.small};
`;

const LabelFormProperty = styled(LabelForm)`
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

const InputProperty = styled(InputForm)`
  width: 40px;
  margin: 2px;
  font-size: ${theme.fontSizes.extraSmall};
  ${theme.mq.tablet} {
    width: 80px;
  }
`;

const WrapperProperty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectForm = styled.select`
  text-align: center;
  padding: 4px;
  border: none;
  outline: none;
  border-radius: ${theme.radii.small};
`;

const InputSpec = styled(InputForm)`
  width: 100px;
  min-height: 40px;
  ${theme.mq.tablet} {
    width: 260px;
    min-height: 60px;
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
    background-color: ${theme.colors.expensesHeader};
  }
  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    cursor: pointer;
    box-shadow: 0 0 6px ${theme.colors.accentActive};
    color: ${theme.colors.light};
  }
`;

const DeleteButton = styled(AddButton)`
  background-color: ${theme.colors.darkRed};
`;

const ButtonSubmit = styled(AddButton)`
  margin: 10px auto;
  padding: 10px 20px;
  background-color: ${theme.colors.valid};
`;

export {
  Form,
  WrapperForm,
  WrapperProperty,
  WrapperBaseKit,
  LabelForm,
  LabelFormProperty,
  InputForm,
  InputProperty,
  SelectForm,
  InputSpec,
  AddButton,
  DeleteButton,
  ButtonSubmit,
};
