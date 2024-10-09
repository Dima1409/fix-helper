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
  ElemOfProperty,
} from "./AddForm.styled";
import {
  steeringRackPattern,
  rackKitPattern,
  rackMorePattern,
  artPattern,
  quantityPattern,
  commentPattern,
} from "utils/patterns";
import Notification from "components/Notify";
import { PropertiesForm, PropertiesFormSpec } from "utils/addFormHelper";
import { initialState } from "types/data";
import useRack from "hooks/useRack";
import Spinner from "components/Spinner";

interface AddFormProps {
  closeModal?: () => void
}

const AddForm: React.FC<AddFormProps> = ({closeModal}) => {
  const { isLoading } = useRack();
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
        setTimeout(() => {
          if (closeModal) {
            closeModal();
          }
        }, 2000);
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
    <>
      <ToastContainer position="top-right" />
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
              <Notification type="error" message={`Помилка збереження`} />
            )}
          </>
        )}
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
            <ElemOfProperty key={index}>
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
                  onChange={(e) =>
                    handleKitChange(index, "art", e.target.value)
                  }
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
                  {PropertiesForm.map((property, idx) => (
                    <option key={idx} value={property}>
                      {property}
                    </option>
                  ))}
                  <option value={item.description} disabled>
                    Власний варіант
                  </option>
                </SelectForm>

                <LabelFormProperty htmlFor={`description-${index}`}>
                  Значення:
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
            </ElemOfProperty>
          ))}
          <AddButton
            type="button"
            disabled={
              !formData.kit.property.every(
                (item) =>
                  artPattern.test(item.art) &&
                  quantityPattern.test(item.quantity) &&
                  commentPattern.test(item.description)
              )
            }
            onClick={addProperty}
          >
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
            <ElemOfProperty key={index}>
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
                  onChange={(e) =>
                    handleSpecChange(index, "art", e.target.value)
                  }
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
                <LabelForm htmlFor={`description-${index}`}>Опис:</LabelForm>
                <SelectForm
                  id={`description-${index}`}
                  name={`description-${index}`}
                  value={item.description}
                  onChange={(e) =>
                    handleSpecChange(index, "description", e.target.value)
                  }
                  required
                >
                  <option value="" disabled>
                    Виберіть зі списку
                  </option>
                  {PropertiesFormSpec.map((property, idx) => (
                    <option key={idx} value={property}>
                      {property}
                    </option>
                  ))}
                  <option value={item.description} disabled>
                    Власний варіант
                  </option>
                </SelectForm>
                <LabelFormProperty htmlFor={`description-${index}`}>
                  Значення:
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
            </ElemOfProperty>
          ))}
          <AddButton
            type="button"
            disabled={
              !formData.more.property.every(
                (item) =>
                  artPattern.test(item.art) &&
                  quantityPattern.test(item.quantity) &&
                  commentPattern.test(item.description)
              )
            }
            onClick={addSpecProperty}
          >
            Додати запчастину
          </AddButton>
        </WrapperBaseKit>

        <WrapperProperty>
          <LabelForm htmlFor="application">Застосування:</LabelForm>
          <div style={{ maxHeight: "100px", overflowY: "auto" }}>
            <InputMore
              id="application"
              minLength={8}
              maxLength={800}
              name="application"
              value={formData.application.split("\n").join(", ")}
              placeholder="від 8 до 800 символів"
              required
              onChange={handleChange}
            ></InputMore>
          </div>
        </WrapperProperty>
        <WrapperProperty>
          <LabelForm htmlFor="oem">OEM:</LabelForm>
          <InputMore
            id="oem"
            minLength={8}
            maxLength={1400}
            name="oem"
            value={formData.oem}
            required
            placeholder="від 8 до 1400 символів"
            onChange={handleChange}
          ></InputMore>
        </WrapperProperty>
        {isLoading ? (
          <Spinner />
        ) : (
          <ButtonSubmit
            disabled={
              !steeringRackPattern.test(formData.name) ||
              formData.name === "" ||
              formData.kit.property.length === 0 ||
              formData.more.property.length === 0 ||
              formData.oem === "" ||
              formData.application === "" ||
              formData.type === "" ||
              formData.application.length < 8 ||
              formData.application.length > 800 ||
              formData.oem.length < 8 ||
              formData.oem.length > 1400 ||
              formData.kit.property.every(
                (item) =>
                  item.art.length < 3 ||
                  item.art.length > 25 ||
                  item.art === "" ||
                  item.quantity.length > 3 ||
                  item.quantity === "" ||
                  item.description.length < 8 ||
                  item.description.length > 90 ||
                  item.description === ""
              ) ||
              formData.more.property.every(
                (item) =>
                  item.art.length < 3 ||
                  item.art.length > 25 ||
                  item.art === "" ||
                  item.quantity.length > 3 ||
                  item.quantity === "" ||
                  item.description.length < 8 ||
                  item.description.length > 90 ||
                  item.description === ""
              )
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

export default AddForm;
