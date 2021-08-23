import React from "react";
import {deleteFromCart} from "../../actions";


const CartTableItem = ({items}) => {
	const {title,url,price,id} = items
	return(
	  <div key ={id} className="cart__item">
		  <img src={url} className="cart__item-img" alt={title}></img>
		  <div className="cart__item-title">{title}</div>
		  <div className="cart__item-price">{price}$</div>
		  <div onClick={()=> deleteFromCart(id)} className="cart__close">&times;</div>
	  </div>
	)
}

export default CartTableItem