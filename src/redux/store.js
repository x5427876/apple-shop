import { configureStore } from "@reduxjs/toolkit";
import commerceSlice from "./commerceSlice";
import paymentSlice from "./paymentSlice";

export const store = configureStore({
  reducer: { store: commerceSlice, checkout: paymentSlice },
});
