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
  ${theme.mq.tablet} {
    width: 300px;
  }
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
  width: 80px;
  &:enabled {
    opacity: 1;
    background-color: ${theme.colors.accent};
  }
  &:hover {
    cursor: pointer;
  }
  ${theme.mq.tablet} {
    width: 140px;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShowAll = styled(ButtonSearch)`
  width: 150px;
  padding: 4px 10px;
  margin: 10px;
  &:hover {
    box-shadow: 0 0 5px ${theme.colors.accentActive};
  }
`;

const HeaderNames = styled.h2`
  color: ${theme.colors.accentActive};
`;

const NamesList = styled.li`
  color: ${theme.colors.accent};
  text-align: center;
  margin: 1px;
  width: 60px;
  border: ${theme.borders.normal} ${theme.colors.accent};
  border-radius: ${theme.radii.small};
  transition: ${theme.transitions.durations.default};
  &:hover {
    cursor: pointer;
    color: ${theme.colors.accentActive};
    transform: translateX(10%);
  }
`;

export {
  Form,
  Label,
  Input,
  ButtonSearch,
  ShowAll,
  ButtonsWrapper,
  HeaderNames,
  NamesList,
};
