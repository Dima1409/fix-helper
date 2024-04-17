import React, { useState } from "react";
import { FormEvent, ChangeEvent } from "react";
import { LabelForm, InputForm, SelectForm, TextAreaForm } from "./AddForm.styled";

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
    <form onSubmit={handleSubmit}>
      <div>
        <LabelForm htmlFor="name">Name:</LabelForm>
        <InputForm
          type="text"
          placeholder="AU209"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <LabelForm htmlFor="type">Type:</LabelForm>
        <SelectForm
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Type
          </option>
          <option value="ГПК">ГПК</option>
          <option value="МПК">МПК</option>
          <option value="ЕПК">ЕПК</option>
        </SelectForm>
      </div>
      <div>
        <LabelForm htmlFor="kitName">Назва РМК:</LabelForm>
        <InputForm
          type="text"
          id="kitName"
          name="kitName"
          value={formData.kit.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              kit: { ...formData.kit, name: e.target.value },
            })
          }
        />
      </div>
      {formData.kit.property.map((item, index) => (
        <div key={index}>
          <LabelForm htmlFor={`art-${index}`}>Арт:</LabelForm>
          <InputForm
            type="text"
            id={`art-${index}`}
            name={`art-${index}`}
            value={item.art}
            onChange={(e) => handleKitChange(index, "art", e.target.value)}
          />
          <LabelForm htmlFor={`quantity-${index}`}>Шт:</LabelForm>
          <InputForm
            type="text"
            id={`quantity-${index}`}
            name={`quantity-${index}`}
            value={item.quantity}
            onChange={(e) => handleKitChange(index, "quantity", e.target.value)}
          />
          <LabelForm htmlFor={`description-${index}`}>Коментар:</LabelForm>
          <InputForm
            type="text"
            id={`description-${index}`}
            name={`description-${index}`}
            value={item.description}
            onChange={(e) =>
              handleKitChange(index, "description", e.target.value)
            }
          />
        </div>
      ))}
      <button type="button" onClick={addProperty}>
        Add Property
      </button>
      <div></div>
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddForm;
