const selectRack = (state: any) => state.rack.rack;
const selectLoading = (state: any) => state.rack.isLoading;
const selectError = (state: any) => state.rack.error;
export { selectRack, selectLoading, selectError };
