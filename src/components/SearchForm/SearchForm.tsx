import { Form, Label, Input, ButtonSearch } from "./SearchForm.styled";
import { ChangeEvent, FormEvent, useState } from "react";
import { getByName } from "../../redux/rack/operations";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import RackInfo from "components/RackInfo";

const SearchForm: React.FC = () => {
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const initialValues = {
    searchValue: "",
  };
  const [searchData, setSearchData] = useState(initialValues);

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
      <RackInfo />
    </>
  );
};

export default SearchForm;
