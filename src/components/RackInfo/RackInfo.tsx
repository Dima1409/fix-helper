import useRack from "hooks/useRack";
import { Rack } from "types/data";
import useToggle from "hooks/useToggle";
import Modal from "components/Modal";
import {
  Wrapper,
  WrapperHeader,
  NameOfProperty,
  InfoOfProperty,
  MoreButton,
} from "./RackInfo.styled";
import { PlusIcon } from "components/Icons/Icons";
import { theme } from "theme/theme";

const RackInfo: React.FC = () => {
  const { isOpen, close, toggle } = useToggle();
  const { rack }: { rack: Rack } = useRack();
  console.log(rack);
  const { application, kit, name, oem, type } = rack;
  if (!application || !name) {
    return null;
  }
  return (
    <Wrapper>
      <WrapperHeader>Результат пошуку:</WrapperHeader>
      <NameOfProperty>
        Артикул: <InfoOfProperty>{name}</InfoOfProperty>
      </NameOfProperty>
      <NameOfProperty>
        Тип: <InfoOfProperty>{type}</InfoOfProperty>
      </NameOfProperty>
      <NameOfProperty>
        Ремкомплект:{" "}
        <InfoOfProperty>
          {kit}

          <MoreButton onClick={() => toggle()}>
            <PlusIcon color={theme.colors.light} />
          </MoreButton>
        </InfoOfProperty>
      </NameOfProperty>
      <NameOfProperty>
        Застосування: <InfoOfProperty>{application}</InfoOfProperty>
      </NameOfProperty>
      <NameOfProperty>
        Оригінальні номери: <InfoOfProperty>{oem}</InfoOfProperty>
      </NameOfProperty>
      {isOpen && (
        <Modal
          onClick={() => {
            close();
          }}
        >
          рмк рейки
        </Modal>
      )}
    </Wrapper>
  );
};

export default RackInfo;
