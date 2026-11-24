<template>
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
            <div class="card card-shadow">
                <div class="card-header bg-white">
                    <h1 class="h4 mb-0">Восстановление пароля</h1>
                </div>
                <div class="card-body">
                    <div class="alert alert-success" v-if="successMessage">{{ successMessage }}</div>
                    <div class="alert alert-danger" v-if="errorMessageText">{{ errorMessageText }}</div>
                    <form @submit.prevent="submit">
                        <p class="text-muted small">
                            Введите email — мы отправим ссылку для сброса пароля.
                        </p>
                        <div class="form-group">
                            <label for="forgot-email">Email</label>
                            <input id="forgot-email" type="email" class="form-control" v-model.trim="form.email" required>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
                            {{ loading ? 'Отправка…' : 'Отправить ссылку' }}
                        </button>
                    </form>
                    <div class="mt-3 small">
                        <router-link to="/login">Вернуться ко входу</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api, { errorMessage } from '../../api';

export default {
    name: 'ForgotView',
    data() {
        return {
            form: { email: '' },
            loading: false,
            successMessage: '',
            errorMessageText: '',
        };
    },
    methods: {
        async submit() {
            this.loading = true;
            this.successMessage = '';
            this.errorMessageText = '';

            try {
                const response = await api.post('/api/v1/password/forgot', this.form);
                this.successMessage = response.message;
            } catch (error) {
                this.errorMessageText = errorMessage(error, 'Не удалось отправить ссылку.');
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
