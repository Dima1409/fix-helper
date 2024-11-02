import styled from "styled-components";
import { theme } from "theme/theme";

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin: 20px auto;
  margin-bottom: 10px;
  max-width: 600px;
  ${theme.mq.tablet} {
    flex-direction: row;
  }
`;

const User = styled.span`
  color: ${theme.colors.accent};
  font-size: ${theme.fontSizes.normal};
  font-family: ${theme.fonts.merriweather};
  font-weight: ${theme.fontWeight.bold};
  margin-top: 10px;
  ${theme.mq.tablet} {
    margin-top: 0;
    margin-right: 10px;
    margin-left: auto;
    font-size: ${theme.fontSizes.small};
  }
`;

const Role = styled.span`
  color: ${theme.colors.accent};
  font-size: ${theme.fontSizes.normal};
  font-family: ${theme.fonts.merriweather};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: 10px;
  ${theme.mq.tablet} {
    margin-bottom: 0;
    margin-right: 10px;
    font-size: ${theme.fontSizes.small};
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
