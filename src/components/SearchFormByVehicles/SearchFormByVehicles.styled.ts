import styled from 'styled-components';
import {theme} from "../../theme/theme";

const RacksList = styled.ul`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
    margin-top: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const NamesList = styled.li`
    position: relative;
    justify-self: center;
    align-self: center;
    color: ${theme.colors.accent};
    text-align: center;
    width: 100%;
    height: 100%;
    margin: 1px;
    padding: 5px 0;
    border: ${theme.borders.normal} ${theme.colors.accent};
    border-radius: ${theme.radii.small};
    transition: ${theme.transitions.durations.default};

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 8px ${theme.colors.accent};
    }
`;

export {
    RacksList,
    NamesList
}