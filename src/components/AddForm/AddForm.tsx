import React, { useState, useEffect } from "react";
import { FormEvent, ChangeEvent } from "react";
import { createNewRack } from "../../redux/rack/operations";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Rack, Property } from "types/data";
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
  TextAreaSpec,
  AddButton,
  ButtonSubmit,
} from "./AddForm.styled";

const initialState = {
  name: "",
  type: "",
  kit: {
    name: "",
    property: [{ art: "", quantity: "", description: "" }],
  },
  more: {
    name: "",
    property: [{ art: "", quantity: "", description: "" }],
  },
  application: "",
  oem: "",
};

const AddForm: React.FC = () => {
  const [formData, setFormData] = useState<Rack>(initialState);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    const updatedKitName = formData.name.toUpperCase() + "KIT";
    const updatedMore = formData.name.toUpperCase() + "SPEC";
    setFormData((prevFormData) => ({
      ...prevFormData,
      kit: { ...prevFormData.kit, name: updatedKitName },
      more: { ...prevFormData.more, name: updatedMore },
    }));
  }, [formData.name]);

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

  const handleSpecChange = (
    index: number,
    field: keyof Property,
    value: string
  ) => {
    const updatedSpec = [...formData.more.property];
    updatedSpec[index][field] = value;
    setFormData({
      ...formData,
      more: {
        ...formData.more,
        property: updatedSpec,
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

  const addSpecProperty = () => {
    setFormData({
      ...formData,
      more: {
        ...formData.more,
        property: [
          ...formData.more.property,
          { art: "", quantity: "", description: "" },
        ],
      },
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createNewRack(formData));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <WrapperForm>
        <LabelForm htmlFor="name">Артикул:</LabelForm>
        <InputForm
          type="text"
          placeholder="Наприклад, AU209"
          id="name"
          name="name"
          value={formData.name.toUpperCase()}
          onChange={handleChange}
        />
      </WrapperForm>
      <WrapperForm>
        <LabelForm htmlFor="type">Tип:</LabelForm>
        <SelectForm
          id="type"
          name="type"
          value={formData.type.toUpperCase()}
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
            placeholder="Приклад, AU209KIT"
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
                value={item.art.toUpperCase()}
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
                value={item.quantity.toUpperCase()}
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

      <WrapperBaseKit>
        <WrapperForm>
          <LabelForm htmlFor="more">Додатково:</LabelForm>
          <InputForm
            type="text"
            id="more"
            name="more"
            placeholder="Приклад, AU209SPEC"
            value={formData.more.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                more: { ...formData.more, name: e.target.value },
              })
            }
          />
        </WrapperForm>
        {formData.more.property.map((item, index) => (
          <WrapperForm key={index}>
            <WrapperProperty>
              <LabelFormProperty htmlFor={`art-${index}`}>
                Арт:
              </LabelFormProperty>
              <InputProperty
                type="text"
                id={`art-${index}`}
                name={`art-${index}`}
                value={item.art.toUpperCase()}
                onChange={(e) => handleSpecChange(index, "art", e.target.value)}
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
                value={item.quantity.toUpperCase()}
                onChange={(e) =>
                  handleSpecChange(index, "quantity", e.target.value)
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
                  handleSpecChange(index, "description", e.target.value)
                }
              />
            </WrapperProperty>
          </WrapperForm>
        ))}
        <AddButton type="button" onClick={addSpecProperty}>
          Додати запчастину
        </AddButton>
      </WrapperBaseKit>

      <WrapperProperty>
        <LabelForm htmlFor="application">Застосування:</LabelForm>
        <TextAreaSpec
          id="application"
          name="application"
          value={formData.application}
          onChange={handleChange}
        ></TextAreaSpec>
      </WrapperProperty>
      <WrapperProperty>
        <LabelForm htmlFor="oem">OEM:</LabelForm>
        <TextAreaSpec
          id="oem"
          name="oem"
          value={formData.oem}
          onChange={handleChange}
        ></TextAreaSpec>
      </WrapperProperty>
      <ButtonSubmit type="submit">Зберегти</ButtonSubmit>
    </Form>
  );
};

export default AddForm;
