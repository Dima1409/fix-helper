import {
  Form,
  Label,
  Input,
  ButtonSearch,
  ShowAll,
  ButtonsWrapper,
  HeaderNames,
  NamesList,
} from "./SearchForm.styled";
import { ChangeEvent, FormEvent, useState } from "react";
import { getByName } from "../../redux/rack/operations";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import RackInfo from "components/RackInfo";
import { getAllRacks } from "../../redux/rack/operations";
import { Rack } from "types/data";

const SearchForm: React.FC = () => {
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const initialValues = {
    searchValue: "",
  };
  const [searchData, setSearchData] = useState(initialValues);
  const [allRacks, setAllRacks] = useState<Rack[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSearchData(initialValues);
      const searchValue = searchData.searchValue.trim().toUpperCase();
      const isNumeric = searchValue.length > 5;

      const queryParams = {
        [isNumeric ? "oem" : "name"]: searchValue,
      };

      dispatchTyped(getByName(queryParams));
    } catch (error) {
      console.log(error);
    }
  };

  const organizeRacksByAlphabet = (): { [key: string]: Rack[] } => {
    const alphabetizedRacks: { [key: string]: Rack[] } = {};

    allRacks.forEach((rack: Rack) => {
      const firstLetter = rack.name.charAt(0).toUpperCase();
      if (!alphabetizedRacks[firstLetter]) {
        alphabetizedRacks[firstLetter] = [];
      }
      alphabetizedRacks[firstLetter].push(rack);
    });

    return alphabetizedRacks;
  };

  const organizedRacks: { [key: string]: Rack[] } = organizeRacksByAlphabet();

  const getAll = async () => {
    let res;
    res = dispatchTyped(getAllRacks());
    setAllRacks((await res).payload);
  };

  const getByNameMore = async (elem: Rack) => {
    setAllRacks([]);
    dispatchTyped(getByName({ name: elem.name }));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="searchInput">
          <Input
            id="searchInput"
            name="searchValue"
            onChange={handleInputChange}
            value={searchData.searchValue}
            type="text"
            placeholder="Номер агрегату"
          ></Input>
        </Label>
        <ButtonSearch type="submit" disabled={searchData.searchValue === ""}>
          пошук
        </ButtonSearch>
      </Form>
      <ButtonsWrapper>
        {allRacks.length === 0 && (
          <ShowAll onClick={() => getAll()}>Показати всі</ShowAll>
        )}
        {allRacks.length > 0 && (
          <ShowAll onClick={() => setAllRacks([])}>Сховати всі</ShowAll>
        )}
      </ButtonsWrapper>

      {Object.keys(organizedRacks).map((letter: string) => (
        <div key={letter}>
          <HeaderNames>{letter}</HeaderNames>
          <ul>
            {organizedRacks[letter].map((rack) => (
              <NamesList onClick={() => getByNameMore(rack)} key={rack.id}>
                {rack.name}
              </NamesList>
            ))}
          </ul>
        </div>
      ))}

      <RackInfo />
    </>
  );
};

export default SearchForm;
