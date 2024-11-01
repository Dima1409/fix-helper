import styled from "styled-components";
import {theme} from "theme/theme";

const TabsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`

const Tab = styled.div<{ isActive: boolean }>`
    padding: 10px 20px;
    cursor: pointer;
    color: ${theme.colors.light};
    background-color: ${({isActive}) => (isActive ? `${theme.colors.accentActive}` : `${theme.colors.spinner}`)};
    margin: 0 5px;
    border-radius: 5px;
    transition: ${theme.transitions.durations.default};

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 5px ${theme.colors.accentActive};
    }
`

const TabContent = styled.div`
    padding: 20px 0;
    border-top: 1px solid #ccc;
    border-radius: 0 5px 5px 5px;
    margin-top: 4px;
`;

export {
    TabsContainer,
    Tab,
    TabContent
}