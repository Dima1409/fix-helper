import {createAsyncThunk} from "@reduxjs/toolkit";
import API from "services/AxiosConfig";
import {Stuff} from "../../types/stuffing-boxes";

const getAllStuff = createAsyncThunk("stuff/getAll", async (_, thunkAPI) => {
    try {
        const response = await API.get("/stuff/getAll");
        return response.data.data.result;
    } catch (error: any) {
        throw thunkAPI.rejectWithValue(error.message);
    }
});

const getByName = createAsyncThunk(
    "stuff/getByName",
    async (name: string, thunkAPI) => {
        try {
            const response = await API.get("/stuff/getByName", {
                params: { name },
            });
            return response.data.data.result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


const getById = createAsyncThunk(
    "stuff/getById",
    async (credentials: string, thunkAPI) => {
        try {
            const response = await API.get(`/stuff/getById/${credentials}`);
            return response.data.data;
        } catch (error: any) {
            throw thunkAPI.rejectWithValue(error.message);
        }
    }
);

const createNewStuff = createAsyncThunk(
    "/stuff/new",
    async (credentials: Stuff, thunkAPI) => {
        try {
            const response = await API.post("/stuff/new", credentials);
            return response.data.data.result;
        } catch (error: any) {
            throw thunkAPI.rejectWithValue(error);
        }
    }
);

const updateStuff = createAsyncThunk(
    "/stuff/edit",
    async (credentials: Stuff, thunkAPI) => {
        const {name, type, position, d1, d2, D, h1, H} = credentials;
        try {
            const response = await API.patch(`/stuff/edit/${credentials._id}`, {
                name,
                type,
                position,
                d1,
                d2,
                D,
                h1,
                H
            });
            return response.data.data.result;
        } catch (error: any) {
            throw thunkAPI.rejectWithValue(error);
        }
    }
);

const deleteStuff = createAsyncThunk(
    "/stuff/delete",
    async (credentials: string, thunkAPI) => {
        try {
            const response = await API.delete(`/stuff/${credentials}`);
            return response.data.data;
        } catch (error: any) {
            throw thunkAPI.rejectWithValue(error.message);
        }
    }
);

export {
    getAllStuff,
    getByName,
    getById,
    createNewStuff,
    updateStuff,
    deleteStuff,
};