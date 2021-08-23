 import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from "react-redux";
import WithRestoService from "../hoc";
import {menuError, menuLoaded, menuRequested, addedToCart} from "../../actions";
import Spinner from "../spinner";

 import './menu-list.scss';
 import Error from "../error";

class MenuList extends Component {
    componentDidMount() {
        this.props.menuRequested()

        const {RestoService} = this.props
        RestoService.getMenuItems()
          .then(res => this.props.menuLoaded(res) )
          .catch(error => this.props.menuError(error) )
    }

    render() {
    const {menuItems, loading, error, addedToCart} = this.props

        if(error){return <Error/>}
        if(loading){return <Spinner/>}

        const items = menuItems.map(item => {
            return <MenuListItem
              key ={item.id}
              menuItem={item}
              onAddToCart={ () => addedToCart(item.id) }/>
        })

        return ( <View items={items}/> )
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
    menuLoaded: menuLoaded,
    menuRequested,
    addedToCart,
    menuError
}
 const View = ({items}) => {
     return (
       <ul className='menu__list'>
           {items}
       </ul>
     )
 }

export default WithRestoService()( connect( mapStateToProps, mapDispatchToProps )(MenuList) );


//TODO : Обработать ошибки, которые могут возникнуть при работе с сервером при помощи нового action (DONE)
//TODO : При формировании карточек, в зависимости от категории блюда, добавлять новую характерную иконку на ваш выбор (салаты, мясо, пицца...) Выглядеть и располагаться может как и где угодно
//TODO : Разделить компонент MenuList на 2 части: работа с логикой и банальный рендеринг
//TODO : Для каждого отдельного товара создать отдельную страницу и правильную маршрутизацию
 // TODO : (как мы делали в предыдущем приложении. Если здесь вы добавите кнопку “Добавить в корзину” - то в следующем уроке её тоже нужно будет реализовать)
