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

const WrapperHeaderError = styled(WrapperHeader)`
  color: ${theme.colors.darkRed};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NameOfProperty = styled.div`
  color: ${theme.colors.dark};
  font-size: ${theme.fontSizes.normal};
  word-wrap: break-word;
  margin-bottom: 18px;
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

const EditButton = styled(MoreButton)`
  margin-left: 12px;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  position: 0;
  margin: 0 auto;
  width: auto;
  font-size: ${theme.fontSizes.smallest};
  overflow-x: auto;
  ${theme.mq.tablet} {
    font-size: ${theme.fontSizes.small};
  }
`;

const StyledTh = styled.th`
  border: 1px solid ${theme.colors.light};
  padding: 2px;
  text-align: center;
  color: ${theme.colors.accentActive};
  white-space: nowrap;
`;

const StyledTd = styled.td`
  border: 1px solid ${theme.colors.light};
  padding: 2px;
  color: ${theme.colors.dark};
  text-align: center;
  font-size: ${theme.fontSizes.smallest};
  white-space: nowrap;
  &:last-child {
    text-align: start;
  }
  ${theme.mq.tablet} {
    font-size: ${theme.fontSizes.normal};
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export {
  Wrapper,
  WrapperHeader,
  WrapperHeaderError,
  NameOfProperty,
  InfoOfProperty,
  ButtonWrapper,
  MoreButton,
  EditButton,
  StyledTable,
  StyledTh,
  StyledTd,
  ImageWrapper,
};
