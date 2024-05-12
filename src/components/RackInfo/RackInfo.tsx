import useRack from "hooks/useRack";
import { Rack } from "types/data";
import React, { useState } from "react";
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
import rackImage from "../../images/defaultPhoto.jpg";
import EditForm from "components/EditForm";

const RackInfo: React.FC = () => {
  const { isOpen, open, close, toggle } = useToggle();
  const { rack }: { rack: Rack } = useRack();
  const { isError } = useRack();
  const [showForm, setShowForm] = useState(false);
  const [showKit, setShowKit] = useState(false);
  const [showMore, setShowMore] = useState(false);
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
              <EditButton
                onClick={() => {
                  setShowForm(true);
                  open();
                }}
              >
                <EditIcon color={theme.colors.light} />
              </EditButton>
              <InfoOfProperty>{name}</InfoOfProperty>
            </ButtonWrapper>
          </NameOfProperty>
          <ImagesWrapper>
            <ImageWrapper>
              <PhotoTitle>Загальне фото:</PhotoTitle>
              <img
                src={mainImage === "" ? rackImage : mainImage}
                alt="rack view"
                width={300}
              ></img>
            </ImageWrapper>
            <ImageWrapper>
              <PhotoTitle>Центральне положення:</PhotoTitle>
              <img
                src={mainImageCenter === "" ? rackImage : mainImageCenter}
                alt="rack view"
                width={300}
              ></img>
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
              {showForm && <EditForm data={rack} />}
            </Modal>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default RackInfo;
