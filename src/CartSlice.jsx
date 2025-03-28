import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    total: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.name === newItem.name);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push(newItem);
            }
            
            // Calculate total
            state.total = state.items.reduce((total, item) => {
                const price = parseFloat(item.cost.replace('$', ''));
                return total + (price * item.quantity);
            }, 0);
        },
        removeItem: (state, action) => {
            const itemName = action.payload;
            state.items = state.items.filter(item => item.name !== itemName);
            
            // Recalculate total
            state.total = state.items.reduce((total, item) => {
                const price = parseFloat(item.cost.replace('$', ''));
                return total + (price * item.quantity);
            }, 0);
        },
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const item = state.items.find(item => item.name === name);
            
            if (item) {
                item.quantity = quantity;
                
                // Recalculate total
                state.total = state.items.reduce((total, item) => {
                    const price = parseFloat(item.cost.replace('$', ''));
                    return total + (price * item.quantity);
                }, 0);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        }
    }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
