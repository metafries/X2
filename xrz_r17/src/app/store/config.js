import { createContext, useContext } from "react";
import App from "./app"
import Account from "./account";
import Common from "./common";

export const stores = {
    appStore: new App(),
    accountStore: new Account(),
    commonStore: new Common(),
}

export const DataContext = createContext(stores);

export const useStore = () => useContext(DataContext);