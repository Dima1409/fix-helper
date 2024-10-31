import {useSelector} from "react-redux";
import {
    selectStuff,
    selectLoading,
    selectError,
} from "../../redux/stuff/selectors";

const useRack = () => {
    const stuff = useSelector(selectStuff);
    const isLoading = useSelector(selectLoading);
    const isError = useSelector(selectError);
    return {
        stuff,
        isLoading,
        isError,
    };
};

export default useRack;
