<template>
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
            <div class="card card-shadow">
                <div class="card-header bg-white">
                    <h1 class="h4 mb-0">Новый пароль</h1>
                </div>
                <div class="card-body">
                    <div class="alert alert-danger" v-if="errorMessageText">{{ errorMessageText }}</div>
                    <form @submit.prevent="submit" v-if="form.token && form.email">
                        <div class="form-group">
                            <label for="reset-password">Новый пароль</label>
                            <input id="reset-password" type="password" class="form-control"
                                   v-model="form.password" required minlength="8">
                        </div>
                        <div class="form-group">
                            <label for="reset-password-confirmation">Подтверждение пароля</label>
                            <input id="reset-password-confirmation" type="password" class="form-control"
                                   v-model="form.password_confirmation" required minlength="8">
                        </div>
                        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
                            {{ loading ? 'Сохранение…' : 'Сохранить пароль' }}
                        </button>
                    </form>
                    <div class="alert alert-warning mb-0" v-else>
                        Ссылка для сброса пароля неполная. Запросите новую ссылку на странице восстановления.
                    </div>
                    <div class="mt-3 small">
                        <router-link to="/password/forgot">Запросить новую ссылку</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api, { errorMessage } from '../../api';

export default {
    name: 'ResetView',
    data() {
        return {
            form: {
                token: this.$route.query.token || '',
                email: this.$route.query.email || '',
                password: '',
                password_confirmation: '',
            },
            loading: false,
            errorMessageText: '',
        };
    },
    methods: {
        async submit() {
            this.loading = true;
            this.errorMessageText = '';

            try {
                const response = await api.post('/api/v1/password/reset', this.form);
                this.$router.push({ path: '/login', query: { reset: response.message } });
            } catch (error) {
                this.errorMessageText = errorMessage(error, 'Не удалось сбросить пароль.');
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
