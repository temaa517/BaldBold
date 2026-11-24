<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog" v-if="show" @click.self="$emit('close')">
        <div class="modal-backdrop show"></div>
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content card-shadow">
                <form @submit.prevent="save">
                    <div class="modal-header bg-white">
                        <h5 class="modal-title">{{ isEdit ? 'Редактирование записи' : 'Добавление записи' }}</h5>
                        <button type="button" class="close" aria-label="Close" @click="$emit('close')">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger" v-if="errorMessageText">{{ errorMessageText }}</div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="record-name">Имя <span class="text-danger">*</span></label>
                                <input id="record-name" type="text" class="form-control"
                                       :class="{ 'is-invalid': errors.name }" v-model.trim="form.name">
                                <div class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</div>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="record-email">Email <span class="text-danger">*</span></label>
                                <input id="record-email" type="email" class="form-control"
                                       :class="{ 'is-invalid': errors.email }" v-model.trim="form.email">
                                <div class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="record-phone">Телефон</label>
                                <input id="record-phone" type="text" class="form-control" v-model.trim="form.phone">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="record-amount">Сумма</label>
                                <input id="record-amount" type="number" step="0.01" class="form-control"
                                       :class="{ 'is-invalid': errors.amount }" v-model="form.amount">
                                <div class="invalid-feedback" v-if="errors.amount">{{ errors.amount[0] }}</div>
                            </div>
                        </div>
                        <div class="form-group mb-0">
                            <label for="record-description">Описание</label>
                            <textarea id="record-description" class="form-control" rows="3"
                                      v-model.trim="form.description"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer bg-white">
                        <button type="button" class="btn btn-light" @click="$emit('close')">Отмена</button>
                        <button type="submit" class="btn btn-primary" :disabled="saving">
                            {{ saving ? 'Сохранение…' : (isEdit ? 'Обновить' : 'Добавить') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import api, { errorMessage } from '../api';

const EMPTY_FORM = {
    name: '',
    email: '',
    phone: '',
    amount: '',
    description: '',
};

export default {
    name: 'RecordModal',
    props: {
        show: { type: Boolean, default: false },
        record: { type: Object, default: null },
    },
    data() {
        return {
            form: { ...EMPTY_FORM },
            errors: {},
            errorMessageText: '',
            saving: false,
        };
    },
    computed: {
        isEdit() {
            return Boolean(this.record && this.record.id);
        },
    },
    watch: {
        show(value) {
            if (value) {
                this.fillForm();
            }
        },
        record() {
            this.fillForm();
        },
    },
    methods: {
        fillForm() {
            this.form = this.isEdit
                ? {
                    name: this.record.name || '',
                    email: this.record.email || '',
                    phone: this.record.phone || '',
                    amount: this.record.amount ?? '',
                    description: this.record.description || '',
                }
                : { ...EMPTY_FORM };
            this.errors = {};
            this.errorMessageText = '';
        },
        async save() {
            this.saving = true;
            this.errors = {};
            this.errorMessageText = '';

            try {
                const url = this.isEdit ? `/api/v1/records/${this.record.id}` : '/api/v1/records';
                const response = this.isEdit
                    ? await api.put(url, this.form)
                    : await api.post(url, this.form);

                this.$emit('saved', response.record);
                this.$emit('close');
            } catch (error) {
                const data = error?.response?.data;
                if (data?.errors) {
                    this.errors = data.errors;
                }
                this.errorMessageText = errorMessage(error, 'Не удалось сохранить запись.');
            } finally {
                this.saving = false;
            }
        },
    },
};
</script>
