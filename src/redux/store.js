import { configureStore } from '@reduxjs/toolkit';
import { productsReducer, selectedProductsReducer } from "./reducers/productsReducer";

import reducers from "./reducers/index";

const store = configureStore({ reducer:{
  productsReducer : productsReducer,
  selectedProductsReducer : selectedProductsReducer
}
}
 
);

export default store;
