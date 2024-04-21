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
  border: none;
  outline: none;
  border-radius: ${theme.radii.small};
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

const TextAreaForm = styled.textarea`
  width: 100px;
  border: none;
  padding: 2px 6px;
  outline: none;
  margin: 2px;
  border-radius: ${theme.radii.small};
  resize: none;
  ${theme.mq.tablet} {
    width: 200px;
  }
`;

const TextAreaSpec = styled(TextAreaForm)`
  width: 200px;
  min-height: 60px;
  ${theme.mq.tablet} {
    width: 450px;
    min-height: 90px;
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
  &:hover,
  &:focus {
    cursor: pointer;
    background-color: ${theme.colors.accentActive};
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
  WrapperProperty,
  WrapperBaseKit,
  LabelForm,
  LabelFormProperty,
  InputForm,
  InputProperty,
  SelectForm,
  TextAreaForm,
  TextAreaSpec,
  AddButton,
  ButtonSubmit,
};
