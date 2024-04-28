import UserMenu from "components/UserMenu";
import useAuth from "hooks/useAuth";
import { HeaderWelcome, Description } from "./HomePage.styled";
import { Link } from "components/SharedLayout/SharedLayout.styled";
import { theme } from "theme/theme";
import Spinner from "components/Spinner";

const HomePage: React.FC = () => {
  const { isLoggedIn, isRefreshing, user } = useAuth();
  const isDataLoaded = !isRefreshing && (isLoggedIn || user);
  return (
    <>
      {isDataLoaded ? (
        isLoggedIn && user ? (
          <>
            <UserMenu />
          </>
        ) : (
          <>
            <HeaderWelcome>
              Зручний підбір комплектуючих від Genstar
            </HeaderWelcome>
            <Description>
              Зареєструвати{" "}
              <Link
                style={{
                  display: "inline-block",
                  margin: "0",
                  padding: "0",
                  color: `${theme.colors.accentActive}`,
                  textDecoration: "underline",
                }}
                to="/register"
              >
                новий
              </Link>{" "}
              обліковий запис або{" "}
              <Link
                to="/login"
                style={{
                  display: "inline-block",
                  margin: "0",
                  padding: "0",
                  color: `${theme.colors.accentActive}`,
                  textDecoration: "underline",
                }}
              >
                увійти
              </Link>{" "}
              в існуючий
            </Description>
          </>
        )
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default HomePage;
