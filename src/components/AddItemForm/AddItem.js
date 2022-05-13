import classes from "./AddItem.module.css";
import FormInput from "../FormInput/FormInput";
import { useReducer, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const reducer = (validate) => (state, action) => {
  switch (action.type) {
    case "INPUT": {
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value),
      };
    }
    case "INPUT_BLUR": {
      return {
        ...state,
        isValid: validate(state.value),
      };
    }
    case "SUBMITTED": {
      return {
        ...state,
        value: "",
        isValid: undefined,
      };
    }
    default:
      break;
  }
  return state;
};

const AddItem = ({ className, onSubmit, data }) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const id = data === undefined ? uuidv4() : data.id;

  const [nameState, nameDispatch] = useReducer(
    reducer((value) => value.trim().length > 0),
    {
      value: data !== undefined ? data.name : "",
      isValid: data !== undefined ? true : undefined,
    }
  );

  const [emailState, emailDispatch] = useReducer(
    reducer((value) => value.includes("@")),
    {
      value: data !== undefined ? data.email : "",
      isValid: data !== undefined ? true : undefined,
    }
  );

  const [ageState, ageDispatch] = useReducer(
    reducer((value) => value > 0),
    {
      value: data !== undefined ? data.age : "",
      isValid: data !== undefined ? true : undefined,
    }
  );

  useEffect(() => {
    const id = setTimeout(() => {
      setFormIsValid(
        nameState.isValid && emailState.isValid && ageState.isValid
      );
    }, 500);
    return () => clearTimeout(id);
  }, [nameState.isValid, emailState.isValid, ageState.isValid, setFormIsValid]);

  const submitHandler = (event) => {
    event.preventDefault();
    onSubmit({
      id: id,
      name: nameState.value,
      email: emailState.value,
      age: ageState.value,
    });
    nameDispatch({ type: "SUBMITTED" });
    emailDispatch({ type: "SUBMITTED" });
    ageDispatch({ type: "SUBMITTED" });
  };

  const nameChangeHandler = (event) => {
    nameDispatch({
      type: "INPUT",
      value: event.target.value,
    });
  };

  const validateNameHandler = () => {
    nameDispatch({ type: "INPUT_BLUR" });
  };

  const emailChangeHandler = (event) => {
    emailDispatch({
      type: "INPUT",
      value: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    emailDispatch({ type: "INPUT_BLUR" });
  };

  const ageChangeHandler = (event) => {
    ageDispatch({
      type: "INPUT",
      value: event.target.value,
    });
  };

  const validateAgeHandler = () => {
    ageDispatch({ type: "INPUT_BLUR" });
  };

  return (
    <form
      className={`${className} ${classes.container}`}
      onSubmit={submitHandler}
    >
      <FormInput
        id="name"
        label="Felhasználónév"
        type="text"
        valid={nameState.isValid}
        value={nameState.value}
        changeHandler={nameChangeHandler}
        blurHandler={validateNameHandler}
      />
      <FormInput
        id="email"
        label="E-mail"
        type="email"
        valid={emailState.isValid}
        value={emailState.value}
        changeHandler={emailChangeHandler}
        blurHandler={validateEmailHandler}
      />
      <FormInput
        id="age"
        label="Kor"
        type="number"
        valid={ageState.isValid}
        value={ageState.value}
        changeHandler={ageChangeHandler}
        blurHandler={validateAgeHandler}
      />
      <button type="submit" disabled={!formIsValid}>
        Küldés
      </button>
    </form>
  );
};

export default AddItem;
