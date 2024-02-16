import {useRef, useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isSixChars = value => value.trim().length === 6;

const Checkout = (props) => {

  const[formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    pin: true,
    city: true,
    locality: true,
  });

  const nameInputRef = useRef();
  const localityInputRef = useRef();
  const pinInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredLocality = localityInputRef.current.value;
    const enteredPin = pinInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredLocalityIsValid = !isEmpty(enteredLocality);
    const enteredPinIsValid = isSixChars(enteredPin);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
        name: enteredNameIsValid,
        city: enteredCityIsValid,
        locality: enteredLocalityIsValid,
        pin: enteredPinIsValid,

    })

    const formIsValid = 
        enteredNameIsValid && 
        enteredCityIsValid &&
        enteredLocalityIsValid &&
        enteredPinIsValid;

    if(!formIsValid){
        return;
    }

    props.onConfirm({
        name: enteredName,
        locality: enteredLocality,
        pin: enteredPin,
        city: enteredCity,
    });

  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid} `;

  const localityControlClasses = `${classes.control} ${
    formInputsValidity.locality ? '' : classes.invalid} `;
    
  const pinControlClasses = `${classes.control} ${
    formInputsValidity.pin ? '' : classes.invalid} `;

  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? '' : classes.invalid} `;
    
        
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}
        >
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={localityControlClasses}>
        <label htmlFor='locality'>Locality</label>
        <input type='text' id='locality' ref={localityInputRef}/>
        {!formInputsValidity.locality && <p>Please enter a valid locality!</p>}
      </div>
      <div className={pinControlClasses}>
        <label htmlFor='pin'>Pin Code</label>
        <input type='text' id='pin' ref={pinInputRef}/>
        {!formInputsValidity.pin && <p>Please enter a valid pincode!(6 characters)</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;