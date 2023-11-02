import { createSlice } from '@reduxjs/toolkit';

const apiSlice = createSlice({
    name: 'api',
    initialState: {
        apiData: [],
        isLoading: true,
        filteredData: [], // Add a filteredData field
        number: 0,
        addCardShow: [],
        bookMakShow: [],
        toggleBlock:'',
        productPageRedux:'',
        productData:[],
    },
    reducers: {
        setApiData: (state, action) => {
            state.apiData = action.payload;
            state.isLoading = false;
        },
        setFilteredData: (state, action) => {
            state.filteredData = action.payload;
        },
        setNumber: (state, action) => {
            state.number = action.payload; // Update the number in the state
        },
        setAddCardShow: (state, action) => {
            state.addCardShow = action.payload; // Update the number in the state
        },
        seToggleBlock: (state, action) => {
            state.toggleBlock = action.payload; // Update the number in the state
        },
        setBookMakShow: (state, action) => {
            state.bookMakShow = action.payload; // Update the number in the state
        },
        setProductPageRedux: (state, action) => {
            state.productPageRedux = action.payload; // Update the number in the state
        },
        setProductData: (state, action) => {
            state.productData = action.payload; // Update the number in the state
        },
    },
});

export const { setApiData, setFilteredData, setNumber, setAddCardShow, seToggleBlock, setBookMakShow, setProductPageRedux, setProductData } = apiSlice.actions;
export default apiSlice.reducer;
