import styled from "styled-components";
import {theme} from "theme/theme";

const Wrapper = styled.div`
    margin: 0 auto;

    ${theme.mq.tablet} {
        width: 700px;
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

const PropertyWrapper = styled.div`
    border: 1px dotted ${theme.colors.accent};
    margin-bottom: 12px;
    border-radius: ${theme.radii.small};
    padding: 0 8px;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const NameOfProperty = styled.div`
    color: ${theme.colors.dark};
    word-wrap: break-word;
    margin-bottom: 18px;
    font-size: ${theme.fontSizes.small};
    border: 1px dotted ${theme.colors.transfers};
    border-radius: ${theme.radii.small};
    padding: 4px 2px;
    ${theme.mq.tablet} {
        font-size: ${theme.fontSizes.normal};
        padding: 10px 8px;
    }
`;

const HeadOfProperty = styled.span`
    color: ${theme.colors.accentActive};
    font-weight: 800;
    font-size: ${theme.fontSizes.bold};
    text-align: right;

    ${theme.mq.tablet} {
        margin-left: auto;
    }
`;

const InfoOfProperty = styled(HeadOfProperty)`
    font-size: ${theme.fontSizes.small};
    font-weight: 400;
`;

const MoreButton = styled.button`
    width: 30px;
    height: 30px;
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

const PhotoTitle = styled.h3`
    margin-bottom: 10px;
    text-align: center;
    padding: 10px;
    color: ${theme.colors.valid};
`;

const ImagesWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    max-width: 500px;
    margin: 0 auto;
`;

const ImageWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export {
    Wrapper,
    WrapperHeader,
    WrapperHeaderError,
    PropertyWrapper,
    NameOfProperty,
    HeadOfProperty,
    InfoOfProperty,
    ButtonWrapper,
    MoreButton,
    EditButton,
    ImagesWrapper,
    ImageWrapper,
    PhotoTitle,
};
