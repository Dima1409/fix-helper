import styled from "styled-components";
import { theme } from "../../theme/theme";

const Form = styled.form`
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(6, 1fr);
    }
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    color: ${theme.colors.accent};
    max-width: 80px;
    margin: 0 auto;
`;

const Input = styled.input`
    margin-top: 4px;
    padding: 8px;
    font-size: 14px;
    border: 1px solid ${theme.colors.accentActive};
    border-radius: ${theme.radii.small};
    outline: none;
    width: 100%;
    text-align: center;

    &:focus {
        border-color: ${theme.colors.accentActive};
    }
`

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    width: 100%;
`;

const NumberInput = styled.input`
    width: 20px;
    text-align: center;
    padding: 6px;
    font-size: 14px;
    border: 1px solid ${theme.colors.accentActive};
    border-radius: ${theme.radii.small};
    margin: 2px;
    outline: none;

    &:focus {
        border-color: ${theme.colors.accentActive};
    }
`;

const SelectForm = styled.select`
  text-align: center;
  padding: 6px;
    margin: 2px;
  border: ${theme.borders.normal} transparent;
  outline: none;
  border-radius: ${theme.radii.small};
  max-width: 200px;
  &:valid {
    border-color: ${theme.colors.accentActive};
  }
  &:invalid {
    border-color: ${theme.colors.invalid};
  }
`;

const Button = styled.button`
    padding: 0 12px;
    font-size: 16px;
    color: white;
    background-color: ${theme.colors.accentActive};
    border: none;
    cursor: pointer;

    &:first-child {
        border-radius: 4px 0 0 4px;
    }

    &:last-child {
        border-radius: 0 4px 4px 0;
    }

    &:hover {
        background-color: ${theme.colors.accentActive};
    }

    &:active {
        background-color: ${theme.colors.accentActive};
    }
`;


const BtnSubmit = styled.button`
    grid-column: 1 / -1;
    justify-self: center;
    align-self: end;
    padding: 12px 24px;
    font-size: 16px;
    color: white;
    background-color: ${theme.colors.valid};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${theme.colors.accentActive};
    }

    &:active {
        background-color: ${theme.colors.accentActive};
    }
`

export { Form, Label, Input, BtnSubmit, InputWrapper, NumberInput, SelectForm, Button};
