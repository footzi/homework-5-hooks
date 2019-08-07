import React, { useReducer } from "react";

/*
    Напишите компонент с двуми инпутами и кнопкой

    Если инпуты заполнены - при нажатии на кнопку показывается сообщение об успехе

    У сообщения об успехе должно быть поле data-testid='success'
    Сообжение должно содержать текст "Вы вошли"

    Email инпут должен иметь поле data-testid='input-email'
    Password инпут должен иметь поле data-testid='input-password'
    Кнопка логина должна иметь поле data-testid='submit'

    ##  Дополнительное задание:

    У вас получится несколько useState.
    В качестве дополнительной тренировки попробуйте использовать useReducer
    вместо нескольких useState

    Прочитайте документацию:
    https://reactjs.org/docs/hooks-reference.html#usereducer
*/

export const Form = () => {
  const initialState = {
    fields: {
      email: "",
      password: ""
    },
    isValid: false
  };

  const reducer = (state, action) => {
    switch (action.name) {
      case "email":
        return {
          ...state,
          fields: { email: action.value, password: state.fields.password }
        };
      case "password":
        return {
          ...state,
          fields: { email: state.fields.email, password: action.value }
        };
      case "validation":
        return {
          ...state,
          isValid: action.value
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch({ name, value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { email, password } = state.fields;

    if (email && password) {
      dispatch({ name: "validation", value: true });
    } else {
      dispatch({ name: "validation", value: false });
    }
  };

  return (
    <form>
      <input
        type="email"
        name="email"
        data-testid="email-input"
        value={state.fields.email}
        onChange={onChange}
      />
      <input
        type="password"
        name="password"
        data-testid="password-input"
        value={state.fields.password}
        onChange={onChange}
      />
      <button type="submit" data-testid="submit" onClick={onSubmit} />
      {state.isValid && <div data-testid="success-message">Вы вошли</div>}
    </form>
  );
};
