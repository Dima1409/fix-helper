import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllRacks,
  getByName,
  getById,
  createNewRack,
  updateRack,
  deleteRack,
  updateMainImage,
  updateCenterImage
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
      .addCase(updateRack.pending, handlePending)
      .addCase(deleteRack.pending, handlePending)
      .addCase(getById.pending, handlePending)
      .addCase(updateMainImage.pending, handlePending)
      .addCase(updateCenterImage.pending, handlePending)
      .addCase(getAllRacks.rejected, handleRejected)
      .addCase(getByName.rejected, handleRejected)
      .addCase(getById.rejected, handleRejected)
      .addCase(createNewRack.rejected, handleRejected)
      .addCase(updateRack.rejected, handleRejected)
      .addCase(deleteRack.rejected, handleRejected)
      .addCase(updateMainImage.rejected, handleRejected)
      .addCase(updateCenterImage.rejected, handleRejected)
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
        getById.fulfilled,
        (state: RackState, action: PayloadAction<Rack>) => {
          state.isLoading = false;
          state.error = null;
          state.rack = [action.payload];
        }
      )
      .addCase(createNewRack.fulfilled, (state: RackState) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateRack.fulfilled, (state: RackState) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateMainImage.fulfilled, (state: RackState) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateCenterImage.fulfilled, (state: RackState) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(
        deleteRack.fulfilled,
        (state: RackState, action: PayloadAction<Rack>) => {
          state.isLoading = false;
          state.error = null;
          const index = state.rack.findIndex(
            (rack) => rack._id === action.payload._id
          );
          state.rack.splice(index, 1);
        }
      );
  },
});

export const rackReducer = RackSlice.reducer;
