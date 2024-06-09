import useRack from "hooks/useRack";
import { Rack } from "types/data";
import React, { useState, ChangeEvent } from "react";
import useToggle from "hooks/useToggle";
import Modal from "components/Modal";
import {
  Wrapper,
  WrapperHeader,
  WrapperHeaderError,
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
import { EditIcon, PlusIcon } from "components/Icons/Icons";
import { theme } from "theme/theme";
import defaultImage from "../../images/defaultPhoto.jpg";
import EditForm from "components/EditForm";
import {
  getAllRacks,
  updateMainImage,
  updateCenterImage,
} from "../../redux/rack/operations";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Avatar from "react-avatar-edit";
import useAuth from "hooks/useAuth";
import Spinner from "components/Spinner";

const RackInfo: React.FC = () => {
  const { isOpen, open, close, toggle } = useToggle();
  const { rack }: { rack: Rack } = useRack();
  const { isError } = useRack();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [showKit, setShowKit] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showCenterPhoto, setShowCenterPhoto] = useState(false);
  const [selectedMainFile, setSelectedMainFile] = useState<File | null>(null);
  const [selectedCenterFile, setSelectedCenterFile] = useState<File | null>(
    null
  );
  const [editCenterImage, setEditCenterImage] = useState(false);

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
  if (!application || !name) {
    return null;
  }

  const renderedApplication = application.split("\n").map((item, index) => (
    <React.Fragment key={index}>
      {index === 0 ? <br /> : null}
      {item.trim()}
      <br />
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

    const updatedRack = { ...rack, imgFile: file };
    try {
      if (type === "main") {
        await dispatch(updateMainImage(updatedRack));
      } else {
        await dispatch(updateCenterImage(updatedRack));
      }
      dispatch(getAllRacks());
      close();
    } catch (error) {
      console.error(`Error updating ${type} image:`, error);
    }
  };

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
                  <EditIcon color={theme.colors.light} />
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
                  type="button"
                  onClick={() => {
                    setShowAvatarInfo(true);
                    setEditCenterImage(false);
                    toggle();
                  }}
                >
                  <EditIcon color={theme.colors.transfers} />
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
                  <Spinner />
                )}

                {user.role === "admin" && (
                  <EditPhoto
                    type="button"
                    onClick={() => {
                      setShowAvatarInfo(true);
                      setEditCenterImage(true);
                      toggle();
                    }}
                  >
                    <EditIcon color={theme.colors.transfers} />
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
                  toggle();
                }}
              >
                <PlusIcon color={theme.colors.light} />
              </MoreButton>
            </ButtonWrapper>
          </NameOfProperty>
          <NameOfProperty>
            <ButtonWrapper>
              Додатково: <InfoOfProperty>{more.name}</InfoOfProperty>{" "}
              <MoreButton
                onClick={() => {
                  setShowMore(true);
                  toggle();
                }}
              >
                <PlusIcon color={theme.colors.light} />
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
                        ({ _id, art, quantity, description }) => (
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
                        ({ _id, art, quantity, description }) => (
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
                    ok
                  </ButtonEditAvatar>
                </AvatarWrapper>
              )}
              {showForm && <EditForm data={rack} />}
            </Modal>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default RackInfo;
