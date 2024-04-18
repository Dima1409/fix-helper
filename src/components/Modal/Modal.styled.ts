import styled from "styled-components";
import { theme } from "theme/theme";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

const Modal = styled.div`
  background-color: ${theme.colors.accent};
  padding: 50px 30px;
  border-radius: ${theme.radii.small};
  max-width: calc(100vw - 70px);
  max-height: calc(100vh - 120px);
  margin: 10px;
  overflow-y: auto;
  ${theme.mq.tablet} {
    position: relative;
    width: 500px;
    padding: 55px 40px;
    margin: 40px;
  }
`;
const ButtonClose = styled.button`
  position: fixed;
  border: none;
  border-radius: ${theme.radii.small};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  top: 15px;
  right: 15px;
  transition: 0.3s;
  z-index: 1300;
  ${theme.mq.tablet} {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 12px;
    right: 12px;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 5px ${theme.colors.accentActive};
  }
`;

export { Overlay, Modal, ButtonClose };
