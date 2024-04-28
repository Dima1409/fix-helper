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
  transition: ${theme.transitions.durations.default};
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
  width: 170px;
  padding: 8px 10px;
  margin: 10px;
  font-size: ${theme.fontSizes.small};
  &:hover {
    box-shadow: 0 0 5px ${theme.colors.accentActive};
    color: ${theme.colors.light};
  }
`;

const AddNewButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  margin-left: 10px;
  font-size: ${theme.fontSizes.small};
  border-radius: ${theme.radii.small};
  background-color: ${theme.colors.accent};
  color: ${theme.colors.light};
  padding: 8px 10px;
  transition: ${theme.transitions.durations.default};
  &:hover,
  &:focus {
    cursor: pointer;
    color: ${theme.colors.light};
    box-shadow: 0 0 5px ${theme.colors.accentActive};
  }
`;

const HeaderNames = styled.h2`
  color: ${theme.colors.accentActive};
`;

const NamesList = styled.li`
  position: relative;
  color: ${theme.colors.accent};
  text-align: center;
  margin: 1px;
  width: 60%;
  padding: 5px 0;
  border: ${theme.borders.normal} ${theme.colors.accent};
  border-radius: ${theme.radii.small};
  transition: ${theme.transitions.durations.default};
  ${theme.mq.tablet} {
    width: 60px;
  }
  &:hover {
    cursor: pointer;
    color: ${theme.colors.accentActive};
    transform: translateX(10%);
  }
`;

const ButtonDelete = styled.button`
  position: absolute;
  left: 110%;
  top: 0;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  border-radius: ${theme.radii.small};
  margin-left: auto;
  transition: ${theme.transitions.durations.default};
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 4px ${theme.colors.accentActive};
  }
`;

export {
  Form,
  Label,
  Input,
  ButtonSearch,
  ShowAll,
  AddNewButton,
  ButtonsWrapper,
  HeaderNames,
  NamesList,
  ButtonDelete,
};
