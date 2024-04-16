import styled from "styled-components";
import { theme } from "theme/theme";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 300px;
  ${theme.mq.tablet} {
    width: 600px;
  }
`;

const WrapperHeader = styled.h2`
  color: ${theme.colors.accentActive};
  text-align: center;
  font-size: ${theme.fontSizes.extraBold};
`;

const NameOfProperty = styled.p`
  color: ${theme.colors.accentActive};
  font-size: ${theme.fontSizes.bold};
  font-weight: 500;
  word-wrap: break-word;
  margin-bottom: 8px;
`;

const InfoOfProperty = styled.span`
  position: relative;
  color: ${theme.colors.textColor};
  font-weight: 400;
  font-size: ${theme.fontSizes.small};
`;

const MoreButton = styled.button`
  position: absolute;
  left: 110%;
  top: 50%;
  width: 30px;
  height: 30px;
  transform: translateY(-50%);
  background-color: none;
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
  MoreButton,
  StyledTable,
  StyledTh,
  StyledTd,
};
