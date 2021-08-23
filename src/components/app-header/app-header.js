import React from 'react';
import cartIcon from './shopping-cart-solid.svg';
import './app-header.scss';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const AppHeader = ({totalPrice}) => {
	return (
	  <header className="header">
		  <Link to={'/menu'} className="header__link">Menu</Link>
		  <Link to={'/cart'} className='header__link'>
			  <img className="header__cart" src={cartIcon} alt="cart"/>
			  Total: {totalPrice} $
		  </Link>
	  </header>
	)
}

const mapStateToProps = ({totalPrice}) => {
	return {
		totalPrice
	}
}

export default connect(mapStateToProps)(AppHeader);