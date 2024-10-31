import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUser,
  refreshUser,
  selectPending,
  userToken
} from "../../redux/auth/selectors";

const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const isRefreshing = useSelector(refreshUser);
  const isPending = useSelector(selectPending);
  const isToken = useSelector(userToken)
  return {
    isLoggedIn,
    user,
    isRefreshing,
    isPending,
    isToken
  };
};

export default useAuth;
