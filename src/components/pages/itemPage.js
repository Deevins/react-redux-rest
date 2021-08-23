import React from "react";
import {connect} from "react-redux";
import WithRestoService from "../hoc";
import {menuError, menuLoaded, menuRequested} from "../../actions";


import './itemPage.css'
import Error from "../error";
import Background from "../app/food-bg.jpg";

class ItemPage extends React.Component {

	componentDidMount() {
		if (this.props.menuItems.length === 0) {
			this.props.menuRequested()

			const {RestoService} = this.props

			RestoService.getMenuItems()
			  .then(res => this.props.menuLoaded(res))
			  .catch((error) => this.props.menuError());
		}
	}

	render() {
		const {loading, error} = this.props

		if (error) {
			return (
			  <div className="item_page">
				  <Error/>
			  </div>)
		}

		if (loading) {
			return (
			  <div className="item_page">

			  </div>)
		}

		const item = this.props.menuItems.find(el => {
			return +el.id === +this.props.match.params.id
		})

		const {title, price, url, category} = item
		return (

<div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
	<div className='menu__item menu_block'>
		<div className="menu__title">{title}</div>
		<img className="menu__img" src={url} alt={title}/>
		<div className="menu__category">Category: <span>{category}</span></div>
		<div className="menu__price">Price: <span>{price}$</span></div>
		<button className="menu__btn">Add to cart</button>
		<span className={`menu__category_Img ${category}`}/>
	</div>
</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		menuItems: state.menu,
		loading: state.loading,
		error: state.error
	}
}
const mapDispatchToProps = {
	menuLoaded,
	menuRequested,
	menuError
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(ItemPage))