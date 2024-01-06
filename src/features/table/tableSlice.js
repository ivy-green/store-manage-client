import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    selectList: [],
    searchValue: "",
    detail: {},
  },
  reducers: {
    detailButton: (state, action) => {
      state.detail = action.payload;
    },
    handleSelected: (state, action) => {
      state.selectList = [...action.payload];
    },
    handleSearch: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export default tableSlice;
