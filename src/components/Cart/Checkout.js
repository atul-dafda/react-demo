import classes from "./Checkout.module.css";
import useInputValidation from "../UI/inputValidation";

const Checkout = (props) => {
  const {
    value: enteredName,
    isTouched: nameIsTouched,
    hasError: nameHasError,
    inputIsValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: onNameBlurHandler,
    reset: namereset,
  } = useInputValidation((value) => value.trim() !== "");
  const {
    value: enteredStreet,
    isTouched: streetIsTouched,
    hasError: streetHasError,
    inputIsValid: streetIsValid,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: onStreetBlurHandler,
    reset: streetreset,
  } = useInputValidation((value) => value.trim() !== "");
  const {
    value: enteredPostal,
    isTouched: postalIsTouched,
    hasError: postalHasError,
    inputIsValid: postalIsValid,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: onPostalBlurHandler,
    reset: postalreset,
  } = useInputValidation(
    (value) => value.trim() !== "" && value.trim().length === 5
  );
  const {
    value: enteredCity,
    isTouched: cityIsTouched,
    hasError: cityHasError,
    inputIsValid: cityIsValid,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: onCityBlurHandler,
    reset: cityreset,
  } = useInputValidation((value) => value.trim() !== "");

  const confirmHandler = (event) => {
    event.preventDefault();
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
    console.log(enteredName, enteredStreet, enteredPostal, enteredCity);
    namereset();
    streetreset();
    postalreset();
    cityreset();

    nameIsTouched(false);
    streetIsTouched(false);
    postalIsTouched(false);
    cityIsTouched(false);
  };

  let formIsValid = false;
  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
    formIsValid = true;
  }

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          nameHasError === true ? classes.invalid : ""
        }`}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={onNameBlurHandler}
          value={enteredName}
        />
        {nameHasError && <p className={classes.errorText}>Name is Required.</p>}
      </div>
      <div
        className={`${classes.control} ${
          streetHasError === true ? classes.invalid : ""
        }`}
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangeHandler}
          onBlur={onStreetBlurHandler}
          value={enteredStreet}
        />
        {streetHasError && (
          <p className={classes.errorText}>Street is Required.</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          postalHasError === true ? classes.invalid : ""
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalChangeHandler}
          onBlur={onPostalBlurHandler}
          value={enteredPostal}
        />
        {postalHasError && (
          <p className={classes.errorText}>5 digit Postal Code is Required.</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          cityHasError === true ? classes.invalid : ""
        }`}
      >
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={onCityBlurHandler}
          value={enteredCity}
        />
        {cityHasError && <p className={classes.errorText}>City is Required.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
