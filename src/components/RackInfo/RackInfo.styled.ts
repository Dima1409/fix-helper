import styled from "styled-components";
import { theme } from "theme/theme";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 260px;
  ${theme.mq.tablet} {
    width: 760px;
  }
`;

const WrapperHeader = styled.h2`
  color: ${theme.colors.valid};
  text-align: center;
  font-size: ${theme.fontSizes.extraBold};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NameOfProperty = styled.p`
  color: ${theme.colors.dark};
  font-size: ${theme.fontSizes.normal};
  word-wrap: break-word;
  margin-bottom: 10px;
`;

const InfoOfProperty = styled.span`
  color: ${theme.colors.accentActive};
  font-weight: 400;
  font-size: ${theme.fontSizes.small};
  ${theme.mq.tablet} {
    margin-left: auto;
  }
`;

const MoreButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: none;
  margin-left: 10px;
  border-radius: ${theme.radii.small};
  border: none;
  background-color: ${theme.colors.accent};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: ${theme.transitions.durations.default};
  &:hover,
  &:focus {
    cursor: pointer;
    background-color: ${theme.colors.accentActive};
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
  border-radius: ${theme.radii.small};
  background-color: ${theme.colors.accent};
  color: ${theme.colors.light};
  padding: 8px;
  &:hover,
  &:focus {
    cursor: pointer;
    background-color: ${theme.colors.accentActive};
    color: ${theme.colors.light};
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const StyledTh = styled.th`
  border: 1px solid ${theme.colors.light};
  padding: 8px;
  text-align: center;
  color: ${theme.colors.accentActive};
`;

const StyledTd = styled.td`
  border: 1px solid ${theme.colors.light};
  padding: 8px;
  text-align: center;
  font-size: ${theme.fontSizes.extraSmall};
  ${theme.mq.tablet} {
    font-size: ${theme.fontSizes.small};
  }
`;

export {
  Wrapper,
  WrapperHeader,
  NameOfProperty,
  InfoOfProperty,
  ButtonWrapper,
  MoreButton,
  AddNewButton,
  StyledTable,
  StyledTh,
  StyledTd,
};
