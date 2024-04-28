import { CSSProperties } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { theme } from "theme/theme";

const override: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderColor: theme.colors.spinner,
};

const Spinner: React.FC = () => {
  return (
    <PulseLoader
      color={theme.colors.spinner}
      margin={5}
      loading={true}
      cssOverride={override}
      size={15}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Spinner;
