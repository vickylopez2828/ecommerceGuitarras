import { Dispatch } from 'react'
import { CartAction } from '../reducers/cart-reducer'
import type { Product } from '../types'

type ProductProps = {
  product: Product,
  dispatch: Dispatch<CartAction>
}


export default function Product ({product, dispatch} : ProductProps) {
  const {name, image, description, price} = product
  
 // console.log(data[0]);
  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
        <div className="col-4">
            <img className="img-fluid" src = {`./img/${image}.jpg`} alt="imagen producto" />
        </div>
        <div className="col-8">
            <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
            <p>{description}</p>
            <p className="fw-black text-primary fs-3">${price}</p>
            <button 
                type="button"
                className="btn btn-dark w-100"
                onClick={() => dispatch({type: 'add-to-cart', payload: {item: product}})}
            >Agregar al Carrito</button>
        </div>
    </div>
  )
}




