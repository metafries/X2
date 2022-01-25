import { makeAutoObservable } from "mobx";

export default class Common {
    loading = false;
    openPersistentDrawer = false;
    openIdentityInputs = false;
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading = state => {
        this.loading = state;
    }

    setOpenPersistentDrawer = state => {
        this.openPersistentDrawer = state;
    }

    setOpenIdentityInputs = state => {
        this.openIdentityInputs = state;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}