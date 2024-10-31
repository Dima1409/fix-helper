import React, {useState} from "react";
import {FormEvent, ChangeEvent} from "react";
import {createNewStuff} from "../../redux/stuff/operations";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {Stuff} from "../../types/stuffing-boxes";
import {ToastContainer} from "react-toastify";
import {
    Form,
    WrapperForm,
    LabelForm,
    InputForm,
    SelectForm,
    ButtonSubmit
} from "./AddStuffForm.styled";
import {
    nameP,
    typeP,
    positionP,
    diameterP,
    heightP
} from "utils/StuffPatterns"
import Notification from "components/Notify";
import {initialState} from "types/stuffing-boxes";
import useStuff from "hooks/useStuff";
import Spinner from "components/Spinner";

interface AddFormProps {
    closeModal?: () => void
}

const AddStuffForm: React.FC<AddFormProps> = ({closeModal}) => {
    const {isLoading} = useStuff();
    const [formData, setFormData] = useState<Stuff>(initialState);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [result, setResult] = useState<string>("");
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setFormSubmitted(false);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dataToSubmit = { ...formData };
        if (!dataToSubmit.d2) delete dataToSubmit.d2;
        if (!dataToSubmit.h1) delete dataToSubmit.h1;

        await dispatch(createNewStuff(dataToSubmit)).then((res) => {
            if (res.payload._id) {
                setResult("success");
                setFormSubmitted(true);
                setTimeout(() => {
                    if (closeModal) {
                        closeModal();
                    }
                }, 2000);
                return;
            }
            if (
                res.payload.response.data.message ===
                `Stuff ${formData.name} already exists`
            ) {
                setResult("conflict");
                setFormSubmitted(true);
                return;
            } else {
                setResult("error");
                setFormSubmitted(true);
                return;
            }
        });
    };

    return (
        <>
            <ToastContainer position="top-right"/>
            <Form onSubmit={handleSubmit} autoComplete="off">
                {formSubmitted && (
                    <>
                        {result === "success" && (
                            <Notification
                                type="success"
                                message={`Збережено новий артикул ${formData.name}`}
                            />
                        )}
                        {result === "conflict" && (
                            <Notification
                                type="error"
                                message={`Артикул ${formData.name} уже існує`}
                            />
                        )}
                        {result === "error" && (
                            <Notification type="error" message={`Помилка збереження`}/>
                        )}
                    </>
                )}
                <WrapperForm>
                    <LabelForm htmlFor="name">Артикул:</LabelForm>
                    <InputForm
                        type="text"
                        placeholder="Наприклад, F00133A"
                        id="name"
                        name="name"
                        value={formData.name.toUpperCase()}
                        onChange={handleChange}
                        pattern={nameP.source}
                        required
                    />
                </WrapperForm>
                <WrapperForm>
                    <LabelForm htmlFor="type">Tип:</LabelForm>
                    <SelectForm
                        id="type"
                        name="type"
                        value={formData.type.toUpperCase()}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Тип сальника
                        </option>
                        {typeP.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </SelectForm>
                </WrapperForm>
                <WrapperForm>
                    <LabelForm htmlFor="position">Застосування:</LabelForm>
                    <SelectForm
                        id="position"
                        name="position"
                        value={formData.position.toUpperCase()}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Застосування
                        </option>
                        {positionP.map((pos) => (
                            <option key={pos} value={pos}>{pos}</option>
                        ))}
                    </SelectForm>
                </WrapperForm>
                <WrapperForm>
                    <LabelForm htmlFor="d1">d1, мм:</LabelForm>
                    <InputForm
                        type="text"
                        id="d1"
                        name="d1"
                        value={formData.d1.toUpperCase()}
                        onChange={handleChange}
                        pattern={diameterP.source}
                        required
                    />
                </WrapperForm>
                <WrapperForm>
                    <LabelForm htmlFor="d2">d2, мм:</LabelForm>
                    <InputForm
                        type="text"
                        id="d2"
                        name="d2"
                        value={formData.d2?.toUpperCase()}
                        onChange={handleChange}
                        pattern={diameterP.source}
                    />
                </WrapperForm>
                <WrapperForm>
                    <LabelForm htmlFor="D">D, мм:</LabelForm>
                    <InputForm
                        type="text"
                        id="D"
                        name="D"
                        value={formData.D.toUpperCase()}
                        onChange={handleChange}
                        pattern={diameterP.source}
                        required
                    />
                </WrapperForm>
                <WrapperForm>
                    <LabelForm htmlFor="h1">h1, мм:</LabelForm>
                    <InputForm
                        type="text"
                        id="h1"
                        name="h1"
                        value={formData.h1?.toUpperCase()}
                        onChange={handleChange}
                        pattern={heightP.source}
                    />
                </WrapperForm>
                <WrapperForm>
                    <LabelForm htmlFor="D">H, мм:</LabelForm>
                    <InputForm
                        type="text"
                        id="H"
                        name="H"
                        value={formData.H.toUpperCase()}
                        onChange={handleChange}
                        pattern={heightP.source}
                        required
                    />
                </WrapperForm>
                {isLoading ? (
                    <Spinner/>
                ) : (
                    <ButtonSubmit
                        disabled={
                            !nameP.test(formData.name) ||
                            formData.name === "" ||
                            formData.type === "" ||
                            formData.position === "" ||
                            formData.d1 === "" ||
                            !diameterP.test(formData.d1) ||
                            formData.D === "" ||
                            !diameterP.test(formData.D) ||
                            formData.H === "" ||
                            !heightP.test(formData.H)
                        }
                        type="submit"
                    >
                        Зберегти
                    </ButtonSubmit>
                )}
            </Form>
        </>
    );
};

export default AddStuffForm;
