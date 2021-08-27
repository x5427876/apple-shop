import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commerce } from "../lib/commerce";

const initialState = {
  shippingCountries: [],
  shippingSubdivisions: [],
  shippingOptions: [],
  shippingData: {},
  checkoutToken: null,
};

export const fetchShippingCountries = createAsyncThunk(
  "fetchShippingCountries",
  async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    commerce.services.localeListShippingCountries(checkoutTokenId).then((response) => console.log(response));
    return countries;
  }
);

export const genrateToken = createAsyncThunk("genrateToken", async (arg) => {
  try {
    return await commerce.checkout.generateToken(arg.id, arg.type);
  } catch (err) { }
});

export const fetchSubdivisions = createAsyncThunk(
  "fetchSubdivisions",
  async (country) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(country);
    return subdivisions
  }
);

export const fetchShippingOptions = createAsyncThunk(
  "fetchShippingOptions",
  async (arg) => {
    const options = await commerce.checkout.getShippingOptions(arg.id, { country: arg.country, region: arg.region });
    return options
  }
);

export const paymentSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addShippingData: (state, action) => {
      state.shippingData = action.payload
    },
  },
  extraReducers: {
    [fetchShippingCountries.fulfilled]: (state, action) => {
      state.shippingCountries = action.payload;
    },
    [fetchSubdivisions.fulfilled]: (state, action) => {
      state.shippingSubdivisions = action.payload;
    },
    [genrateToken.fulfilled]: (state, action) => {
      state.checkoutToken = action.payload;
    },
    [fetchShippingOptions.fulfilled]: (state, action) => {
      state.shippingOptions = action.payload;
    },
  },
});

export const { addShippingData } = paymentSlice.actions

export default paymentSlice.reducer;
