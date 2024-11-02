import styled from "styled-components";
import {theme} from "theme/theme";

const Form = styled.form`
    padding: 20px 0;
`;

const WrapperForm = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`;

const ElemOfProperty = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    border-radius: ${theme.radii.small};
    padding: 2px;
    border: ${theme.borders.medium} ${theme.colors.green};
    border-style: dotted;
`;

const WrapperBaseKit = styled.div`
    border: ${theme.borders.normal} ${theme.colors.light};
    border-radius: ${theme.radii.small};
    padding: 2px;
    margin-bottom: 10px;
`;

const LabelForm = styled.label`
    color: ${theme.colors.accentActive};
    font-size: ${theme.fontSizes.small};
`;

const LabelFormProperty = styled(LabelForm)`
    font-size: ${theme.fontSizes.small};
`;

const InputForm = styled.input`
    text-align: center;
    padding: 4px;
    border: ${theme.borders.normal} transparent;
    outline: none;
    border-radius: ${theme.radii.small};

    &:valid {
        border-color: ${theme.colors.valid};
    }

    &:invalid {
        border-color: ${theme.colors.invalid};
    }
`;

const InputProperty = styled(InputForm)`
    width: 40px;
    margin: 2px;
    font-size: ${theme.fontSizes.extraSmall};

    &::placeholder {
        font-size: ${theme.fontSizes.smallest};
    }

    &:valid {
        border-color: ${theme.colors.valid};
    }

    &:invalid {
        border-color: ${theme.colors.invalid};
    }

    ${theme.mq.tablet} {
        width: 80px;
    }
`;

const WrapperProperty = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 5px;
`;

const SelectForm = styled.select`
    text-align: center;
    padding: 4px;
    border: ${theme.borders.normal} transparent;
    outline: none;
    border-radius: ${theme.radii.small};
    max-width: 145px;

    ${theme.mq.tablet} {
        max-width: 200px;
    }

    &:valid {
        border-color: ${theme.colors.valid};
    }

    &:invalid {
        border-color: ${theme.colors.invalid};
    }
`;

const InputSpec = styled(InputForm)`
    width: 100px;
    min-height: 20px;

    ${theme.mq.tablet} {
        width: 230px;
        min-height: 30px;
    }
`;

const WrapperMore = styled.div`
    width: 100%;
    text-align: center;
`

const InputMore = styled.textarea`
    border: ${theme.borders.normal} transparent;
    margin: 5px;
    width: 80%;
    min-height: 70px;
    outline: none;
    border-radius: ${theme.radii.small};
    padding: 4px;
    white-space: pre-wrap;
    resize: none;

    &:valid {
        border-color: ${theme.colors.valid};
    }

    &:invalid {
        border-color: ${theme.colors.invalid};
    }

    &::placeholder {
        text-align: center;
    }

    ${theme.mq.tablet} {
        width: 450px;
        min-height: 80px;
    }
`;

const AddButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    border-radius: ${theme.radii.small};
    background-color: ${theme.colors.accentActive};
    color: ${theme.colors.light};
    padding: 6px 8px;
    transition: ${theme.transitions.durations.default};

    &:disabled {
        background-color: ${theme.colors.disabled};
    }

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
        cursor: pointer;
        box-shadow: 0 0 6px ${theme.colors.accentActive};
        color: ${theme.colors.light};
    }
`;

const DeleteButton = styled(AddButton)`
    position: absolute;
    background-color: ${theme.colors.darkRed};
    top: 4px;
    right: 4px;

    ${theme.mq.tablet} {
        right: 0;
        top: 0;
    }
`;

const ButtonSubmit = styled(AddButton)`
    margin: 10px auto;
    padding: 10px 20px;
    background-color: ${theme.colors.valid};
`;

export {
    Form,
    WrapperForm,
    WrapperProperty,
    WrapperBaseKit,
    LabelForm,
    LabelFormProperty,
    InputForm,
    InputProperty,
    SelectForm,
    InputSpec,
    WrapperMore,
    InputMore,
    AddButton,
    DeleteButton,
    ButtonSubmit,
    ElemOfProperty,
};
