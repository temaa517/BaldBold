import Vue from 'vue';
import VueRouter from 'vue-router';
import api from './api';
import store from './store';
import HomeView from './views/HomeView.vue';
import DataView from './views/DataView.vue';
import LogsView from './views/LogsView.vue';
import LoginView from './views/auth/LoginView.vue';
import RegisterView from './views/auth/RegisterView.vue';
import ForgotView from './views/auth/ForgotView.vue';
import ResetView from './views/auth/ResetView.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: HomeView, meta: { title: 'Загрузка Excel' } },
    { path: '/data', component: DataView, meta: { title: 'Данные', requiresAuth: true } },
    { path: '/logs', component: LogsView, meta: { title: 'История действий', requiresAuth: true } },
    { path: '/login', component: LoginView, meta: { title: 'Вход', guestOnly: true } },
    { path: '/register', component: RegisterView, meta: { title: 'Регистрация', guestOnly: true } },
    { path: '/password/forgot', component: ForgotView, meta: { title: 'Восстановление пароля', guestOnly: true } },
    { path: '/password/reset', component: ResetView, meta: { title: 'Новый пароль', guestOnly: true } },
];

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
});

router.beforeEach(async (to, from, next) => {
    if (!store.ready) {
        try {
            const response = await api.get('/api/v1/me');
            store.setUser(response.user);
        } catch (error) {
            store.setUser(null);
        }
    }

    if (to.meta.requiresAuth && !store.isAuthenticated) {
        return next({ path: '/login', query: { redirect: to.fullPath } });
    }

    if (to.meta.guestOnly && store.isAuthenticated) {
        return next('/data');
    }

    document.title = `${to.meta.title || ''} — Excel Data Hub`;
    next();
});

export default router;
