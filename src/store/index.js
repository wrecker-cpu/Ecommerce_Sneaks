import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './ProductSlice/ProductSlice'
import currentPageReducer from './CurrentPageSlice/CurrentPageSlice'
import cartReducer from './CartSlice/CartSlice'
import shippingReducer from './ShippingAddress/ShippingAddressSlice'
import orderReducer from './OrderSlice/OrderSlice'
import validationReducer from './ValidationSlice/ValidationSlice'
import userReducer from './UserSlice/UserSlice'

const store = configureStore({
  reducer: {
    products: productsReducer,
    currentpage:currentPageReducer,
    cart:cartReducer,
    shipping:shippingReducer,
    order:orderReducer,
    validation:validationReducer,
    user: userReducer,
  },
})

export default store;
