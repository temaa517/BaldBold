<template>
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
            <div class="card card-shadow">
                <div class="card-header bg-white">
                    <h1 class="h4 mb-0">Регистрация</h1>
                </div>
                <div class="card-body">
                    <div class="alert alert-danger" v-if="errorMessageText">{{ errorMessageText }}</div>
                    <form @submit.prevent="submit">
                        <div class="form-group">
                            <label for="register-name">Имя</label>
                            <input id="register-name" type="text" class="form-control" v-model.trim="form.name" required>
                        </div>
                        <div class="form-group">
                            <label for="register-email">Email</label>
                            <input id="register-email" type="email" class="form-control" v-model.trim="form.email" required>
                        </div>
                        <div class="form-group">
                            <label for="register-password">Пароль</label>
                            <input id="register-password" type="password" class="form-control" v-model="form.password" required minlength="8">
                        </div>
                        <div class="form-group">
                            <label for="register-password-confirmation">Подтверждение пароля</label>
                            <input id="register-password-confirmation" type="password" class="form-control"
                                   v-model="form.password_confirmation" required minlength="8">
                        </div>
                        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
                            {{ loading ? 'Регистрация…' : 'Зарегистрироваться' }}
                        </button>
                    </form>
                    <div class="mt-3 small">
                        Уже есть аккаунт? <router-link to="/login">Войти</router-link>
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
    name: 'RegisterView',
    data() {
        return {
            form: { name: '', email: '', password: '', password_confirmation: '' },
            loading: false,
            errorMessageText: '',
        };
    },
    methods: {
        async submit() {
            this.loading = true;
            this.errorMessageText = '';

            try {
                const response = await api.post('/api/v1/register', this.form);
                setCsrfToken(response.csrf_token);
                store.setUser(response.user);
                this.$router.push('/data');
            } catch (error) {
                this.errorMessageText = errorMessage(error, 'Не удалось зарегистрироваться.');
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
