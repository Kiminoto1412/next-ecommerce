import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();
//   darkMode: false,

//   เอาค่าจากcookie มาเช็ค
const initialState = {
  darkMode: Cookies.get('darkMode') === "ON" ? true : false
};
console.log(Cookies.get("darkMode"))


function reducer(state, action) {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  // dispatch all case
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  //   all props.children will have value={value} that we pass
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
