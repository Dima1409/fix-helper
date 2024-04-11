import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "services/AxiosConfig";

interface Racks {
  id?: string;
  name: string;
  type: string;
  kit: string;
  application: string;
  oem: string;
  image: string;
}

interface GetByNamePayload {
  name: string;
}

const getAllRacks = createAsyncThunk("rack/getAll", async (_, thunkAPI) => {
  try {
    const response = await API.get("/rack/getAll");
    console.log("response", response);
    return response.data.data.result;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue(error.message);
  }
});

// const getByName = createAsyncThunk(
//   "rack/getByName",
//   async (credentials: Racks, thunkAPI) => {
//     try {
//       const response = await API.get("/rack/getByName", credentials);
//       return response.data.data.result;
//     } catch (error: any) {
//       throw thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

const getByName = createAsyncThunk(
  "rack/getByName",
  async (payload: GetByNamePayload, thunkAPI) => {
    try {
      console.log("name", payload.name);
      const response = await API.get("/rack/getByName", {
        params: { name: payload.name },
      });
      console.log("response", response.data.data.result);
      return response.data.data.result;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

const createNewRack = createAsyncThunk(
  "/rack/new",
  async (credentials: Racks, thunkAPI) => {
    try {
      const response = await API.post("/rack/new", credentials);
      return response.data.data.result;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

const deleteRack = createAsyncThunk(
  "/rack/delete",
  async (credentials: Racks, thunkAPI) => {
    try {
      const response = await API.delete(`/rack/${credentials}`);
      return response.data.data;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { getAllRacks, getByName, createNewRack, deleteRack };
