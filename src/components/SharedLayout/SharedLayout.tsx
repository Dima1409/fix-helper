import { Outlet } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { HomeIcon, SigInIcon, LoginIcon } from "components/Icons/Icons";
import { NavList, Link, NavListItem } from "./SharedLayout.styled";
import { theme } from "theme/theme";

const SharedLayout: React.FC = () => {
  const { isLoggedIn, isRefreshing } = useAuth();
  if (isRefreshing) {
    return <div>loading...</div>;
  }
  return (
    <>
      <NavList>
        {!isLoggedIn && (
          <>
            <NavListItem>
              <Link to="/">
                <HomeIcon color={theme.colors.light} />
                Головна
              </Link>
            </NavListItem>
            <NavListItem>
              <Link to="/register">
                <SigInIcon color={theme.colors.light} />
                Реєстрація
              </Link>
            </NavListItem>
            <NavListItem>
              <Link to="/login">
                <LoginIcon color={theme.colors.light} />
                Вхід
              </Link>
            </NavListItem>
          </>
        )}

        {isLoggedIn && (
          <>
            <NavListItem>
              <Link to="/">
                <HomeIcon color={theme.colors.light} />
                Головна
              </Link>
            </NavListItem>
          </>
        )}
      </NavList>
      <Outlet></Outlet>
    </>
  );
};

export default SharedLayout;
