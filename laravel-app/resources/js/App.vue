<template>
    <div id="app-shell">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <router-link class="navbar-brand" to="/">Excel Data Hub</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNav"
                        aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="mainNav">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Загрузка</router-link>
                        </li>
                        <li class="nav-item" v-if="store.isAuthenticated">
                            <router-link class="nav-link" to="/data">Данные</router-link>
                        </li>
                        <li class="nav-item" v-if="store.isAuthenticated">
                            <router-link class="nav-link" to="/logs">История</router-link>
                        </li>
                        <li class="nav-item" v-if="store.user && store.user.is_admin">
                            <a class="nav-link" href="/admin">Админка</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto">
                        <template v-if="store.isAuthenticated">
                            <li class="nav-item navbar-text mr-3 text-white-50 small">
                                {{ store.user.name }}
                            </li>
                            <li class="nav-item">
                                <button type="button" class="btn btn-outline-light btn-sm" @click="logout">Выйти</button>
                            </li>
                        </template>
                        <template v-else>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/login">Вход</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/register">Регистрация</router-link>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </nav>

        <main class="container py-4">
            <router-view />
        </main>

        <footer class="container text-muted small py-4 border-top">
            Excel Data Hub · Laravel + Vue.js · Bootstrap 4
        </footer>
    </div>
</template>

<script>
import api, { setCsrfToken } from './api';
import store from './store';

export default {
    name: 'App',
    data() {
        return { store };
    },
    methods: {
        async logout() {
            try {
                const response = await api.post('/api/v1/logout');
                setCsrfToken(response.csrf_token);
            } catch (error) {
                window.location.href = '/login';
                return;
            }
            store.setUser(null);
            this.$router.push('/login');
        },
    },
};
</script>
