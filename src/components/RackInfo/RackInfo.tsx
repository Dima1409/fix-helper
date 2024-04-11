import useRack from "hooks/useRack";
import { Rack } from "types/data";
import {
  Wrapper,
  WrapperHeader,
  NameOfProperty,
  InfoOfProperty,
} from "./RackInfo.styled";

const RackInfo: React.FC = () => {
  const { rack }: { rack: Rack } = useRack();
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
        Ремкомплект: <InfoOfProperty>{kit}</InfoOfProperty>
      </NameOfProperty>
      <NameOfProperty>
        Застосування: <InfoOfProperty>{application}</InfoOfProperty>
      </NameOfProperty>
      <NameOfProperty>
        Оригінальні номери: <InfoOfProperty>{oem}</InfoOfProperty>
      </NameOfProperty>
    </Wrapper>
  );
};

export default RackInfo;
