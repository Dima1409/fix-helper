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
`;

const InfoOfProperty = styled.span`
  position: relative;
  color: ${theme.colors.textColor};
  font-weight: 400;
  font-size: ${theme.fontSizes.small};
`;

const MoreButton = styled.button`
  position: absolute;
  width: 80px;
  left: 110%;
  top: 50%;
  transform: translateY(-50%);
  background-color: none;
  border-radius: ${theme.radii.normal};
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

export { Wrapper, WrapperHeader, NameOfProperty, InfoOfProperty, MoreButton };
