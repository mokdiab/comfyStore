import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import userSlice from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    cartState: cartSlice,
    userState: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Enable Redux DevTools
      trace: true,
    }),
});

export default store;
