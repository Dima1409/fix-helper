import { useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { login } from "../../redux/auth/operations";
import { Formik, FormikHelpers } from "formik";
import FormValidations from "components/FormValidations";
import {
  FormLogin,
  FormLabel,
  FormInput,
  ButtonShow,
  ButtonSubmit,
} from "./LoginForm.styled";
import { BiShow, BiHide } from "react-icons/bi";
import { Slide } from "react-toastify";
import { notifyError, ToastContainer } from "utils/toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "theme/theme";

const LoginForm: React.FC = () => {
  const initialValues = {
    name: "",
    password: "",
  };
  const { validationLogin, InputError } = FormValidations;
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
      login({
        name: values.name,
        password: values.password,
      })
    ).then((res) => {
      if (res.payload.user) {
        resetForm();
      }
      if (res.payload === "Request failed with status code 401") {
        notifyError("Не правильне ім'я або пароль");
      }
      return;
    });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationLogin}
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
            <InputError name="email" />
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
          <ButtonSubmit
            disabled={!!formik.errors.name || !!formik.errors.password}
            type="submit"
          >
            Увійти
          </ButtonSubmit>
        </FormLogin>
      )}
    </Formik>
  );
};

export default LoginForm;
