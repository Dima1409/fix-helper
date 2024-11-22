import { CSSProperties } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { theme } from "theme/theme";

const override: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderColor: theme.colors.spinner,
};

interface SpinnerProps {
    size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 5 }) => {
  return (
      <div
          // style={{
          //   position: "fixed",
          //   top: "50%",
          //   left: "50%",
          //   transform: "translate(-50%, -50%)",
          // }}
      >
        <PulseLoader
            color={theme.colors.spinner}
            margin={5}
            loading={true}
            cssOverride={override}
            size={size}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
      </div>
  );
};

export default Spinner;
