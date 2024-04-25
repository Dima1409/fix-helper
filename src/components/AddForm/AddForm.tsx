import React, { useState, useEffect } from "react";
import { FormEvent, ChangeEvent } from "react";
import { createNewRack } from "../../redux/rack/operations";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Rack, Property } from "types/data";
import { ToastContainer } from "react-toastify";
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
  AddButton,
  DeleteButton,
  ButtonSubmit,
  InputSpec,
  InputMore,
} from "./AddForm.styled";
import {
  steeringRackPattern,
  rackKitPattern,
  rackMorePattern,
  artPattern,
  oemPattern,
  applicationPattern,
} from "utils/patterns";
import Notification from "components/Notify";

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
  const [result, setResult] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

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
    setFormSubmitted(false);
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
    const { property } = formData.kit;
    const isValid = property.every((item) => artPattern.test(item.art));
    if (isValid) {
      setFormData({
        ...formData,
        kit: {
          ...formData.kit,
          property: [...property, { art: "", quantity: "", description: "" }],
        },
      });
    }
  };

  const addSpecProperty = () => {
    const { property } = formData.more;
    const isValid = property.every((item) => artPattern.test(item.art));
    if (isValid) {
      setFormData({
        ...formData,
        more: {
          ...formData.more,
          property: [...property, { art: "", quantity: "", description: "" }],
        },
      });
    }
  };

  const deleteProperty = (index: number, isKit: boolean) => {
    if (isKit) {
      const updatedKit = [...formData.kit.property];
      updatedKit.splice(index, 1);
      setFormData({
        ...formData,
        kit: {
          ...formData.kit,
          property: updatedKit,
        },
      });
    } else {
      const updatedSpec = [...formData.more.property];
      updatedSpec.splice(index, 1);
      setFormData({
        ...formData,
        more: {
          ...formData.more,
          property: updatedSpec,
        },
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(createNewRack(formData)).then((res) => {
      if (res.payload._id) {
        setResult("success");
        setFormSubmitted(true);
        return;
      }
      if (
        res.payload.response.data.message ===
        `Rack ${formData.name} already exists`
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
    <Form onSubmit={handleSubmit}>
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
            <Notification type="error" message={`Помилка збереження`} />
          )}
        </>
      )}
      <ToastContainer position="top-center" />
      <WrapperForm>
        <LabelForm htmlFor="name">Артикул:</LabelForm>
        <InputForm
          type="text"
          placeholder="Наприклад, AU209"
          id="name"
          name="name"
          value={formData.name.toUpperCase()}
          onChange={handleChange}
          pattern={steeringRackPattern.source}
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
            pattern={rackKitPattern.source}
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
                placeholder="до 25 символів"
                minLength={3}
                maxLength={25}
                required
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
                minLength={1}
                maxLength={3}
                placeholder="до 3 символів"
                value={item.quantity.toUpperCase()}
                required
                onChange={(e) =>
                  handleKitChange(index, "quantity", e.target.value)
                }
              />
            </WrapperProperty>
            <WrapperProperty>
              <LabelForm htmlFor={`description-${index}`}>Опис:</LabelForm>
              <SelectForm
                id={`description-${index}`}
                name={`description-${index}`}
                value={item.description}
                onChange={(e) =>
                  handleKitChange(index, "description", e.target.value)
                }
                required
              >
                <option value="" disabled>
                  Виберіть зі списку
                </option>
                <option value="Верхній сальник розподільника">
                  Верхній сальник розподільника
                </option>
                <option value={item.description}>Власний варіант</option>
                <option value="Нижній сальник розподільника">
                  Нижній сальник розподільника
                </option>
                <option value="Силовий сальник(однакові)">
                  Силовий сальник(однакові)
                </option>
                <option value="Силовий сальник на втулку">
                  Силовий сальник на втулку
                </option>
                <option value="Силовий сальник в корпус">
                  Силовий сальник в корпус
                </option>
                <option value="Верхній пильник">Верхній пильник</option>
                <option value="Гумове кільна на бокову втулку">
                  Гумове кільна на бокову втулку
                </option>
                <option value="Гумове кільце на верхню втулку">
                  Гумове кільце на верхню втулку
                </option>
                <option value="Гумове кільце під кришку">
                  Гумове кільце під кришку
                </option>
                <option value="Гумове кільце на трубки">
                  Гумове кільце на трубки
                </option>
              </SelectForm>

              <LabelFormProperty htmlFor={`description-${index}`}>
                Коментар:
              </LabelFormProperty>
              <InputSpec
                type="text"
                id={`description-${index}`}
                name={`description-${index}`}
                value={item.description}
                minLength={8}
                maxLength={90}
                placeholder="від 8 до 90 символів"
                required
                onChange={(e) =>
                  handleKitChange(index, "description", e.target.value)
                }
              />
            </WrapperProperty>
            <DeleteButton
              type="button"
              onClick={() => deleteProperty(index, true)}
            >
              x
            </DeleteButton>
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
            pattern={rackMorePattern.source}
            required
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
                minLength={3}
                maxLength={25}
                placeholder="до 25 символів"
                required
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
                placeholder="до 3 символів"
                minLength={1}
                maxLength={3}
                required
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
              <InputSpec
                type="text"
                id={`description-${index}`}
                name={`description-${index}`}
                value={item.description}
                placeholder="від 8 до 90 символів"
                required
                minLength={8}
                maxLength={90}
                onChange={(e) =>
                  handleSpecChange(index, "description", e.target.value)
                }
              />
            </WrapperProperty>
            <DeleteButton
              type="button"
              onClick={() => deleteProperty(index, false)}
            >
              x
            </DeleteButton>
          </WrapperForm>
        ))}
        <AddButton type="button" onClick={addSpecProperty}>
          Додати запчастину
        </AddButton>
      </WrapperBaseKit>

      <WrapperProperty>
        <LabelForm htmlFor="application">Застосування:</LabelForm>
        <InputMore
          type="text"
          id="application"
          name="application"
          value={formData.application}
          placeholder="від 8 до 800 символів"
          required
          onChange={handleChange}
          pattern={applicationPattern.source}
        ></InputMore>
      </WrapperProperty>
      <WrapperProperty>
        <LabelForm htmlFor="oem">OEM:</LabelForm>
        <InputMore
          type="text"
          id="oem"
          name="oem"
          value={formData.oem}
          required
          placeholder="від 8 до 1400 символів"
          onChange={handleChange}
          pattern={oemPattern.source}
        ></InputMore>
      </WrapperProperty>
      <ButtonSubmit
        disabled={
          !steeringRackPattern.test(formData.name) ||
          !oemPattern.test(formData.oem) ||
          !applicationPattern.test(formData.application) ||
          formData.name === "" ||
          formData.kit.property.length === 0 ||
          formData.more.property.length === 0 ||
          formData.oem === "" ||
          formData.application === "" ||
          formData.type === ""
        }
        type="submit"
      >
        Зберегти
      </ButtonSubmit>
    </Form>
  );
};

export default AddForm;
