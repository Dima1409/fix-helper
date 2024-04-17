import useRack from "hooks/useRack";
import useAuth from "hooks/useAuth";
import { Rack } from "types/data";
import React, { useState } from "react";
import useToggle from "hooks/useToggle";
import Modal from "components/Modal";
import AddForm from "components/AddForm";
import {
  Wrapper,
  WrapperHeader,
  NameOfProperty,
  InfoOfProperty,
  MoreButton,
  StyledTable,
  StyledTh,
  StyledTd,
} from "./RackInfo.styled";
import { PlusIcon } from "components/Icons/Icons";
import { theme } from "theme/theme";

const RackInfo: React.FC = () => {
  const { isOpen, close, toggle } = useToggle();
  const { user } = useAuth();
  const { rack }: { rack: Rack } = useRack();
  const [showForm, setShowForm] = useState(false);
  const [showKit, setShowKit] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { application, kit, more, name, oem, type } = rack;
  if (!application || !name) {
    return null;
  }

  const renderedApplication = application.split(",").map((item, index) => (
    <React.Fragment key={index}>
      {index === 0 ? <br /> : null}
      {item.trim()}
      <br />
    </React.Fragment>
  ));

  return (
    <Wrapper>
      <WrapperHeader>Результат пошуку:</WrapperHeader>
      <NameOfProperty>
        Артикул: <InfoOfProperty>{name}</InfoOfProperty>
        {user.role === "admin" && (
          <button
            onClick={() => {
              setShowForm(true);
              toggle();
            }}
          >
            Додати новий агрегат
          </button>
        )}
        {user.role === "user" && <span>Тільки читання</span>}
      </NameOfProperty>
      <NameOfProperty>
        Тип: <InfoOfProperty>{type}</InfoOfProperty>
      </NameOfProperty>
      <NameOfProperty>
        Базовий РМК:{" "}
        <InfoOfProperty>
          {kit.name}

          <MoreButton
            onClick={() => {
              setShowKit(true);
              toggle();
            }}
          >
            <PlusIcon color={theme.colors.light} />
          </MoreButton>
        </InfoOfProperty>
      </NameOfProperty>
      <NameOfProperty>
        Додаткові запчастини:{" "}
        <InfoOfProperty>
          {more.name}

          <MoreButton
            onClick={() => {
              setShowMore(true);
              toggle();
            }}
          >
            <PlusIcon color={theme.colors.light} />
          </MoreButton>
        </InfoOfProperty>
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
            setShowKit(false);
            setShowMore(false);
            setShowForm(false);
            close();
          }}
        >
          {showKit && (
            <>
              <StyledTable>
                <thead>
                  <tr>
                    <StyledTh>Артикул</StyledTh>
                    <StyledTh>Кількість</StyledTh>
                    <StyledTh>Опис</StyledTh>
                  </tr>
                </thead>
                <tbody>
                  {kit.property.map(({ id, art, quantity, description }) => (
                    <tr key={id}>
                      <StyledTd>{art}</StyledTd>
                      <StyledTd>{quantity}</StyledTd>
                      <StyledTd>{description}</StyledTd>
                    </tr>
                  ))}
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
                    <StyledTh>Кількість</StyledTh>
                    <StyledTh>Опис</StyledTh>
                  </tr>
                </thead>
                <tbody>
                  {more.property.map(({ id, art, quantity, description }) => (
                    <tr key={id}>
                      <StyledTd>{art}</StyledTd>
                      <StyledTd>{quantity}</StyledTd>
                      <StyledTd>{description}</StyledTd>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
            </>
          )}
          {showForm && <AddForm />}
        </Modal>
      )}
    </Wrapper>
  );
};

export default RackInfo;
