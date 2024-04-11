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
  color: ${theme.colors.textColor};
  font-weight: 400;
  font-size: ${theme.fontSizes.small};
`;

export { Wrapper, WrapperHeader, NameOfProperty, InfoOfProperty };
