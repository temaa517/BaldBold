<template>
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
            <div class="card card-shadow">
                <div class="card-header bg-white">
                    <h1 class="h4 mb-0">Вход</h1>
                </div>
                <div class="card-body">
                    <div class="alert alert-danger" v-if="errorMessageText">{{ errorMessageText }}</div>
                    <form @submit.prevent="submit">
                        <div class="form-group">
                            <label for="login-email">Email</label>
                            <input id="login-email" type="email" class="form-control" v-model.trim="form.email" required>
                        </div>
                        <div class="form-group">
                            <label for="login-password">Пароль</label>
                            <input id="login-password" type="password" class="form-control" v-model="form.password" required>
                        </div>
                        <div class="form-group form-check">
                            <input id="login-remember" type="checkbox" class="form-check-input" v-model="form.remember">
                            <label class="form-check-label" for="login-remember">Запомнить меня</label>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
                            {{ loading ? 'Вход…' : 'Войти' }}
                        </button>
                    </form>
                    <div class="d-flex justify-content-between mt-3 small">
                        <router-link to="/register">Регистрация</router-link>
                        <router-link to="/password/forgot">Забыли пароль?</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api, { errorMessage, setCsrfToken } from '../../api';
import store from '../../store';

export default {
    name: 'LoginView',
    data() {
        return {
            form: { email: '', password: '', remember: false },
            loading: false,
            errorMessageText: '',
        };
    },
    methods: {
        async submit() {
            this.loading = true;
            this.errorMessageText = '';

            try {
                const response = await api.post('/api/v1/login', this.form);
                setCsrfToken(response.csrf_token);
                store.setUser(response.user);
                this.$router.push(this.$route.query.redirect || '/data');
            } catch (error) {
                this.errorMessageText = errorMessage(error, 'Не удалось войти.');
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
