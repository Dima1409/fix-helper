import styled from "styled-components";
import { theme } from "theme/theme";

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 10px;
  max-width: 600px;
`;

const User = styled.p`
  color: ${theme.colors.accent};
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.merriweather};
  font-weight: ${theme.fontWeight.bold};
  text-transform: uppercase;
  margin-left: auto;
  margin-right: 10px;
  ${theme.mq.tablet} {
    font-size: ${theme.fontSizes.bold};
  }
`;

const Role = styled.p`
  color: ${theme.colors.accent};
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.merriweather};
  font-weight: ${theme.fontWeight.bold};
  margin-right: 10px;
  ${theme.mq.tablet} {
    font-size: ${theme.fontSizes.bold};
  }
`;

const Logout = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 30px;
  height: 30px;
  padding: 4px;
  background-color: ${theme.colors.accent};
  border: none;
  border-radius: ${theme.radii.round};
  color: ${theme.colors.dark};
  &:hover {
    cursor: pointer;
  }
`;

export { UserWrapper, User, Role, Logout };
