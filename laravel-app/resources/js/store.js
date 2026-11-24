import Vue from 'vue';

export default Vue.observable({
    user: null,
    ready: false,

    setUser(user) {
        this.user = user || null;
        this.ready = true;
    },

    get isAuthenticated() {
        return Boolean(this.user);
    },
});
