<template>
    <div>
        <h1 class="page-title">История действий</h1>

        <div class="card card-shadow">
            <div class="card-header bg-white d-flex align-items-center flex-wrap">
                <div class="form-row align-items-center">
                    <div class="form-group mb-2 mr-2">
                        <select class="form-control form-control-sm" v-model="filters.action" @change="loadLogs(1)">
                            <option value="">Все действия</option>
                            <option v-for="action in actions" :key="action" :value="action">{{ action }}</option>
                        </select>
                    </div>
                    <div class="form-group mb-2 mr-2">
                        <input type="date" class="form-control form-control-sm" v-model="filters.date_from" @change="loadLogs(1)">
                    </div>
                    <div class="form-group mb-2">
                        <input type="date" class="form-control form-control-sm" v-model="filters.date_to" @change="loadLogs(1)">
                    </div>
                </div>
                <span class="text-muted small ml-auto">Всего событий: {{ meta.total }}</span>
            </div>

            <div class="card-body">
                <div class="alert alert-danger" v-if="errorMessageText">{{ errorMessageText }}</div>

                <div class="text-muted py-4 text-center" v-if="loading && !logs.length">Загрузка…</div>
                <p class="text-muted mb-0 py-3" v-else-if="!logs.length">Событий пока нет.</p>

                <div class="table-responsive" v-else>
                    <table class="table table-hover table-sm mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Дата</th>
                                <th>Пользователь</th>
                                <th>Действие</th>
                                <th>Объект</th>
                                <th>Описание</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="log in logs"
                                :key="log.id"
                                class="clickable-row"
                                :class="{ 'table-primary': selected && selected.id === log.id }"
                                @click="selectLog(log)">
                                <td>{{ log.id }}</td>
                                <td>{{ formatDate(log.created_at) }}</td>
                                <td>{{ log.user_name || 'Гость' }}</td>
                                <td><span class="badge badge-secondary badge-action">{{ log.action }}</span></td>
                                <td>{{ log.subject }} #{{ log.subject_id }}</td>
                                <td>{{ log.description || '—' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <nav class="d-flex justify-content-center mt-4" v-if="meta.last_page > 1">
                    <ul class="pagination mb-0">
                        <li class="page-item" :class="{ disabled: meta.current_page <= 1 }">
                            <button class="page-link" type="button" @click="loadLogs(meta.current_page - 1)">←</button>
                        </li>
                        <li class="page-item active">
                            <span class="page-link">{{ meta.current_page }} / {{ meta.last_page }}</span>
                        </li>
                        <li class="page-item" :class="{ disabled: meta.current_page >= meta.last_page }">
                            <button class="page-link" type="button" @click="loadLogs(meta.current_page + 1)">→</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="card card-shadow mt-4" v-if="selected">
            <div class="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Сравнение состояния объекта #{{ selected.subject_id }}</h5>
                <button type="button" class="close" aria-label="Close" @click="selected = null">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="card-body">
                <p class="text-muted small">
                    Ниже показаны различия: удалённые значения выделены красным, добавленные — зелёным.
                </p>
                <div class="log-compare" v-if="hasChanges">
                    <vue-json-compare :oldData="oldData" :newData="newData" />
                </div>
                <p class="text-muted mb-0" v-else>Для этого события нет двух версий объекта.</p>
            </div>
        </div>
    </div>
</template>

<script>
import api, { errorMessage } from '../api';
import vueJsonCompare from 'vue-json-compare';

export default {
    name: 'LogsView',
    components: { vueJsonCompare },
    data() {
        return {
            logs: [],
            meta: { current_page: 1, last_page: 1, total: 0 },
            filters: { action: '', date_from: '', date_to: '' },
            actions: ['upload', 'create', 'update', 'delete'],
            selected: null,
            loading: false,
            errorMessageText: '',
        };
    },
    computed: {
        oldData() {
            return this.selected?.before || {};
        },
        newData() {
            return this.selected?.after || {};
        },
        hasChanges() {
            return Boolean(this.selected && (this.selected.before || this.selected.after));
        },
    },
    mounted() {
        this.loadLogs(1);
    },
    methods: {
        async loadLogs(page) {
            this.loading = true;
            this.errorMessageText = '';

            try {
                const response = await api.get('/api/v1/logs', {
                    params: {
                        page,
                        per_page: 20,
                        action: this.filters.action,
                        date_from: this.filters.date_from,
                        date_to: this.filters.date_to,
                    },
                });

                this.logs = response.data;
                this.meta = {
                    current_page: response.current_page,
                    last_page: response.last_page,
                    total: response.total,
                };
            } catch (error) {
                this.errorMessageText = errorMessage(error, 'Не удалось загрузить историю.');
            } finally {
                this.loading = false;
            }
        },
        selectLog(log) {
            this.selected = this.selected && this.selected.id === log.id ? null : log;
        },
        formatDate(value) {
            if (!value) return '—';
            return new Date(value.replace(' ', 'T')).toLocaleString('ru-RU');
        },
    },
};
</script>
