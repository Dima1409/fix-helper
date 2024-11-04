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
    PhotoTitle, HeadOfProperty,
} from "./StuffInfo.styled";
import {EditIcon} from "components/Icons/Icons";
import {theme} from "theme/theme";
import useAuth from "hooks/useAuth";
import typeS from "./types";
import {TypeKeys} from "./types";
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

    const selectedImageSrc = typeS[`type_${type.slice(0, 1)}` as TypeKeys];

    const stuffPosition = (posStuff: string) => {
        let elem;
        switch (posStuff) {
            case 'CRE':
                elem = "Сальник силовий гідроциліндра";
                break;
            case 'DIS':
                elem = "Сальник розподільника";
                break;
            case 'PIS':
                elem = "Сальник поршня редуктора"
                break;
            case 'SCA':
                elem = "Сальник корпусу редуктора";
                break;
            case 'POM':
                elem = "Сальник насосу ГПК"
                break;
            default:
                elem = ''
        }
        return elem;
    }


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
                            <HeadOfProperty>{name}</HeadOfProperty>
                        </ButtonWrapper>
                    </NameOfProperty>

                    <Wrapper>
                        <ImagesWrapper>
                            <ImageWrapper>
                                <PhotoTitle>Схема:</PhotoTitle>

                                <img
                                    src={selectedImageSrc}
                                    alt="stuffing-box view"
                                    sizes="(max-width: 767px) 300px, 500px"
                                ></img>

                            </ImageWrapper>
                        </ImagesWrapper>
                        <PropertyWrapper>
                            <PhotoTitle>Характеристики:</PhotoTitle>
                            <NameOfProperty>
                                <ButtonWrapper>
                                    Тип сальника (конструктив): <InfoOfProperty>{type}</InfoOfProperty>
                                </ButtonWrapper>
                            </NameOfProperty>
                            <NameOfProperty>
                                <ButtonWrapper>
                                    Застосування (місце
                                    встановлення): <InfoOfProperty>({stuffPosition(position)}) {position}</InfoOfProperty>
                                </ButtonWrapper>
                            </NameOfProperty>
                            <NameOfProperty>
                                <ButtonWrapper>
                                    Діаметр "d1" (діаметр
                                    внутрішній): <InfoOfProperty>{formatSize(d1)} мм</InfoOfProperty>
                                </ButtonWrapper>
                            </NameOfProperty>
                            {d2 ? <NameOfProperty>
                                <ButtonWrapper>
                                    Діаметр "d2" (діаметр зовнішній
                                    малий): <InfoOfProperty>{formatSize(d2)} мм</InfoOfProperty>
                                </ButtonWrapper>
                            </NameOfProperty> : null}

                            <NameOfProperty>
                                <ButtonWrapper>
                                    Діаметр "D" (діаметр зовнішній): <InfoOfProperty>{formatSize(D)} мм</InfoOfProperty>
                                </ButtonWrapper>
                            </NameOfProperty>
                            {h1 ? <NameOfProperty>
                                <ButtonWrapper>
                                    Висота "h1" (висота зовнішньої
                                    кромки): <InfoOfProperty>{formatSize(h1)} мм</InfoOfProperty>
                                </ButtonWrapper>
                            </NameOfProperty> : null}
                            <NameOfProperty>
                                <ButtonWrapper>
                                    Висота "H" (висота сальника
                                    повна): <InfoOfProperty>{formatSize(H)} мм</InfoOfProperty>
                                </ButtonWrapper>
                            </NameOfProperty>
                        </PropertyWrapper>

                        <PropertyWrapper>
                            <PhotoTitle>Аналоги:</PhotoTitle>

                        </PropertyWrapper>

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
