import {
  Form,
  Label,
  Input,
  ButtonSearch,
  ShowAll,
  AddNewButton,
  ButtonsWrapper,
  HeaderNames,
  StyledList,
  NamesList,
  ButtonDelete,
} from "./SearchForm.styled";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import useAuth from "hooks/useAuth";
import { ThunkDispatch } from "@reduxjs/toolkit";
import useToggle from "hooks/useToggle";
import RackInfo from "components/RackInfo";
import {
  getAllRacks,
  deleteRack,
  getByName,
} from "../../redux/rack/operations";
import { Rack } from "types/racks";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "components/Modal";
import AddRackForm from "components/AddRackForm";
import { DeleteIcon } from "components/Icons/Icons";
import { theme } from "theme/theme";
import { ToastContainer } from "react-toastify";
import Notification from "components/Notify/Notify";
import useRack from "hooks/useRack";
import Spinner from "components/Spinner";
import {WrapperHeaderError} from "../RackInfo/RackInfo.styled";

const SearchForm: React.FC = () => {
  const { user } = useAuth();
  const { isLoading, isError } = useRack();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isOpen, close, toggle } = useToggle();
  const [deleteStatus, setDeleteStatus] = useState<string>("");
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const initialValues = {
    searchValue: "",
  };
  const [searchData, setSearchData] = useState(initialValues);
  const [allRacks, setAllRacks] = useState<Rack[]>([]);

  useEffect(() => {
    if (id) {
      dispatchTyped(getByName({ name: id.toUpperCase() }));
    }
  }, [id, dispatchTyped]);


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
      setLoading(true);
      setSearchData(initialValues);

      const searchValue = searchData.searchValue.trim().toUpperCase();
      if (!searchValue) return;

      const queryKey = searchValue.length > 5 ? "oem" : "name";
      const queryParams = { [queryKey]: searchValue };

      const { payload } = await dispatchTyped(getByName(queryParams));

      if (payload?.name) {
        navigate(`/steering/racks-by-number/${payload.name}`);
      } else {
        console.warn("No result found");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
    navigate(`/steering/racks-by-number/${elem.name}`);
  };

  const deleteRackById = async (id: string | undefined) => {
    if (id) {
      const confirmed = window.confirm("Видалити запис?");
      if (confirmed) {
        await dispatchTyped(deleteRack(id)).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            setDeleteStatus("success");
            return;
          }
          setDeleteStatus("error");
        });
        await getAll();
      } else {
        return;
      }
    } else {
      setDeleteStatus("error");
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
      <HeaderNames style={{textAlign: 'center'}}>Пошук рейки за ОЕМ номером або артикулом</HeaderNames>
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
        {/*<ShowAll>Пошук по авто</ShowAll>*/}
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
      {allRacks.length > 0 && (
        <HeaderNames
          style={{ textAlign: "center", color: `${theme.colors.accent}` }}
        >
          Знайдено агрегатів: {allRacks.length}
        </HeaderNames>
      )}

      {isOpen && (
        <Modal
          onClick={() => {
            setShowForm(false);
            close();
          }}
        >
          {showForm && <AddRackForm closeModal={close}/>}
        </Modal>
      )}
      {(isLoading || loading) && <Spinner />}
      {Object.keys(organizedRacks).map((letter: string) => (
        <div key={letter}>
          <HeaderNames>{letter}</HeaderNames>
          <StyledList>
            {organizedRacks[letter].map((rack) => (
              <NamesList>
                <span onClick={() => getByNameMore(rack)} key={rack._id}>
                  {rack.name}
                </span>
                {user.role === "admin" && (
                  <ButtonDelete role={"button"} tabIndex={0}
                    onClick={() => {
                      deleteRackById(rack._id);
                    }}
                  >
                    <DeleteIcon color={theme.colors.darkRed} />
                  </ButtonDelete>
                )}
              </NamesList>
            ))}
          </StyledList>
        </div>
      ))}
      {isError ? <WrapperHeaderError>Нічого не знайдено</WrapperHeaderError> : <RackInfo />}

    </>
  );
};

export default SearchForm;






