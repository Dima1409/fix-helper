import useAuth from "hooks/useAuth";
import { UserWrapper, User, Role, Logout } from "./UserMenu.styled";
import { logout } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { theme } from "theme/theme";
import { LogOutIcon } from "components/Icons/Icons";

const UserMenu: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { isLoggedIn, user } = useAuth();
  console.log(user);

  const handleLogOut = async () => {
    const shouldLogout = window.confirm("Вийти з облікового запису?");
    if (shouldLogout) {
      dispatch(logout());
    }
  };

  return (
    <>
      {isLoggedIn && (
        <UserWrapper>
          <User>{user.name},</User>
          <Role>{user.role}</Role>
          <Logout onClick={handleLogOut}>
            <LogOutIcon color={theme.colors.red} />
          </Logout>
        </UserWrapper>
      )}
    </>
  );
};
export default UserMenu;