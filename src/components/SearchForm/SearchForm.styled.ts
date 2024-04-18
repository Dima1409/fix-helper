import styled from "styled-components";
import { theme } from "theme/theme";

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  border-radius: 10px;
  margin: 0 auto;
  width: 230px;
  background-color: ${theme.colors.accentActive};
  ${theme.mq.tablet} {
    width: 560px;
  }
`;

const Label = styled.label`
  font-family: ${theme.fonts.merriweather};
  width: 120px;
`;
const Input = styled.input`
  font-family: ${theme.fonts.comfortaa};
  min-height: 40px;
  border: none;
  outline: none;
  border-radius: ${theme.radii.small};
  width: 100%;
  padding-left: 10px;
  color: ${theme.colors.accentActive};
  &::placeholder {
    color: ${theme.colors.accentActive};
  }
  ${theme.mq.tablet} {
    font-size: ${theme.fontSizes.normal};
  }
`;

const ButtonSearch = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: ${theme.radii.small};
  font-size: ${theme.fontSizes.bold};
  color: ${theme.colors.light};
  opacity: 0.5;
  transition: 0.25s;
  min-height: 20px;
  min-width: 80px;
  &:enabled {
    opacity: 1;
    background-color: ${theme.colors.accent};
  }
  &:hover {
    cursor: pointer;
  }
`;

export { Form, Label, Input, ButtonSearch };
