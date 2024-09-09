import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      );
      if (existingItemIndex === -1) {
        state.items.push({
          id: newItem.id,
          name: newItem.title,
          brand:newItem.brand,
          imageURL: newItem.imageURL,
          price: newItem.price,
          totalPrice: newItem.price * newItem.quantity, // Calculate total price based on quantity
          quantity: newItem.quantity,
          size: newItem.size,
        });
      } else {
        state.items[existingItemIndex].quantity += newItem.quantity; // Increase quantity of existing item
        state.items[existingItemIndex].totalPrice += newItem.price * newItem.quantity; // Update total price
      }
      state.totalQuantity += newItem.quantity; // Increase total quantity
      state.totalPrice += newItem.price * newItem.quantity; // Update total cart price
    },
    removeFromCart(state, action) {
      const { id, size } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === id && item.size === size
      );

      if (existingItemIndex !== -1) {
        const itemToRemove = state.items[existingItemIndex];
        if (itemToRemove.quantity > 1) {
          itemToRemove.quantity -= 1; // Decrease quantity
          itemToRemove.totalPrice -= itemToRemove.price; // Decrease total price
        } else {
          state.items.splice(existingItemIndex, 1); // Remove item from cart
        }
        state.totalQuantity -= 1; // Decrease total quantity
        state.totalPrice -= itemToRemove.price; // Decrease total cart price
      }
    },
    resetCart(state){
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    }
  },
});

export const { addToCart, removeFromCart ,resetCart} = cartSlice.actions;

export default cartSlice.reducer;
