import {Navigate} from "react-router-dom";
import useAuth from "hooks/useAuth";
import React, {ComponentType} from "react";

interface PrivateRouteProps {
    redirectTo: string;
    component: ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
                                                       redirectTo,
                                                       component: Component,
                                                   }) => {
    const {isToken: token} = useAuth();

    return !token ? <Navigate to={redirectTo}/> : <Component/>;
};

export default PrivateRoute;

// import { Navigate } from "react-router-dom";
// import useAuth from "hooks/useAuth";
// import React, { ComponentType } from "react";
//
// interface PrivateRouteProps {
//     redirectTo: string;
//     component: ComponentType;
// }
//
// const PrivateRoute: React.FC<PrivateRouteProps> = ({
//                                                        redirectTo,
//                                                        component: Component,
//                                                    }) => {
//     const { isLoggedIn, isRefreshing } = useAuth();
//
//     if (isRefreshing) {
//         return null;
//     }
//
//     return !isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
// };
//
// export default PrivateRoute;
