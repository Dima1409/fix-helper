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
} from "./RackInfo.styled";
import { EditIcon, PlusIcon } from "components/Icons/Icons";
import { theme } from "theme/theme";
import defaultImage from "../../images/defaultPhoto.jpg";
import EditForm from "components/EditForm";
import { getAllRacks, updateMainImage } from "../../redux/rack/operations";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Avatar from "react-avatar-edit";
import useAuth from "hooks/useAuth";

const RackInfo: React.FC = () => {
  const { isOpen, open, close, toggle } = useToggle();
  const { rack }: { rack: Rack } = useRack();
  const { isError } = useRack();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [showKit, setShowKit] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {
    application,
    kit,
    more,
    name,
    oem,
    type,
    mainImage,
    mainImageCenter,
  } = rack;
  const [rackImage, setRackImage] = useState<string>("");
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

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const splitToFindExtension = e.target.value.split(".");
    const fileExtension = splitToFindExtension[splitToFindExtension.length - 1];

    if (!imageExtensions.includes(fileExtension)) {
      window.alert("Avatar should be an image: png, jpg, jpeg, webp");
      return;
    }

    const imgFile = files[0];
    console.log("imgFile", imgFile);

    if (imgFile) {
      setRackImage(imgFile.name);
      const updatedRack = { ...rack, mainImage: rackImage };
      try {
        await dispatch(updateMainImage(updatedRack));
        dispatch(getAllRacks());
        close();
      } catch (error) {
        console.error("Error updating main image:", error);
      }
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
                src={mainImage === "" ? defaultImage : mainImage}
                alt="rack view"
                width={300}
              ></img>
              {user.role === "admin" && (
                <EditPhoto
                  type="button"
                  onClick={() => {
                    setShowAvatarInfo(true);
                    toggle();
                  }}
                >
                  <EditIcon color={theme.colors.transfers} />
                </EditPhoto>
              )}
            </ImageWrapper>
            <ImageWrapper>
              <PhotoTitle>Центральне положення:</PhotoTitle>
              <img
                src={mainImageCenter === "" ? defaultImage : mainImageCenter}
                alt="rack view"
                width={300}
              ></img>
              {user.role === "admin" && (
                <EditPhoto
                  type="button"
                  onClick={() => {
                    setShowAvatarInfo(true);
                    toggle();
                  }}
                >
                  <EditIcon color={theme.colors.transfers} />
                </EditPhoto>
              )}
            </ImageWrapper>
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
                <ImagesWrapper onChange={handleFileChange}>
                  <Avatar
                    width={240}
                    height={180}
                    exportSize={10}
                    onBeforeFileLoad={onBeforeFileLoad}
                    mimeTypes="image/jpeg, image/png, image/jpg, image/webp"
                    label="Виберіть новий файл"
                  />
                  <p>*максимум 50kB</p>
                </ImagesWrapper>
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
