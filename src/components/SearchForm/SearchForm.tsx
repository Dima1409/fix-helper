import {
  Form,
  Label,
  Input,
  ButtonSearch,
  ShowAll,
  AddNewButton,
  ButtonsWrapper,
  HeaderNames,
  NamesList,
  ButtonDelete,
} from "./SearchForm.styled";
import { ChangeEvent, FormEvent, useState } from "react";
import { getByName } from "../../redux/rack/operations";
import { useDispatch } from "react-redux";
import useAuth from "hooks/useAuth";
import { ThunkDispatch } from "@reduxjs/toolkit";
import useToggle from "hooks/useToggle";
import RackInfo from "components/RackInfo";
import { getAllRacks, deleteRack } from "../../redux/rack/operations";
import { Rack } from "types/data";
import Modal from "components/Modal";
import AddForm from "components/AddForm";
import { DeleteIcon } from "components/Icons/Icons";
import { theme } from "theme/theme";
import { ToastContainer } from "react-toastify";
import Notification from "components/Notify/Notify";
import useRack from "hooks/useRack";
import Spinner from "components/Spinner";

const SearchForm: React.FC = () => {
  const { user } = useAuth();
  const { isLoading } = useRack();
  const [showForm, setShowForm] = useState(false);
  const { isOpen, close, toggle } = useToggle();
  const [deleteStatus, setDeleteStatus] = useState<string>("");
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const initialValues = {
    searchValue: "",
  };
  const [searchData, setSearchData] = useState(initialValues);
  const [allRacks, setAllRacks] = useState<Rack[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSearchData(initialValues);
      const searchValue = searchData.searchValue.trim().toUpperCase();
      const isNumeric = searchValue.length > 5;

      const queryParams = {
        [isNumeric ? "oem" : "name"]: searchValue,
      };

      dispatchTyped(getByName(queryParams));
    } catch (error) {
      console.log(error);
    }
  };

  const organizeRacksByAlphabet = (): { [key: string]: Rack[] } => {
    const alphabetizedRacks: { [key: string]: Rack[] } = {};

    allRacks.forEach((rack: Rack) => {
      const firstLetter = rack.name.charAt(0).toUpperCase();
      if (!alphabetizedRacks[firstLetter]) {
        alphabetizedRacks[firstLetter] = [];
      }
      alphabetizedRacks[firstLetter].push(rack);
    });

    return alphabetizedRacks;
  };

  const organizedRacks: { [key: string]: Rack[] } = organizeRacksByAlphabet();

  const getAll = async () => {
    let res;
    res = dispatchTyped(getAllRacks());
    setAllRacks((await res).payload);
  };

  const getByNameMore = async (elem: Rack) => {
    setAllRacks([]);
    console.log(elem._id);
    dispatchTyped(getByName({ name: elem.name }));
  };

  const deleteRackById = async (id: string | undefined) => {
    if (id) {
      await dispatchTyped(deleteRack(id)).then((res) => {
        console.log(res);
        if (res.meta.requestStatus === "fulfilled") {
          setDeleteStatus("success");
          return;
        }
        setDeleteStatus("error");
      });
      await getAll();
    } else {
      setDeleteStatus("error");
      console.error("Invalid rack ID:", id);
    }
  };

  return (
    <>
      {deleteStatus === "success" && (
        <Notification type="success" message={`Успішно видалено`} />
      )}
      {deleteStatus === "error" && (
        <Notification type="error" message={`Помилка видалення`} />
      )}
      <ToastContainer position="top-right" />
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="searchInput">
          <Input
            id="searchInput"
            name="searchValue"
            onChange={handleInputChange}
            value={searchData.searchValue}
            type="text"
            placeholder="Номер агрегату"
          ></Input>
        </Label>
        <ButtonSearch type="submit" disabled={searchData.searchValue === ""}>
          пошук
        </ButtonSearch>
      </Form>
      <ButtonsWrapper>
        {allRacks.length === 0 && (
          <ShowAll onClick={() => getAll()}>Показати всі</ShowAll>
        )}
        {allRacks.length > 0 && (
          <ShowAll onClick={() => setAllRacks([])}>Сховати всі</ShowAll>
        )}
        {user.role === "admin" && (
          <AddNewButton
            onClick={() => {
              setShowForm(true);
              toggle();
            }}
          >
            Додати
          </AddNewButton>
        )}
      </ButtonsWrapper>
      {isOpen && (
        <Modal
          onClick={() => {
            setShowForm(false);
            close();
          }}
        >
          {showForm && <AddForm />}
        </Modal>
      )}
      {isLoading && <Spinner />}
      {Object.keys(organizedRacks).map((letter: string) => (
        <div key={letter}>
          <HeaderNames>{letter}</HeaderNames>
          <ul>
            {organizedRacks[letter].map((rack) => (
              <NamesList>
                <span onClick={() => getByNameMore(rack)} key={rack._id}>
                  {rack.name}
                </span>
                {user.role === "admin" && (
                  <ButtonDelete
                    onClick={() => {
                      deleteRackById(rack._id);
                    }}
                  >
                    <DeleteIcon color={theme.colors.darkRed} />
                  </ButtonDelete>
                )}
              </NamesList>
            ))}
          </ul>
        </div>
      ))}

      <RackInfo />
    </>
  );
};

export default SearchForm;
