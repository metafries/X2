import { makeAutoObservable, runInAction } from "mobx";
import { ACCESS_TOKEN } from "../../constants";
import * as agent from "../api/agent";
import { stores } from "./config";

export default class Account {
    user = null;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async creds => {
        try {
            const user = await agent.login(creds);
            runInAction(() => this.user = JSON.stringify(user.data));   
            window.localStorage.setItem('logged-in', this.user);
            stores.commonStore.setOpenIdentityInputs(false);
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        this.user = null;
    }

    getUser = async () => {
        try {
            const user = await agent.getCurrentUser();
            runInAction(() => this.user = user);
            console.log('AGENT GET USER', user);
        } catch (error) {
            console.log(error);
        }
    }

    register = async creds => {
        try {
            const user = await agent.signup(creds);
            this.login(JSON.parse(user.config.data));
        } catch (error) {
            throw error;
        }
    }
}