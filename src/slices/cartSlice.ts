import type {CartItem} from "../model/CartItem.ts";
import {createSlice} from "@reduxjs/toolkit";
import type {ProductData} from "../model/ProductData.ts";
import type {PayloadAction} from "@reduxjs/toolkit";

interface CartState {
    items:CartItem[];
}

const initialState: CartState = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
     addItemToCart: (state:CartState,action:PayloadAction<ProductData>) => {

         const existingItem= state.items.find((item)=>
             item.product.id===action.payload.id);
         if (!existingItem) {
             state.items.push({
                 product: action.payload,
                 itemCount: 1
             })
         }


     },
        increaceQuantity(state:CartState,action:PayloadAction<number>){
            console.log(action.payload);
            const item=state.items.find((existingItem)=>{
                return existingItem.product.id===action.payload
            })
            if (item) {
                item.itemCount+=1
            }
        },
        decreaseQuantity(state:CartState,action:PayloadAction<number>){
            const item=state.items.find((existingItem)=>{
                return existingItem.product.id===action.payload
            })
            if (item && item.itemCount>1) {
                item.itemCount-=1
            }
        }

    }

});

export const cartReducer = cartSlice.reducer;
export const {addItemToCart,increaceQuantity,decreaseQuantity} = cartSlice.actions;