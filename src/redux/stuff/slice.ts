import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    getAllStuff,
    getById,
    getByName,
    createNewStuff,
    updateStuff,
    deleteStuff
} from "./operations"
import {Stuff} from "../../types/stuffing-boxes";

interface StuffState {
    stuff: Stuff[];
    isLoading: boolean;
    error: string | null;
}

const initialState: StuffState = {
    stuff: [],
    isLoading: false,
    error: null,
};

const handlePending = (state: StuffState) => {
    state.isLoading = true;
};
const handleRejected = (state: StuffState, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
};

const StuffSlice = createSlice({
    name: "stuff",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllStuff.pending, handlePending)
            .addCase(getByName.pending, handlePending)
            .addCase(createNewStuff.pending, handlePending)
            .addCase(updateStuff.pending, handlePending)
            .addCase(deleteStuff.pending, handlePending)
            .addCase(getById.pending, handlePending)

            .addCase(getAllStuff.rejected, handleRejected)
            .addCase(getByName.rejected, handleRejected)
            .addCase(getById.rejected, handleRejected)
            .addCase(createNewStuff.rejected, handleRejected)
            .addCase(updateStuff.rejected, handleRejected)
            .addCase(deleteStuff.rejected, handleRejected)

            .addCase(
                getAllStuff.fulfilled,
                (state: StuffState, action: PayloadAction<Stuff[]>) => {
                    state.isLoading = false;
                    state.error = null;
                    state.stuff = action.payload;
                }
            )
            .addCase(
                getByName.fulfilled,
                (state: StuffState, action: PayloadAction<Stuff[]>) => {
                    state.isLoading = false;
                    state.error = null;
                    state.stuff = action.payload;
                }
            )
            .addCase(
                getById.fulfilled,
                (state: StuffState, action: PayloadAction<Stuff>) => {
                    state.isLoading = false;
                    state.error = null;
                    state.stuff = [action.payload];
                }
            )
            .addCase(createNewStuff.fulfilled, (state: StuffState) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateStuff.fulfilled, (state: StuffState) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(
                deleteStuff.fulfilled,
                (state: StuffState, action: PayloadAction<Stuff>) => {
                    state.isLoading = false;
                    state.error = null;
                    const index = state.stuff.findIndex(
                        (stuff) => stuff._id === action.payload._id
                    );
                    state.stuff.splice(index, 1);
                }
            );
    },
});

export const stuffReducer = StuffSlice.reducer;
