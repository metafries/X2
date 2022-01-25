import { makeAutoObservable } from "mobx";

export default class App {
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}