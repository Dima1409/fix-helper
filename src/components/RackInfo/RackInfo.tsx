import useRack from "hooks/useRack";
import useStuff from "../../hooks/useStuff";
import {Rack} from "types/racks";
import React, {useState, ChangeEvent} from "react";
import useToggle from "hooks/useToggle";
import Modal from "components/Modal";
import {
    Wrapper,
    WrapperHeader,
    NameOfProperty,
    InfoOfProperty,
    ButtonWrapper,
    MoreButton,
    EditPhoto,
    EditButton,
    StyledTable,
    StyledTh,
    StyledTd,
    ImagesWrapper,
    ImageWrapper,
    PhotoTitle,
    AvatarWrapper,
    ButtonEditAvatar,
    ShowCenterButton,
} from "./RackInfo.styled";
import {EditIcon, PlusIcon} from "components/Icons/Icons";
import {theme} from "theme/theme";
import defaultImage from "../../images/defaultPhoto.jpg";
import EditRackForm from "components/EditRackForm";
import {
    updateMainImage,
    updateCenterImage,
    getByName,
} from "../../redux/rack/operations";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import Avatar from "react-avatar-edit";
import useAuth from "hooks/useAuth";
import Spinner from "components/Spinner";
import {getByName as stuffName} from "../../redux/stuff/operations";
import {stuffPosition} from "../StuffInfo/position";
import {Stuff} from "../../types/stuffing-boxes";

const RackInfo: React.FC = () => {
    const {isOpen, open, close} = useToggle();
    const {rack}: { rack: Rack } = useRack();
    const {isLoading} = useRack();
    const {isLoading: stuffLoading} = useStuff();
    const {user} = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [showKit, setShowKit] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [showCenterPhoto, setShowCenterPhoto] = useState(false);
    const [selectedMainFile, setSelectedMainFile] = useState<File | null>(null);
    const [selectedCenterFile, setSelectedCenterFile] = useState<File | null>(
        null
    );
    const [editCenterImage, setEditCenterImage] = useState(false);
    const [sizes, setSizes] = useState<Stuff>();

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const {
        application,
        kit,
        more,
        name,
        oem,
        type,
        mainImage,
        mainCenterImage,
    } = rack;
    const [showAvatarInfo, setShowAvatarInfo] = useState(false);
    const [showAnalogs, setShowAnalogs] = useState(false);
    const [selectedArt, setSelectedArt] = useState<string | null>(null);
    const [analogs, setAnalogs] = useState<any[]>([]);

    if (!application || !name) {
        return null;
    }

    const handleShowAnalogs = async (art: string) => {
        setShowKit(false);
        setShowMore(false);
        setSelectedArt(art);
        setShowAnalogs(true);

        const response = await dispatch(stuffName(art));
           setSizes(response.payload);
        try {
            setAnalogs(response.payload.analogs || []);
        } catch (error) {
            console.error("Error fetching analogs:", error);
            setAnalogs([]);
        }
    };


    const handleHideAnalogs = () => {
        setShowAnalogs(false)
        setShowKit(true);
    }


    const renderedApplication = application.split("\n").map((item, index) => (
        <React.Fragment key={index}>
            {index === 0 ? <br/> : null}
            {item.trim()}
            <br/>
        </React.Fragment>
    ));

    const imageExtensions = ["png", "jpg", "jpeg", "webp"];

    const onBeforeFileLoad = (elem: ChangeEvent<HTMLInputElement>) => {
        if (elem.target.files && elem.target.files[0].size > 50 * 1024) {
            alert("Максимум 50 kB!");
            elem.target.value = "";
        }
    };

    const toggleCenterPhoto = () => {
        setShowCenterPhoto(!showCenterPhoto);
    };

    const handleFileChange = async (file: File, type: "main" | "center") => {
        const splitToFindExtension = file.name.split(".");
        const fileExtension = splitToFindExtension[splitToFindExtension.length - 1];

        if (!imageExtensions.includes(fileExtension)) {
            window.alert("Avatar should be an image: png, jpg, jpeg, webp");
            return;
        }
        if (type === "main") {
            setSelectedMainFile(file);
        } else {
            setSelectedCenterFile(file);
        }
    };

    const handleFileUpload = async (type: "main" | "center") => {
        const file = type === "main" ? selectedMainFile : selectedCenterFile;
        if (!file) {
            return;
        }

        const updatedRack = {...rack, imgFile: file};
        try {
            if (type === "main") {
                await dispatch(updateMainImage(updatedRack));
                close()
                setShowAvatarInfo(false)
            } else {
                await dispatch(updateCenterImage(updatedRack));
                close()
                setShowAvatarInfo(false)
            }
            const isNumeric = rack.name.length > 5;
            const queryParams = {
                [isNumeric ? "oem" : "name"]: rack.name,
            };
            await dispatch(getByName(queryParams));
        } catch (error) {
            console.error(`Error updating ${type} image:`, error);
        }
    };

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
                    <InfoOfProperty>{name}</InfoOfProperty>
                </ButtonWrapper>
            </NameOfProperty>
            <ImagesWrapper>
                <ImageWrapper>
                    <PhotoTitle>Загальне фото:</PhotoTitle>

                    <img
                        src={!mainImage || mainImage === "-" ? defaultImage : mainImage}
                        alt="rack view"
                        sizes="(max-width: 767px) 300px, 500px"
                    ></img>

                    {user.role === "admin" && (
                        <EditPhoto
                            role={"button"} tabIndex={0}
                            onClick={() => {
                                setShowAvatarInfo(true);
                                setEditCenterImage(false);
                                open();
                            }}
                        >
                            <EditIcon color={theme.colors.transfers}/>
                        </EditPhoto>
                    )}
                </ImageWrapper>
                <ShowCenterButton onClick={() => toggleCenterPhoto()}>
                    {showCenterPhoto
                        ? "Приховати центральне положення"
                        : "Показати центральне положення"}
                </ShowCenterButton>
                {showCenterPhoto && (
                    <ImageWrapper>
                        <PhotoTitle>Центральне положення:</PhotoTitle>
                        {mainCenterImage !== "-" ? (
                            <img
                                src={
                                    !mainCenterImage || mainCenterImage === "-"
                                        ? defaultImage
                                        : mainCenterImage
                                }
                                alt="rack view center"
                                sizes="(max-width: 767px) 300px, 500px"
                            ></img>
                        ) : (
                            <Spinner/>
                        )}

                        {user.role === "admin" && (
                            <EditPhoto
                                role={"button"} tabIndex={0}
                                onClick={() => {
                                    setShowAvatarInfo(true);
                                    setEditCenterImage(true);
                                    open();
                                }}
                            >
                                <EditIcon color={theme.colors.transfers}/>
                            </EditPhoto>
                        )}
                    </ImageWrapper>
                )}
            </ImagesWrapper>

            <NameOfProperty>
                <ButtonWrapper>
                    Тип: <InfoOfProperty>Агрегат з {type}</InfoOfProperty>
                </ButtonWrapper>
            </NameOfProperty>
            <NameOfProperty>
                <ButtonWrapper>
                    Базовий РМК: <InfoOfProperty>{kit.name}</InfoOfProperty>
                    <MoreButton
                        onClick={() => {
                            setShowKit(true);
                            setShowAnalogs(false)
                            open();
                        }}
                    >
                        <PlusIcon color={theme.colors.light}/>
                    </MoreButton>
                </ButtonWrapper>
            </NameOfProperty>
            <NameOfProperty>
                <ButtonWrapper>
                    Додатково: <InfoOfProperty>{more.name}</InfoOfProperty>{" "}
                    <MoreButton
                        onClick={() => {
                            setShowMore(true);
                            open();
                        }}
                    >
                        <PlusIcon color={theme.colors.light}/>
                    </MoreButton>
                </ButtonWrapper>
            </NameOfProperty>
            <NameOfProperty>
                Застосування: <InfoOfProperty>{renderedApplication}</InfoOfProperty>
            </NameOfProperty>
            <NameOfProperty>
                Оригінальні номери: <InfoOfProperty>{oem}</InfoOfProperty>
            </NameOfProperty>
            {isOpen && (
                <Modal
                    onClick={() => {
                        setShowAvatarInfo(false);
                        setEditCenterImage(false);
                        setShowForm(false);
                        setShowKit(false);
                        setShowMore(false);
                        setShowAnalogs(false);
                        close();
                    }}
                >
                    {showKit && (
                        <>
                            <StyledTable>
                                <thead>
                                <tr>
                                    <StyledTh>Артикул</StyledTh>
                                    <StyledTh>Шт</StyledTh>
                                    <StyledTh>Опис</StyledTh>
                                </tr>
                                </thead>
                                <tbody>
                                {kit.property.map(
                                    ({_id, art, quantity, description}) => (
                                        <tr key={_id}>
                                            <StyledTd
                                                className={'stuff-analog'}
                                                onClick={() => {
                                                    handleShowAnalogs(art);
                                                }}
                                            >
                                                {art}
                                            </StyledTd>
                                            <StyledTd>{quantity}</StyledTd>
                                            <StyledTd>{description}</StyledTd>
                                        </tr>
                                    )
                                )}
                                </tbody>
                            </StyledTable>
                        </>
                    )}
                    {showMore && (
                        <>
                            <StyledTable>
                                <thead>
                                <tr>
                                    <StyledTh>Артикул</StyledTh>
                                    <StyledTh>Шт</StyledTh>
                                    <StyledTh>Опис</StyledTh>
                                </tr>
                                </thead>
                                <tbody>
                                {more.property.map(
                                    ({_id, art, quantity, description}) => (
                                        <tr key={_id}>
                                            <StyledTd>{art}</StyledTd>
                                            <StyledTd>{quantity}</StyledTd>
                                            <StyledTd>{description}</StyledTd>
                                        </tr>
                                    )
                                )}
                                </tbody>
                            </StyledTable>
                        </>
                    )}
                    {showAnalogs && (
                        <Modal onClick={() => handleHideAnalogs()}>
                            <div>
                                <h3 style={{textAlign: 'center', marginBottom: '10px', color: 'white'}}>Розміри <span
                                        style={{color: 'green'}}>{selectedArt}</span></h3>
                                <table style={{margin: '0 auto', borderCollapse: 'collapse', width: '100%', marginBottom: '10px'}}>
                                    <thead>
                                    <tr>
                                        <th style={{
                                            border: '1px solid black',
                                            padding: '10px',
                                            backgroundColor: '#f0f0f0'
                                        }}>d1
                                        </th>
                                        <th style={{
                                            border: '1px solid black',
                                            padding: '10px',
                                            backgroundColor: '#f0f0f0'
                                        }}>d2
                                        </th>
                                        <th style={{
                                            border: '1px solid black',
                                            padding: '10px',
                                            backgroundColor: '#f0f0f0'
                                        }}>D
                                        </th>
                                        <th style={{
                                            border: '1px solid black',
                                            padding: '10px',
                                            backgroundColor: '#f0f0f0'
                                        }}>h1
                                        </th>
                                        <th style={{
                                            border: '1px solid black',
                                            padding: '10px',
                                            backgroundColor: '#f0f0f0'
                                        }}>H
                                        </th>
                                        <th style={{
                                            border: '1px solid black',
                                            padding: '10px',
                                            backgroundColor: '#f0f0f0'
                                        }}>Тип
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr key={sizes?._id}>
                                        <td style={{
                                            border: '1px solid black',
                                            padding: '5px',
                                            textAlign: 'center'
                                        }}>{sizes?.d1}</td>
                                        <td style={{
                                            border: '1px solid black',
                                            padding: '5px',
                                            textAlign: 'center'
                                        }}>{sizes?.d2 ? sizes.d2 : "-"}</td>
                                        <td style={{
                                            border: '1px solid black',
                                            padding: '5px',
                                            textAlign: 'center'
                                        }}>{sizes?.D}</td>
                                        <td style={{
                                            border: '1px solid black',
                                            padding: '5px',
                                            textAlign: 'center'
                                        }}>{sizes?.h1 ? sizes.h1 : "-"}</td>
                                        <td style={{
                                            border: '1px solid black',
                                            padding: '5px',
                                            textAlign: 'center'
                                        }}>{sizes?.H}</td>
                                        <td style={{
                                            border: '1px solid black',
                                            padding: '5px',
                                            textAlign: 'center'
                                        }}>{sizes?.type}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <h3 style={{textAlign: 'center', marginBottom: '20px', color: 'white'}}>Аналоги:</h3>
                                {stuffLoading ? (
                                    <Spinner color={"white"} size={10}/>
                                ) : analogs.length > 0 ? (
                                    <table style={{margin: '0 auto', borderCollapse: 'collapse', width: '100%'}}>
                                        <thead>
                                        <tr>
                                            <th style={{
                                                border: '1px solid black',
                                                padding: '10px',
                                                backgroundColor: '#f0f0f0'
                                            }}>Артикул
                                            </th>
                                            <th style={{
                                                border: '1px solid black',
                                                padding: '10px',
                                                backgroundColor: '#f0f0f0'
                                            }}>Тип
                                            </th>
                                            <th style={{
                                                border: '1px solid black',
                                                padding: '10px',
                                                backgroundColor: '#f0f0f0'
                                            }}>Конструктив
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {analogs.map((item) => (
                                            <tr key={item.id}>
                                                <td style={{
                                                    border: '1px solid black',
                                                    padding: '5px',
                                                    textAlign: 'center'
                                                }}>{item.name}</td>
                                                <td style={{
                                                    border: '1px solid black',
                                                    padding: '5px',
                                                    textAlign: 'center'
                                                }}>{item.type}</td>
                                                <td style={{
                                                    border: '1px solid black',
                                                    padding: '5px',
                                                    textAlign: 'center'
                                                }}>({stuffPosition(item.position)}) {item.position}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>Аналогів не знайдено.</p>
                                )}
                            </div>
                        </Modal>
                    )}
                    {showAvatarInfo && (
                        <AvatarWrapper>
                            <Avatar
                                width={240}
                                height={180}
                                exportSize={10}
                                onBeforeFileLoad={onBeforeFileLoad}
                                mimeTypes="image/jpeg, image/png, image/jpg, image/webp"
                                label="Виберіть новий файл"
                                onFileLoad={(
                                    file: File | ChangeEvent<HTMLInputElement>
                                ) => {
                                    if (file instanceof File) {
                                        handleFileChange(
                                            file,
                                            editCenterImage ? "center" : "main"
                                        );
                                    }
                                }}
                            />
                            <p>*максимум 50kB</p>
                            <p>*найкращий формат зображення 580х250</p>
                            <ButtonEditAvatar
                                disabled={false}
                                onClick={() =>
                                    handleFileUpload(editCenterImage ? "center" : "main")
                                }
                            >
                                {isLoading ? <Spinner/> : 'зберегти'}
                            </ButtonEditAvatar>
                        </AvatarWrapper>
                    )}
                    {showForm && <EditRackForm data={rack} closeModal={close}/>}
                </Modal>
            )}
        </Wrapper>
    )
};

export default RackInfo;
