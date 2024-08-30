import { useEffect, useReducer } from "react"
import Product  from "./Product"
import Header from "./Header"
import { cartReducer, initialState } from "../reducers/cart-reducer"
import { Product as ProductType} from "../types"

export default function Body  () {
  


const [state, dispatch] = useReducer(cartReducer, initialState);
useEffect(()=>{
  localStorage.setItem('cart', JSON.stringify(state.cart))
}, [state.cart])

  return (
    <>
      <Header 
        cart = {state.cart}
        dispatch = {dispatch}
      />
      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
              {state.data.map((product: ProductType) =>(
                <Product
                  key={product.id}
                  product = {product}
                  dispatch = {dispatch}
                />
              ))}
              
              
          </div>
      </main>
    </>
  )
}

