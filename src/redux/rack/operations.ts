import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "services/AxiosConfig";
import { Rack } from "types/racks";

interface GetByNamePayload {
  name?: string;
  oem?: string;
}

const getAllRacks = createAsyncThunk("rack/getAll", async (_, thunkAPI) => {
  try {
    const response = await API.get("/rack/getAll");
    return response.data.data.result;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue(error.message);
  }
});

const getByName = createAsyncThunk(
  "rack/getByName",
  async (payload: GetByNamePayload, thunkAPI) => {
    try {
      const params: { name?: string; oem?: string } = {};
      if (payload.name) {
        params.name = payload.name;
      }
      if (payload.oem) {
        params.oem = payload.oem;
      }
      const response = await API.get("/rack/getByName", {
        params: params,
      });
      return response.data.data.result;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

const getById = createAsyncThunk(
  "rack/getById",
  async (credentials: string, thunkAPI) => {
    try {
      const response = await API.get(`/rack/getById/${credentials}`);
      return response.data.data;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

const createNewRack = createAsyncThunk(
  "/rack/new",
  async (credentials: Rack, thunkAPI) => {
    try {
      const response = await API.post("/rack/new", credentials);
      return response.data.data.result;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

const updateRack = createAsyncThunk(
  "/rack/edit",
  async (credentials: Rack, thunkAPI) => {
    const { name, type, oem, application, kit, more } = credentials;
    try {
      const response = await API.patch(`/rack/edit/${credentials._id}`, {
        name,
        type,
        oem,
        application,
        kit,
        more,
      });
      return response.data.data.result;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

const updateMainImage = createAsyncThunk(
  "/rack/mainPhoto",
  async (credentials: Rack, thunkAPI) => {
    const { imgFile } = credentials;
    try {
      const config = {
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await API.patch(
        `/rack/mainPhoto/${credentials._id}`,
        { mainImage: imgFile },
        config
      );
      return response.data;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

const updateCenterImage = createAsyncThunk(
  "/rack/centerPhoto",
  async (credentials: Rack, thunkAPI) => {
    const { imgFile } = credentials;
    try {
      const config = {
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await API.patch(
        `/rack/centerPhoto/${credentials._id}`,
        { mainCenterImage: imgFile },
        config
      );
      return response.data;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

const deleteRack = createAsyncThunk(
  "/rack/delete",
  async (credentials: string, thunkAPI) => {
    try {
      const response = await API.delete(`/rack/${credentials}`);
      return response.data.data;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

export {
  getAllRacks,
  getByName,
  getById,
  createNewRack,
  updateRack,
  deleteRack,
  updateMainImage,
  updateCenterImage,
};
