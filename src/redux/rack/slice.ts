import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllRacks,
  getByName,
  createNewRack,
  deleteRack,
} from "./operations";

interface Racks {
  id?: string;
  name: string;
  type: string;
  kit: string;
  application: string;
  oem: string;
  image: string;
}

interface RacksState {
  racks: Racks[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RacksState = {
  racks: [],
  isLoading: false,
  error: null,
};

const handlePending = (state: RacksState) => {
  state.isLoading = true;
};
const handleRejected = (state: RacksState, action: any) => {
  state.isLoading = false;
  state.error = action.payload;
};

const RackSlice = createSlice({
  name: "racks",
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
        (state: RacksState, action: PayloadAction<Racks[]>) => {
          state.isLoading = false;
          state.error = null;
          state.racks = action.payload;
        }
      )
      .addCase(
        getByName.fulfilled,
        (state: RacksState, action: PayloadAction<Racks[]>) => {
          state.isLoading = false;
          state.error = null;
          state.racks = action.payload;
        }
      )
      .addCase(
        createNewRack.fulfilled,
        (state: RacksState, action: PayloadAction<Racks>) => {
          state.isLoading = false;
          state.error = null;
          state.racks.push(action.payload);
        }
      )
      .addCase(
        deleteRack.fulfilled,
        (state: RacksState, action: PayloadAction<Racks>) => {
          state.isLoading = false;
          state.error = null;
          const index = state.racks.findIndex(
            (rack) => rack.id === action.payload.id
          );
          state.racks.splice(index, 1);
        }
      );
  },
});

export const rackReducer = RackSlice.reducer;
