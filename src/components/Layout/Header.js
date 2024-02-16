import React, { Fragment } from 'react'

import mealimage from '../../assets/meals.jpg';
import classes from './Header.module.css';

import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <Fragment>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onPick={props.onShowCart}/>
        </header>
        {/* css class with - notation so cant use . here */}
        <div className={classes['main-image']}> 
            <img src={mealimage} alt="food table" />
        </div>
    </Fragment>
    
  )
}

export default Header