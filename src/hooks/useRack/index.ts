import { useSelector } from "react-redux";
import {
  selectRack,
  selectLoading,
  selectError,
} from "../../redux/rack/selectors";

const useRack = () => {
  const rack = useSelector(selectRack);
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  return {
    rack,
    isLoading,
    isError,
  };
};

export default useRack;
