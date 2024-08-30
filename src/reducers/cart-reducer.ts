import { db } from "../data/db";
import { CartItem, Product } from "../types";

export type CartAction = 
    { type: 'add-to-cart', payload: {item:Product} } |
    { type: 'remove-from-cart', payload: {id : Product['id']} } |
    { type: 'increase-quantity', payload: {id : Product['id']} } |
    { type: 'decrease-quantity', payload: {id : Product['id']} } |
    { type: 'clear-cart' } 

export type CartState = {
    data: Product[]
    cart: CartItem[]
}    

const initialCart = () : CartItem[] =>{
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

export const initialState : CartState ={
    data: db,
    cart: initialCart()
}


const MAX_ITEMS = 5;
const MIN_ITEMS = 1;
export const cartReducer = (state: CartState = initialState, action : CartAction) =>{
    if(action.type === 'add-to-cart'){
        const itemExists = state.cart.find(product => product.id === action.payload.item.id)
        let updateCart : CartItem[] = []
        if(itemExists){
            updateCart = state.cart.map(item =>{
                if(item.id === action.payload.item.id){
                    if(item.quantity < MAX_ITEMS){
                        return {...item, quantity: item.quantity + 1}
                    } else{
                        return item
                    }
                } else{
                    return item
                }
            })
        } else{
        //lo casteo para q tenga el tipo de dato
            const newItem : CartItem = {...action.payload.item, quantity: 1}
           updateCart = [...state.cart, newItem]   
        }
        return {
           ...state,
           cart: updateCart
        }
    }
    if(action.type === 'remove-from-cart'){
        const cart = state.cart.filter(item => item.id !== action.payload.id)
        return {
           ...state,
           cart 
        }
    }
    if(action.type === 'increase-quantity'){
        const cart = state.cart.map( item => {
            if(item.id === action.payload.id && item.quantity < MAX_ITEMS){
              return{
                ...item,
                quantity: item.quantity + 1
              }
            }
            return item
          })
        return {
           ...state , cart
        }
    }
    if(action.type === 'decrease-quantity'){
        const cart = state.cart.map( item => {
            if(item.id === action.payload.id && item.quantity > MIN_ITEMS){
              return{
                ...item,
                quantity: item.quantity - 1
              }
            }
            return item
          })
        return {
           ...state, cart
        }
    }
    if(action.type === 'clear-cart'){
        return {...state, cart:[]}
    }
    return state
}

