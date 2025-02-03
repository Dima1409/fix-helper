import useStuff from "hooks/useStuff";
import {Stuff} from "types/stuffing-boxes";
import React, {useState} from "react";
import useToggle from "hooks/useToggle";
import Modal from "components/Modal";
import {
    Wrapper,
    WrapperHeader,
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
import {useNavigate} from "react-router-dom";
import {stuffPosition} from "./position";

const StuffInfo: React.FC = () => {
    const {isOpen, open, close} = useToggle();
    const {stuff}: { stuff: Stuff } = useStuff();
    const {user} = useAuth();
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate()
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
        analogs
    } = stuff;

    const selectedImageSrc = (type === "12" || type === "15")
        ? typeS[`type_${type}` as TypeKeys]
        : typeS[`type_${type.slice(0, 1)}` as TypeKeys];

    return (
        <Wrapper>
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
                    {analogs && analogs?.length > 0 ? (
                        <ul>
                            {analogs?.map((analog, index) => (
                                <li
                                    style={{
                                        textAlign: 'center',
                                        padding: '8px 0',
                                        margin: '0 auto 8px',
                                        maxWidth: '300px',
                                    }}
                                    key={index}
                                >
                                    <div
                                        style={{
                                            display: 'table',
                                            width: '100%',
                                            marginTop: '8px',
                                            cursor: 'pointer',
                                            border: '1px solid',
                                        }}
                                        onClick={() => navigate(`/steering/stuffing-box/${analog.name}`)}
                                    >
                                        <div
                                            style={{
                                                display: 'table-row',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'table-cell',
                                                    padding: '4px 8px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Артикул:
                                            </div>
                                            <div style={{display: 'table-cell', padding: '4px 8px'}}>
                                                        <span style={{
                                                            color: 'blue',
                                                            fontWeight: '500'
                                                        }}>{analog.name}</span>
                                            </div>

                                        </div>

                                        <div
                                            style={{
                                                display: 'table-row',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'table-cell',
                                                    padding: '4px 8px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Тип сальника:
                                            </div>
                                            <div style={{display: 'table-cell', padding: '4px 8px'}}>
                                                {analog.type}
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                display: 'table-row',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'table-cell',
                                                    padding: '4px 8px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                d1:
                                            </div>
                                            <div style={{display: 'table-cell', padding: '4px 8px'}}>
                                                {formatSize(analog.d1)} мм
                                            </div>
                                        </div>
                                        {analog.d2 && (
                                            <div
                                                style={{
                                                    display: 'table-row',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'table-cell',
                                                        padding: '4px 8px',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    d2:
                                                </div>
                                                <div
                                                    style={{
                                                        display: 'table-cell',
                                                        padding: '4px 8px',
                                                    }}
                                                >
                                                    {formatSize(analog.d2)} мм
                                                </div>
                                            </div>
                                        )}
                                        <div
                                            style={{
                                                display: 'table-row',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'table-cell',
                                                    padding: '4px 8px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                D:
                                            </div>
                                            <div style={{display: 'table-cell', padding: '4px 8px'}}>
                                                {formatSize(analog.D)} мм
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                display: 'table-row',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'table-cell',
                                                    padding: '4px 8px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                h1:
                                            </div>
                                            <div style={{display: 'table-cell', padding: '4px 8px'}}>
                                                {h1 !== undefined ? formatSize(h1) : formatSize(analog.h1 ?? '')} мм
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                display: 'table-row',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'table-cell',
                                                    padding: '4px 8px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                H:
                                            </div>
                                            <div style={{display: 'table-cell', padding: '4px 8px'}}>
                                                {formatSize(analog.H)} мм
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{textAlign: 'center', color: 'red', marginBottom: '8px'}}>Аналогів не
                            знайдено</p>
                    )}


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
        </Wrapper>
    );
};

export default StuffInfo;
