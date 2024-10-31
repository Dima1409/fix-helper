const selectStuff = (state: any) => state.stuff.stuff;
const selectLoading = (state: any) => state.stuff.isLoading;
const selectError = (state: any) => state.stuff.error;
export {selectStuff, selectLoading, selectError};