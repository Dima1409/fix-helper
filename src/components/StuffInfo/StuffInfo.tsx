import useStuff from "hooks/useStuff";
import {Stuff} from "types/stuffing-boxes";
import React, {useState} from "react";
import useToggle from "hooks/useToggle";
import Modal from "components/Modal";
import {
    Wrapper,
    WrapperHeader,
    WrapperHeaderError,
    PropertyWrapper,
    NameOfProperty,
    InfoOfProperty,
    ButtonWrapper,
    EditButton,
    ImagesWrapper,
    ImageWrapper,
    PhotoTitle,
} from "./StuffInfo.styled";
import {EditIcon} from "components/Icons/Icons";
import {theme} from "theme/theme";
import useAuth from "hooks/useAuth";
import {type_7V1} from "./types";
import EditStuffForm from "../EditStuffForm";

const RackInfo: React.FC = () => {
    const {isOpen, open, close} = useToggle();
    const {stuff}: { stuff: Stuff } = useStuff();
    const {isError} = useStuff();
    const {user} = useAuth();
    const [showForm, setShowForm] = useState(false);
    const formatSize = (number: string) => {
        return Number(number).toFixed(2);
    };

    const {
        name,
        type,
        position,
        d1,
        d2,
        D,
        h1,
        H,
    } = stuff;

    return (
        <Wrapper>
            {isError ? (
                <WrapperHeaderError>Нічого не знайдено</WrapperHeaderError>
            ) : (
                <>
                    <WrapperHeader>Результат пошуку:</WrapperHeader>
                    <NameOfProperty>
                        <ButtonWrapper>
                            Артикул:{" "}
                            {user.role === "admin" && (
                                <EditButton
                                    onClick={() => {
                                        setShowForm(true);
                                        open();
                                    }}
                                >
                                    <EditIcon color={theme.colors.light}/>
                                </EditButton>
                            )}
                            <InfoOfProperty>{name}</InfoOfProperty>
                        </ButtonWrapper>
                    </NameOfProperty>

                    <Wrapper>
                        <PropertyWrapper>
                            <PhotoTitle>Характеристики</PhotoTitle>
                            <NameOfProperty>
                                <ButtonWrapper>
                                    Тип: <InfoOfProperty>{type}</InfoOfProperty>
                                </ButtonWrapper>
                            </NameOfProperty>
                            <NameOfProperty>
                                <ButtonWrapper>
                                    Застосування: <InfoOfProperty>{position}</InfoOfProperty>
                                </ButtonWrapper>
                            </NameOfProperty>
                            <NameOfProperty>
                                <ButtonWrapper>
                                    Діаметр "d1": <InfoOfProperty>{formatSize(d1)} мм</InfoOfProperty>
                                </ButtonWrapper>
                            </NameOfProperty>
                            {d2 ? <NameOfProperty>
                                <ButtonWrapper>
                                    Діаметр "d2": <InfoOfProperty>{formatSize(d2)} мм</InfoOfProperty>
                                </ButtonWrapper>
                            </NameOfProperty> : null}

                            <NameOfProperty>
                                <ButtonWrapper>
                                    Діаметр "D": <InfoOfProperty>{formatSize(D)} мм</InfoOfProperty>
                                </ButtonWrapper>
                            </NameOfProperty>
                            {h1 ? <NameOfProperty>
                                <ButtonWrapper>
                                    Висота "h1": <InfoOfProperty>{formatSize(h1)} мм</InfoOfProperty>
                                </ButtonWrapper>
                            </NameOfProperty> : null}
                            <NameOfProperty>
                                <ButtonWrapper>
                                    Висота "H": <InfoOfProperty>{formatSize(H)} мм</InfoOfProperty>
                                </ButtonWrapper>
                            </NameOfProperty>
                        </PropertyWrapper>

                        <PropertyWrapper>
                            <PhotoTitle>Аналоги</PhotoTitle>
                        </PropertyWrapper>

                        <ImagesWrapper>
                            <ImageWrapper>
                                <PhotoTitle>Схема:</PhotoTitle>

                                <img
                                    src={type_7V1}
                                    alt="rack view"
                                    sizes="(max-width: 767px) 300px, 500px"
                                ></img>

                            </ImageWrapper>
                        </ImagesWrapper>

                    </Wrapper>
                    {isOpen && (
                        <Modal
                            onClick={() => {
                                setShowForm(false);
                                close();
                            }}
                        >
                            {showForm && <EditStuffForm data={stuff} closeModal={close}/>}
                        </Modal>
                    )}
                </>
            )}
        </Wrapper>
    );
};

export default RackInfo;
