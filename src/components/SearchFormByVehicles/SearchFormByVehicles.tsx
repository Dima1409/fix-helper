import {
  Form,
  Label,
  Input,
  ButtonSearch,
  ButtonsWrapper,
  HeaderNames
} from "../SearchForm/SearchForm.styled";
import {RacksList, NamesList} from "./SearchFormByVehicles.styled";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import RackInfo from "components/RackInfo";
import {
  getByApplication, getByName,
} from "../../redux/rack/operations";
import { Rack } from "types/racks";
import { useParams, useNavigate } from "react-router-dom";
import useRack from "hooks/useRack";
import Spinner from "components/Spinner";
import {WrapperHeaderError} from "../RackInfo/RackInfo.styled";
import {theme} from "../../theme/theme";
import defaultImage from "../../images/defaultPhoto.jpg";

const SearchFormByVehicle: React.FC = () => {
  const { isLoading, isError } = useRack();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const initialValues = {
    searchValue: "",
  };
  const [searchData, setSearchData] = useState(initialValues);
  const [allRacks, setAllRacks] = useState<Rack[]>([]);

  useEffect(() => {
    if (id) {
      dispatchTyped(getByName({ name: id.toUpperCase() }));
    }
  }, [id, dispatchTyped]);


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
      setLoading(true);
      setSearchData(initialValues);

      const searchValue = searchData.searchValue.trim();
      if (!searchValue) return;

      const { payload } = await dispatchTyped(getByApplication(searchValue));
      setAllRacks(payload.result);

      if (payload?.name) {
        navigate(`/steering/racks-by-vehicles/${payload.name}`);
      } else {
        console.warn("No result found");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getByNameMore = async (elem: Rack) => {
    setAllRacks([]);
    navigate(`/steering/racks-by-vehicles/${elem.name}`);
  };

  return (
    <>
      <HeaderNames style={{textAlign: 'center'}}>Пошук рейки по марці або моделі авто</HeaderNames>
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
      </ButtonsWrapper>
      {allRacks.length > 0 && (
          <HeaderNames
              style={{ textAlign: "center", color: `${theme.colors.accent}` }}
          >
            Знайдено агрегатів: {allRacks.length}
          </HeaderNames>
      )}
      {(isLoading || loading) && <Spinner />}
            <RacksList>
              {allRacks.map((rack) => (
                  <NamesList key={rack._id} onClick={() => getByNameMore(rack)}>
                <span>
                  {rack.name}
                </span>
                    <img src={rack.mainImage !== '' ? rack.mainImage : defaultImage} alt={rack.name}></img>
                    <span>{rack.application.split(',')}</span>
                  </NamesList>
              ))}
            </RacksList>
      {isError ? <WrapperHeaderError>Нічого не знайдено</WrapperHeaderError> : <RackInfo />}

    </>
  );
};

export default SearchFormByVehicle;






