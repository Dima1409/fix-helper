import { useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { register } from "../../redux/auth/operations";
import { Formik, FormikHelpers } from "formik";
import FormValidations from "components/FormValidations";
import {
  FormLogin,
  FormLabel,
  FormInput,
  ButtonShow,
  ButtonSubmit,
} from "../LoginForm/LoginForm.styled";
import { BiShow, BiHide } from "react-icons/bi";
import { Slide } from "react-toastify";
import { notifyError, ToastContainer } from "utils/toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "theme/theme";

const RegisterForm: React.FC = () => {
  const initialValues = {
    name: "",
    password: "",
    codePass: "",
  };
  const { validationRegister, InputError } = FormValidations;
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const hideShowPassword = () => {
    setShow(!show);
  };
  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    dispatch(
      register({
        name: values.name,
        password: values.password,
        codePass: values.codePass,
      })
    ).then((res) => {
      if (res.payload.user) {
        resetForm();
      }
      if (res.payload === "Request failed with status code 401") {
        notifyError("Не правильне ім'я або пароль");
      }
      if (res.payload === "Request failed with status code 400") {
        notifyError("Не правильно вказаний код користувача");
      }
      return;
    });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationRegister}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <FormLogin>
          <ToastContainer transition={Slide} />
          <FormLabel htmlFor="name">
            Ім'я
            <FormInput
              className={
                !formik.errors.name && formik.values.name !== ""
                  ? "success"
                  : formik.errors.name && formik.values.name !== ""
                  ? "error"
                  : "default"
              }
              type="text"
              name="name"
              id="name"
              required
            ></FormInput>
            <InputError name="name" />
          </FormLabel>
          <FormLabel htmlFor="password">
            Пароль
            <FormInput
              className={
                !formik.errors.password && formik.values.password !== ""
                  ? "success"
                  : formik.errors.password && formik.values.password !== ""
                  ? "error"
                  : "default"
              }
              type={show ? "text" : "password"}
              name="password"
              id="password"
              required
            ></FormInput>
            <ButtonShow type="button" onClick={hideShowPassword}>
              {show ? (
                <BiShow color={theme.colors.light} />
              ) : (
                <BiHide color={theme.colors.light} />
              )}
            </ButtonShow>
            <InputError name="password" />
          </FormLabel>
          <FormLabel htmlFor="codePass">
            Код користувача
            <FormInput
              className={
                !formik.errors.codePass && formik.values.codePass !== ""
                  ? "success"
                  : formik.errors.codePass && formik.values.codePass !== ""
                  ? "error"
                  : "default"
              }
              type={show ? "text" : "password"}
              name="codePass"
              id="codePass"
              required
            ></FormInput>
            <ButtonShow type="button" onClick={hideShowPassword}>
              {show ? (
                <BiShow color={theme.colors.light} />
              ) : (
                <BiHide color={theme.colors.light} />
              )}
            </ButtonShow>
            <InputError name="codePass" />
          </FormLabel>
          <ButtonSubmit
            disabled={
              !!formik.errors.name ||
              !!formik.errors.password ||
              !!formik.errors.codePass
            }
            type="submit"
          >
            Зареєструватися
          </ButtonSubmit>
        </FormLogin>
      )}
    </Formik>
  );
};

export default RegisterForm;
