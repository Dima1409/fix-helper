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
    color? : string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 5, color = theme.colors.spinner }) => {
  return (
      <div
      >
        <PulseLoader
            color={color}
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
