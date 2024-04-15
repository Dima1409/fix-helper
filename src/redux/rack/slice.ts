import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllRacks,
  getByName,
  createNewRack,
  deleteRack,
} from "./operations";
import { Rack } from "types/data";

interface RackState {
  rack: Rack[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RackState = {
  rack: [],
  isLoading: false,
  error: null,
};

const handlePending = (state: RackState) => {
  state.isLoading = true;
};
const handleRejected = (state: RackState, action: any) => {
  state.isLoading = false;
  state.error = action.payload;
};

const RackSlice = createSlice({
  name: "rack",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRacks.pending, handlePending)
      .addCase(getByName.pending, handlePending)
      .addCase(createNewRack.pending, handlePending)
      .addCase(deleteRack.pending, handlePending)
      .addCase(getAllRacks.rejected, handleRejected)
      .addCase(getByName.rejected, handlePending)
      .addCase(createNewRack.rejected, handleRejected)
      .addCase(deleteRack.rejected, handleRejected)
      .addCase(
        getAllRacks.fulfilled,
        (state: RackState, action: PayloadAction<Rack[]>) => {
          state.isLoading = false;
          state.error = null;
          state.rack = action.payload;
        }
      )
      .addCase(
        getByName.fulfilled,
        (state: RackState, action: PayloadAction<Rack[]>) => {
          state.isLoading = false;
          state.error = null;
          state.rack = action.payload;
        }
      )
      .addCase(
        createNewRack.fulfilled,
        (state: RackState, action: PayloadAction<Rack>) => {
          state.isLoading = false;
          state.error = null;
          state.rack.push(action.payload);
        }
      )
      .addCase(
        deleteRack.fulfilled,
        (state: RackState, action: PayloadAction<Rack>) => {
          state.isLoading = false;
          state.error = null;
          const index = state.rack.findIndex(
            (rack) => rack.id === action.payload.id
          );
          state.rack.splice(index, 1);
        }
      );
  },
});

export const rackReducer = RackSlice.reducer;