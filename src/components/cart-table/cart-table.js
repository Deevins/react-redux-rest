import React from 'react';
import './cart-table.scss';
import {connect} from "react-redux";
import {addedToCart, deleteFromCart} from "../../actions";
import WithRestoService from "../hoc";

const CartTable = ({items, deleteFromCart, addedToCart, RestoService}) => {
	if (items.length === 0) {
		return (<div className="cart__title"> Ваша корзина пуста </div>)
	}
	return (
	  <>
		  <div className="cart__title">Ваш заказ:</div>
		  <div className="cart__list">
			  {
				  items.map(item => {
					  const {title, url, price, id, qtty} = item
					  return (
						<>
							<div key={id} className="cart__item">
								<img src={url} className="cart__item-img" alt={title}/>
								<div className="cart__item-title">{title}</div>
								<div className="cart__item-price">{price}$</div>
								<button onClick={() => deleteFromCart(id, 'minus')} className="cart__item-minus">-
								</button>
								<div className="cart__item-price">X{qtty}</div>
								<button onClick={() => addedToCart(item.id)} className="cart__item-plus">+</button>
								<div onClick={() => deleteFromCart(id)} className="cart__close">&times;</div>
							</div>
						</>
					  )
				  })
			  }
			  <button className='cart__order-button'
					  onClick={() => RestoService.setOrder(generateOrder(items))}>
				  Make order
			  </button>
		  </div>
	  </>
	);
}

const generateOrder = (items) => {
	return items.map(item => {
		return {
			id: item.id,
			qtty: item.qtty
		}
	})
}


const mapStateToProps = ({items, event}) => {
	return {
		items,
		event
	}
}

const mapDispatchToProps = {
	addedToCart,
	deleteFromCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));