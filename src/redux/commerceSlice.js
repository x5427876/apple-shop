import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commerce } from "../lib/commerce";

const initialState = {
  products: [],
  cart: {},
};

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const { data } = await commerce.products.list();
  return data;
});

export const fetchCart = createAsyncThunk("fetchCart", async () => {
  const cart = await commerce.cart.retrieve();
  return cart;
});

export const addToCart = createAsyncThunk("addToCart", async (arg) => {
  const item = await commerce.cart.add(arg.id, arg.quan);
  return item.cart;
});

export const updateCartQty = createAsyncThunk("updateCartQty", async (arg) => {
  const item = await commerce.cart.update(arg.id, { quantity: arg.quan });
  return item.cart;
});

export const removeFromCart = createAsyncThunk("removeFromCart", async (id) => {
  const item = await commerce.cart.remove(id);
  return item.cart;
});

export const emptyCart = createAsyncThunk("emptyCart", async () => {
  const item = await commerce.cart.empty();
  return item.cart;
});

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.products.push(action.payload);
    },
    [fetchCart.fulfilled]: (state, action) => {
      state.cart = action.payload;
    },
    [addToCart.fulfilled]: (state, action) => {
      state.cart = action.payload;
    },
    [updateCartQty.fulfilled]: (state, action) => {
      state.cart = action.payload;
    },
    [removeFromCart.fulfilled]: (state, action) => {
      state.cart = action.payload;
    },
    [emptyCart.fulfilled]: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export default counterSlice.reducer;
