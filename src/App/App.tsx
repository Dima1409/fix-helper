import React, { lazy, Suspense, ReactNode, useEffect } from "react";
import Container from "components/Container";
import { Route, Routes, Navigate } from "react-router-dom";
import { refreshUser } from "../redux/auth/operations";
import { useDispatch } from "react-redux";
import Routs from "components/Routs";
import SharedLayout from "components/SharedLayout/SharedLayout";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Spinner from "components/Spinner";

const HomePage = lazy(() => import("../pages/HomePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const SteeringPage = lazy(() => import("../pages/SteeringPage"));
const TurbinePage = lazy(() => import("../pages/TurbinePage"));

const LoadingFallback: React.FC = () => <Spinner />;

const LazyPage: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);

const App: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Container>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <LazyPage>
                <HomePage />
              </LazyPage>
            }
          ></Route>
          <Route
            path="register"
            element={
              <Routs.RestrictedRoute
                component={() => (
                  <LazyPage>
                    <RegisterPage />
                  </LazyPage>
                )}
                redirectTo="/"
              ></Routs.RestrictedRoute>
            }
          ></Route>
          <Route
            path="login"
            element={
              <Routs.RestrictedRoute
                component={() => (
                  <LazyPage>
                    <LoginPage />
                  </LazyPage>
                )}
                redirectTo="/"
              ></Routs.RestrictedRoute>
            }
          ></Route>
            <Route
                path="steering/*"
                element={
                    <Routs.PrivateRoute
                        component={() => (
                            <LazyPage>
                                <SteeringPage />
                            </LazyPage>
                        )}
                        redirectTo="/"
                    />
                }
            >
            </Route>
          <Route
            path="turbine"
            element={
              <Routs.PrivateRoute
                component={() => (
                  <LazyPage>
                    <TurbinePage />
                  </LazyPage>
                )}
                redirectTo="/"
              />
            }
          ></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </Container>
  );
};

export default App;
