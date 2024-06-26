import styled from "styled-components";
import { Form, Field } from "formik";
import { theme } from "theme/theme";

const FormLogin = styled(Form)`
  background-color: ${theme.colors.accentActive};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 8px;
  border-radius: ${theme.radii.small};
  ${theme.mq.tablet} {
    width: 560px;
    margin: 0 auto;
  }
`;

const FormLabel = styled.label`
  position: relative;
  color: ${theme.colors.light};
  font-family: ${theme.fonts.comfortaa};
  font-size: ${theme.fontSizes.small};
  margin-bottom: 20px;
  ${theme.mq.tablet} {
    width: 300px;
    font-size: ${theme.fontSizes.normal};
    margin-bottom: 40px;
  }
`;

const FormInput = styled(Field)`
  display: block;
  margin: 8px 0;
  padding: 6px 8px;
  background-color: ${theme.colors.accent};
  outline: none;
  color: ${theme.colors.light};
  font-family: ${theme.fonts.merriweather};
  font-size: ${theme.fontSizes.normal};
  border: ${theme.borders.normal} transparent;
  border-radius: ${theme.radii.small};
  min-height: 22px;
  &.success {
    border-color: ${theme.colors.valid};
  }
  &.error {
    border-color: ${theme.colors.invalid};
  }
  ${theme.mq.tablet} {
    width: 100%;
  }
`;

const ButtonShow = styled.button`
  border: none;
  width: 40px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${theme.radii.small};
  background-color: ${theme.colors.accent};
  position: absolute;
  right: 0;
  top: 0;
  &:hover {
    cursor: pointer;
  }
  ${theme.mq.tablet} {
    left: 92%;
    top: 2%;
  }
`;

const ButtonSubmit = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border: none;
  padding: 6px 18px;
  border-radius: ${theme.radii.small};
  font-size: ${theme.fontSizes.bold};
  color: ${theme.colors.light};
  opacity: 0.5;
  transition: 0.25s;
  min-height: 20px;
  min-width: 120px;
  &:enabled {
    opacity: 1;
    background-color: ${theme.colors.accent};
  }
  &:hover {
    cursor: pointer;
  }
`;

export { FormLogin, FormLabel, FormInput, ButtonShow, ButtonSubmit };
