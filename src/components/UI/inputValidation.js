import { useReducer } from "react";

const defaultState = {
  value: "",
  isToched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
  return inputStateReducer;
};

const useInputValidation = (validValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, defaultState);

  const inputIsValid = validValue(inputState.value);
  const hasError = !inputIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    //setEnteredInput(event.target.value);
    dispatch({ type: "INPUT", value: event.target.value });
  };
  const inputBlurHandler = (event) => {
    //setInputIsTouched(true);
    dispatch({ type: "BLUR" });
  };
  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isTouched: inputState.isTouched,
    inputIsValid,
    hasError,
    reset,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useInputValidation;
