import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Form, Label, Input, SelectForm, InputWrapper, NumberInput, Button, BtnSubmit} from "./StuffParameters.styled";
import {typeP} from "../../utils/StuffPatterns";
import {getByParameters} from "../../redux/stuff/operations";
import {ThunkDispatch} from "@reduxjs/toolkit";

interface FormData {
    d1: string;
    range_d1: string;
    d2: string;
    range_d2: string;
    D: string;
    range_D: string;
    h1: string;
    range_h1: string;
    H: string;
    range_H: string;
    type: string;
}

// interface SearchResult {
//     _id: string;
//     name: string;
//     type: string;
//     position: string;
//     d1: string;
//     d2: string;
//     h1: string;
//     H: string;
//     D: string;
// }

const StuffParameters: React.FC = () => {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const [results, setResults] = useState<any[]>([]);

    const handleStepChange = (step: number, inputName: keyof FormData) => {
        setFormData((prevData) => {
            const currentValue = parseFloat(prevData[inputName] || "0");
            const newValue = currentValue + step;
            if (newValue >= 0 && newValue <= 2) {
                return {
                    ...prevData,
                    [inputName]: newValue.toFixed(1),
                };
            }
            return prevData;
        });
    };


    const [formData, setFormData] = useState({
        d1: "",
        range_d1: "",
        d2: "",
        range_d2: "",
        D: "",
        range_D: "",
        h1: "",
        range_h1: "",
        H: "",
        range_H: "",
        type: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const params: Record<string, any> = {};
            for (const key in formData) {
                if (formData[key as keyof typeof formData] !== "") {
                    params[key] = key.includes("range")
                        ? parseFloat(formData[key as keyof typeof formData])
                        : formData[key as keyof typeof formData];
                }
            }

            const result = await dispatch(getByParameters(params));
            if (Array.isArray(result.payload)) {
                setResults(result.payload);
            } else {
                setResults([]);
            }
        } catch (err) {
            console.error("Ошибка при поиске:", err);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Label>
                    d1
                    <Input type="text" name="d1" value={formData.d1} onChange={handleInputChange}/>
                    <InputWrapper>
                        <Button type='button' onClick={() => handleStepChange(-0.1, "range_d1")}>-</Button>
                        <NumberInput
                            name="range_d1"
                            step="0.1"
                            min="0"
                            max="2"
                            value={formData.range_d1}
                            onChange={handleInputChange}
                            placeholder="0"
                        />
                        <Button type='button' onClick={() => handleStepChange(0.1, "range_d1")}>+</Button>
                    </InputWrapper>
                </Label>

                <Label>
                    d2
                    <Input type="text" name="d2" value={formData.d2} onChange={handleInputChange}/>
                    <InputWrapper>
                        <Button type='button' onClick={() => handleStepChange(-0.1, "range_d2")}>-</Button>
                        <NumberInput
                            id="range_d2"
                            step="0.1"
                            min="0"
                            max="2"
                            value={formData.range_d2}
                            onChange={handleInputChange}
                            placeholder="0"
                        />
                        <Button type='button' onClick={() => handleStepChange(0.1, "range_d2")}>+</Button>
                    </InputWrapper>
                </Label>
                <Label>
                    D
                    <Input type="text" name="D" value={formData.D} onChange={handleInputChange}/>
                    <InputWrapper>
                        <Button type='button' onClick={() => handleStepChange(-0.1, "range_D")}>-</Button>
                        <NumberInput
                            id="range_D"
                            step="0.1"
                            min="0"
                            max="2"
                            value={formData.range_D}
                            onChange={handleInputChange}
                            placeholder="0"
                        />
                        <Button type='button' onClick={() => handleStepChange(0.1, "range_D")}>+</Button>
                    </InputWrapper>
                </Label>
                <Label>
                    h1
                    <Input type="text" name="h1" value={formData.h1} onChange={handleInputChange}/>
                    <InputWrapper>
                        <Button type='button' onClick={() => handleStepChange(-0.1, "range_h1")}>-</Button>
                        <NumberInput
                            id="range_h1"
                            step="0.1"
                            min="0"
                            max="2"
                            value={formData.range_h1}
                            onChange={handleInputChange}
                            placeholder="0"
                        />
                        <Button type='button' onClick={() => handleStepChange(0.1, "range_h1")}>+</Button>
                    </InputWrapper>
                </Label>
                <Label>
                    H
                    <Input type="text" name="H" value={formData.H} onChange={handleInputChange}/>
                    <InputWrapper>
                        <Button type='button' onClick={() => handleStepChange(-0.1, "range_H")}>-</Button>
                        <NumberInput
                            id="range_H"
                            step="0.1"
                            min="0"
                            max="2"
                            value={formData.range_H}
                            onChange={handleInputChange}
                            placeholder="0"
                        />
                        <Button type='button' onClick={() => handleStepChange(0.1, "range_H")}>+</Button>
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
            {results.length > 0 && (
                <ul>
                    {results.map((item) => (
                        <li key={item._id} style={{border: "1px solid gray", margin: "10px", padding: "10px"}}>
                            <strong>Арт:</strong> {item.name} <br/>
                            <strong>Тип:</strong> {item.type} <br/>
                            <strong>Застосування:</strong> {item.position} <br/>
                            <strong>d1:</strong> {item.d1} <br/>
                            {item.d2 && <><strong>d2:</strong> {item.d2} <br/></>}
                            <strong>D:</strong> {item.D} <br/>
                            {item.h1 && <><strong>h1:</strong> {item.h1} <br/></>}
                            <strong>H:</strong> {item.H}
                        </li>
                    ))}
                </ul>
            )}
        </>
    )

}

export default StuffParameters