import React from 'react';
import {MainPage, CartPage} from '../pages';
import AppHeader from '../app-header';
import { Switch, Route, Redirect } from 'react-router-dom'

import Background from './food-bg.jpg';
import ItemPage from "../pages/itemPage";

const App = () => {
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}}>
            <AppHeader total={50}/>
            <Switch>
                <Route path='/' exact>
                    <Redirect to={'/menu'}/>
                </Route>
                <Route path='/menu' component={MainPage} exact/>
                <Route path='/cart' component={CartPage} />
                <Route path='/menu/:id' component={ItemPage}/>
            </Switch>
        </div>
    )
}

export default App;