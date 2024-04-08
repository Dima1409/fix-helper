import * as yup from "yup";
import { ErrorMessage } from "formik";
import { Error, Correct } from "./FormValidations.styled";
import { namePattern, passwordPattern, codePassPattern } from "utils/patterns";

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
    .matches(codePassPattern, "Введіть від 6 до 20 символів")
    .required("Поле код-секрет обов'язкове"),
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
  InputCorrect,
  InputError,
};

export default FormValidations;
