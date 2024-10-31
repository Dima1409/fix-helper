import * as yup from "yup";
import { ErrorMessage } from "formik";
import { Error, Correct } from "./FormValidations.styled";
import {
  namePattern,
  passwordPattern,
  codePassPattern,
  steeringRackPattern,
  rackKitPattern,
  rackMorePattern,
  artPattern,
  quantityPattern,
  commentPattern,
  applicationPattern,
  oemPattern,
} from "utils/RackPatterns";

const validationLogin = yup.object().shape({
  name: yup
    .string()
    .required("Поле ім'я обов'якове")
    .matches(namePattern, "Недійсне або неприпустиме ім'я"),
  password: yup
    .string()
    .matches(passwordPattern, "Введіть від 6 до 14 символів")
    .required("Поле пароль обов'язкове"),
});

const validationRegister = yup.object().shape({
  name: yup
    .string()
    .required("Поле Ім'я обов'якове")
    .matches(namePattern, "Недійсне або неприпустиме ім'я"),
  password: yup
    .string()
    .matches(passwordPattern, "Введіть від 6 до 14 символів")
    .required("Поле пароль обов'язкове"),
  codePass: yup
    .string()
    .matches(codePassPattern, "Від 6 до 20 символів + літери")
    .required("Поле код-секрет обов'язкове"),
});

const validationRack = yup.object().shape({
  name: yup
    .string()
    .matches(steeringRackPattern, "Недійсне або неприпустиме ім'я")
    .required("Поле Ім'я обов'якове"),
  type: yup.string().required(),
  kit: yup
    .object({
      name: yup.string().matches(rackKitPattern).required(),
      property: yup
        .array()
        .of(
          yup.object({
            art: yup.string().matches(artPattern).required(),
            quantity: yup.string().matches(quantityPattern).required(),
            description: yup.string().matches(commentPattern).required(),
          })
        )
        .required(),
    })
    .required(),
  more: yup
    .object({
      name: yup.string().matches(rackMorePattern).required(),
      property: yup
        .array()
        .of(
          yup.object({
            art: yup.string().matches(artPattern).required(),
            quantity: yup.string().matches(quantityPattern).required(),
            description: yup.string().matches(commentPattern).required(),
          })
        )
        .required(),
    })
    .required(),
  application: yup.string().matches(applicationPattern).required(),
  oem: yup.string().matches(oemPattern).required(),
  image: yup.string(),
});

const InputError = ({ name }: { name: string }) => {
  return (
    <Error>
      <ErrorMessage
        name={name}
        render={(message) => <p style={{ margin: 0 }}>{message}</p>}
      />
    </Error>
  );
};

const InputCorrect = ({ name }: { name: string }) => {
  return (
    <Correct>
      <p style={{ margin: 0 }}>{name}</p>
    </Correct>
  );
};

const FormValidations = {
  validationLogin,
  validationRegister,
  validationRack,
  InputCorrect,
  InputError,
};

export default FormValidations;
