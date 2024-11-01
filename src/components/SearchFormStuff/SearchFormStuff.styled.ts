import styled from "styled-components";
import { theme } from "theme/theme";

const Form = styled.form`
  display: grid;
  grid-template-columns: 140px 70px;
  justify-content: space-between;
  padding: 20px 10px;
  border-radius: 10px;
  margin: 20px auto 10px;
  background-color: ${theme.colors.accentActive};
  ${theme.mq.tablet} {
    width: 560px;
    justify-content: space-around;
    grid-template-columns: 250px 150px;
  }
`;

const Label = styled.label`
  font-family: ${theme.fonts.merriweather};
`;
const Input = styled.input`
  font-family: ${theme.fonts.comfortaa};
  min-height: 40px;
  border: none;
  outline: none;
  border-radius: ${theme.radii.small};
  width: 100%;
  padding-left: 10px;
  font-size: ${theme.fontSizes.normal};
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
  &:enabled {
    opacity: 1;
    background-color: ${theme.colors.accent};
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px ${theme.colors.accent};
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  margin: 10px;
`;

const ShowAll = styled(ButtonSearch)`
  width: 170px;
  padding: 8px 10px;
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

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px dotted ${theme.colors.accent};
  border-radius: ${theme.radii.small};
  padding: 10px 0;
  margin-bottom: 10px;
  ${theme.mq.tablet} {
    grid-template-columns: repeat(5, 1fr);
  }
  ${theme.mq.desktop} {
    grid-template-columns: repeat(10, 1fr);
  }
`;

const NamesList = styled.li`
  position: relative;
  justify-self: center;
  align-self: center;
  color: ${theme.colors.accent};
  text-align: center;
  margin: 1px;
  width: 45%;
  padding: 5px 0;
  border: ${theme.borders.normal} ${theme.colors.accent};
  border-radius: ${theme.radii.small};
  transition: ${theme.transitions.durations.default};
  ${theme.mq.tablet} {
    width: 70px;
  }
  &:hover {
    cursor: pointer;
    color: ${theme.colors.accentActive};
    transform: translateX(10%);
  }
`;

const ButtonDelete = styled.button`
  position: absolute;
  left: 104%;
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
  ${theme.mq.tablet} {
    left: 110%;
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
  StyledList,
  NamesList,
  ButtonDelete,
};
