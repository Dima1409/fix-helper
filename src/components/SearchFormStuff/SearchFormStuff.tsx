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
} from "./SearchFormStuff.styled";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useDispatch} from "react-redux";
import useAuth from "hooks/useAuth";
import {ThunkDispatch} from "@reduxjs/toolkit";
import useToggle from "hooks/useToggle";
import StuffInfo from "../StuffInfo";
import {
    getAllStuff,
    deleteStuff,
    getByName,
} from "../../redux/stuff/operations";
import {Stuff} from "types/stuffing-boxes";
import Modal from "components/Modal";
import {DeleteIcon} from "components/Icons/Icons";
import {theme} from "theme/theme";
import {ToastContainer} from "react-toastify";
import Notification from "components/Notify/Notify";
import useStuff from "hooks/useStuff";
import Spinner from "components/Spinner";
import AddStuffForm from "../AddStuffForm";
import {WrapperHeaderError} from "../RackInfo/RackInfo.styled";
import StuffParameters from "../StuffParametres";

const SearchFormStuff: React.FC = () => {
    const {user} = useAuth();
    const {isLoading, isError} = useStuff();
    const {stuff}: { stuff: Stuff } = useStuff();
    const [showForm, setShowForm] = useState(false);
    const {isOpen, close, toggle} = useToggle();
    const [deleteStatus, setDeleteStatus] = useState<string>("");
    const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
    const initialValues = {
        searchValue: "",
    };
    const [searchData, setSearchData] = useState(initialValues);
    const [allStuff, setAllStuff] = useState<Stuff[]>([]);

    const [showParameters, setShowParameters] = useState(false);

    const handleToggleParameters = () => {
        setShowParameters(!showParameters);
        setAllStuff([])
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
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

            dispatchTyped(getByName(searchValue));
        } catch (error) {
            console.log(error);
        }
    };

    const organizeStuffByAlphabet = (): { [key: string]: Stuff[] } => {
        const alphabetizedRacks: { [key: string]: Stuff[] } = {};

        allStuff.forEach((stuff: Stuff) => {
            const firstLetter = stuff.name.charAt(0).toUpperCase();
            if (!alphabetizedRacks[firstLetter]) {
                alphabetizedRacks[firstLetter] = [];
            }
            alphabetizedRacks[firstLetter].push(stuff);
        });

        return alphabetizedRacks;
    };

    const organizedStuff: { [key: string]: Stuff[] } = organizeStuffByAlphabet();

    const getAll = async () => {
        setShowParameters(false);
        let res;
        res = dispatchTyped(getAllStuff());
        setAllStuff((await res).payload);
    };

    const getByNameMore = async (elem: Stuff) => {
        setAllStuff([]);
        dispatchTyped(getByName(elem.name));
    };

    const deleteStuffById = async (id: string | undefined) => {
        if (id) {
            const confirmed = window.confirm("Видалити запис?");
            if (confirmed) {
                await dispatchTyped(deleteStuff(id)).then((res) => {
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
                <Notification type="success" message={`Успішно видалено`}/>
            )}
            {deleteStatus === "error" && (
                <Notification type="error" message={`Помилка видалення`}/>
            )}
            <ToastContainer position="top-right"/>
            <HeaderNames style={{textAlign: 'center'}}>Пошук сальників по артикулу</HeaderNames>
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="searchInput">
                    <Input
                        id="searchInput"
                        name="searchValue"
                        onChange={handleInputChange}
                        value={searchData.searchValue}
                        type="text"
                        placeholder="Номер сальника"
                    ></Input>
                </Label>
                <ButtonSearch type="submit" disabled={searchData.searchValue === ""}>
                    пошук
                </ButtonSearch>
            </Form>
            <ButtonsWrapper>
                {allStuff.length === 0 && (
                    <ShowAll type='button' onClick={() => getAll()}>Показати всі</ShowAll>
                )}
                {allStuff.length > 0 && (
                    <ShowAll type='button' onClick={() => setAllStuff([])}>Сховати всі</ShowAll>
                )}
                <ShowAll type="button" onClick={handleToggleParameters}>
                    За розміром
                </ShowAll>
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
            {showParameters && <StuffParameters/>}
            {allStuff.length > 0 && (
                <HeaderNames
                    style={{textAlign: "center", color: `${theme.colors.accent}`}}
                >
                    Знайдено сальників: {allStuff.length}
                </HeaderNames>
            )}

            {isOpen && (
                <Modal
                    onClick={() => {
                        setShowForm(false);
                        close();
                    }}
                >
                    {showForm && <AddStuffForm closeModal={close}/>}
                </Modal>
            )}
            {isLoading && <Spinner/>}
            {Object.keys(organizedStuff).map((letter: string) => (
                <div key={letter}>
                    <StyledList>
                        {organizedStuff[letter].map((stuff) => (
                            <NamesList>
                <span onClick={() => getByNameMore(stuff)} key={stuff._id}>
                  {stuff.name}
                </span>
                                {user.role === "admin" && (
                                    <ButtonDelete
                                        onClick={() => {
                                            deleteStuffById(stuff._id);
                                        }}
                                    >
                                        <DeleteIcon color={theme.colors.darkRed}/>
                                    </ButtonDelete>
                                )}
                            </NamesList>
                        ))}
                    </StyledList>
                </div>
            ))}
            {isError ? <WrapperHeaderError>Нічого не знайдено</WrapperHeaderError> : stuff._id && <StuffInfo/>}
        </>
    );
};

export default SearchFormStuff;






