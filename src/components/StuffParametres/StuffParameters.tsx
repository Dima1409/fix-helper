import React, {useState} from "react";
import {Form, Label, Input, SelectForm, InputWrapper, NumberInput, Button, BtnSubmit} from "./StuffParameters.styled";
import {typeP} from "../../utils/StuffPatterns";

const StuffParameters: React.FC = () => {

    const handleStepChange = (e: React.MouseEvent<HTMLButtonElement>, step: number, inputId: string) => {
        const input = document.getElementById(inputId) as HTMLInputElement;
        if (input) {
            const currentValue = parseFloat(input.value) || 0;
            const newValue = currentValue + step;
            if (newValue >= 0 && newValue <= 2) {
                input.value = newValue.toFixed(1);
            }
        }
    };

    const [formData, setFormData] = useState({
        d1: "",
        d1_range: "",
        d2: "",
        d2_range: "",
        D: "",
        D_range: "",
        h1: "",
        h1_range: "",
        H: "",
        H_range: "",
        type: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form values:", formData);
    };

    return <Form onSubmit={handleSubmit}>
        <Label>
            d1
            <Input type="text" name="d1" value={formData.d1} onChange={handleInputChange}/>
            <InputWrapper>
                <Button onClick={(e) => handleStepChange(e, -0.1, "d1-number")}>-</Button>
                <NumberInput
                    id="d1-number"
                    step="0.1"
                    min="0"
                    max="2"
                    value={formData.d1_range}
                    onChange={handleInputChange}
                    placeholder="0"
                />
                <Button onClick={(e) => handleStepChange(e, 0.1, "d1-number")}>+</Button>
            </InputWrapper>
        </Label>
        <Label>
            d2
            <Input type="text" name="d2" value={formData.d2} onChange={handleInputChange}/>
            <InputWrapper>
                <Button onClick={(e) => handleStepChange(e, -0.1, "d2-number")}>-</Button>
                <NumberInput
                    id="d2-number"
                    step="0.1"
                    min="0"
                    max="2"
                    value={formData.d2_range}
                    onChange={handleInputChange}
                    placeholder="0"
                />
                <Button onClick={(e) => handleStepChange(e, 0.1, "d2-number")}>+</Button>
            </InputWrapper>
        </Label>
        <Label>
            D
            <Input type="text" name="D" value={formData.D} onChange={handleInputChange}/>
            <InputWrapper>
                <Button onClick={(e) => handleStepChange(e, -0.1, "D-number")}>-</Button>
                <NumberInput
                    id="D-number"
                    step="0.1"
                    min="0"
                    max="2"
                    value={formData.D_range}
                    onChange={handleInputChange}
                    placeholder="0"
                />
                <Button onClick={(e) => handleStepChange(e, 0.1, "D-number")}>+</Button>
            </InputWrapper>
        </Label>
        <Label>
            h1
            <Input type="text" name="h1" value={formData.h1} onChange={handleInputChange}/>
            <InputWrapper>
                <Button onClick={(e) => handleStepChange(e, -0.1, "h1-number")}>-</Button>
                <NumberInput
                    id="h1-number"
                    step="0.1"
                    min="0"
                    max="2"
                    value={formData.h1_range}
                    onChange={handleInputChange}
                    placeholder="0"
                />
                <Button onClick={(e) => handleStepChange(e, 0.1, "h1-number")}>+</Button>
            </InputWrapper>
        </Label>
        <Label>
            H
            <Input type="text" name="H" value={formData.H} onChange={handleInputChange}/>
            <InputWrapper>
                <Button onClick={(e) => handleStepChange(e, -0.1, "H-number")}>-</Button>
                <NumberInput
                    id="H-number"
                    step="0.1"
                    min="0"
                    max="2"
                    value={formData.H_range}
                    onChange={handleInputChange}
                    placeholder="0"
                />
                <Button onClick={(e) => handleStepChange(e, 0.1, "H-number")}>+</Button>
            </InputWrapper>
        </Label>
        <Label>
            Тип
            <SelectForm
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
            >
                <option value="" disabled>
                    Тип
                </option>
                {typeP.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </SelectForm>
        </Label>
        <BtnSubmit>Пошук</BtnSubmit>
    </Form>
}

export default StuffParameters