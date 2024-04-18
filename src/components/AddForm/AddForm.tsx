import React, { useState } from "react";
import { FormEvent, ChangeEvent } from "react";
import {
  Form,
  WrapperForm,
  WrapperProperty,
  WrapperBaseKit,
  LabelForm,
  LabelFormProperty,
  InputForm,
  InputProperty,
  SelectForm,
  TextAreaForm,
  AddButton,
  ButtonSubmit,
} from "./AddForm.styled";

interface Property {
  art: string;
  quantity: string;
  description: string;
}

interface FormData {
  name: string;
  type: string;
  kit: {
    name: string;
    property: Property[];
  };
  more: string;
  application: string;
  oem: string;
}

const initialState = {
  name: "",
  type: "",
  kit: {
    name: "",
    property: [{ art: "", quantity: "", description: "" }],
  },
  more: "",
  application: "",
  oem: "",
};

const AddForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialState);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKitChange = (
    index: number,
    field: keyof Property,
    value: string
  ) => {
    const updatedKit = [...formData.kit.property];
    updatedKit[index][field] = value;
    setFormData({
      ...formData,
      kit: {
        ...formData.kit,
        property: updatedKit,
      },
    });
  };

  const addProperty = () => {
    setFormData({
      ...formData,
      kit: {
        ...formData.kit,
        property: [
          ...formData.kit.property,
          { art: "", quantity: "", description: "" },
        ],
      },
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <WrapperForm>
        <LabelForm htmlFor="name">Name:</LabelForm>
        <InputForm
          type="text"
          placeholder="Наприклад, AU209"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </WrapperForm>
      <WrapperForm>
        <LabelForm htmlFor="type">Type:</LabelForm>
        <SelectForm
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="" disabled>
            Тип агрегату
          </option>
          <option value="ГПК">ГПК</option>
          <option value="МПК">МПК</option>
          <option value="ЕПК">ЕПК</option>
        </SelectForm>
      </WrapperForm>
      <WrapperBaseKit>
        <WrapperForm>
          <LabelForm htmlFor="kitName">РМК:</LabelForm>
          <InputForm
            type="text"
            id="kitName"
            name="kitName"
            placeholder="Наприклад, AU209KIT"
            value={formData.kit.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                kit: { ...formData.kit, name: e.target.value },
              })
            }
          />
        </WrapperForm>
        {formData.kit.property.map((item, index) => (
          <WrapperForm key={index}>
            <WrapperProperty>
              <LabelFormProperty htmlFor={`art-${index}`}>
                Арт:
              </LabelFormProperty>
              <InputProperty
                type="text"
                id={`art-${index}`}
                name={`art-${index}`}
                value={item.art}
                onChange={(e) => handleKitChange(index, "art", e.target.value)}
              />
            </WrapperProperty>
            <WrapperProperty>
              <LabelFormProperty htmlFor={`quantity-${index}`}>
                Шт:
              </LabelFormProperty>
              <InputProperty
                type="text"
                id={`quantity-${index}`}
                name={`quantity-${index}`}
                value={item.quantity}
                onChange={(e) =>
                  handleKitChange(index, "quantity", e.target.value)
                }
              />
            </WrapperProperty>
            <WrapperProperty>
              <LabelFormProperty htmlFor={`description-${index}`}>
                Коментар:
              </LabelFormProperty>
              <TextAreaForm
                id={`description-${index}`}
                name={`description-${index}`}
                value={item.description}
                onChange={(e) =>
                  handleKitChange(index, "description", e.target.value)
                }
              />
            </WrapperProperty>
          </WrapperForm>
        ))}
        <AddButton type="button" onClick={addProperty}>
          Додати запчастину
        </AddButton>
      </WrapperBaseKit>

      <div>
        <LabelForm htmlFor="more">More:</LabelForm>
        <textarea
          id="more"
          name="more"
          value={formData.more}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <LabelForm htmlFor="application">Application:</LabelForm>
        <textarea
          id="application"
          name="application"
          value={formData.application}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <LabelForm htmlFor="oem">OEM:</LabelForm>
        <textarea
          id="oem"
          name="oem"
          value={formData.oem}
          onChange={handleChange}
        ></textarea>
      </div>
      <ButtonSubmit type="submit">Зберегти</ButtonSubmit>
    </Form>
  );
};

export default AddForm;
