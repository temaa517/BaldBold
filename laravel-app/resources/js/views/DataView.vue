<template>
    <div>
        <div class="d-flex justify-content-between align-items-center flex-wrap mb-4">
            <h1 class="page-title mb-2">Данные</h1>
            <button type="button" class="btn btn-primary mb-2" @click="openCreate">Добавить запись</button>
        </div>

        <div class="card card-shadow">
            <div class="card-header bg-white d-flex align-items-center flex-wrap">
                <div class="input-group" style="max-width: 340px;">
                    <input type="search" class="form-control" placeholder="Поиск по имени, email, телефону"
                           v-model.trim="search" @keyup.enter="applySearch">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="applySearch">Найти</button>
                    </div>
                </div>
                <span class="text-muted small ml-auto mt-2 mt-sm-0">
                    Всего записей: {{ meta.total }}
                </span>
            </div>

            <div class="card-body">
                <div class="alert alert-danger" v-if="errorMessageText">{{ errorMessageText }}</div>

                <div class="text-muted py-4 text-center" v-if="loading && !records.length">Загрузка…</div>
                <p class="text-muted mb-0 py-3" v-else-if="!records.length">Записей пока нет.</p>

                <div class="table-responsive" v-else>
                    <table class="table table-hover table-striped mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Имя</th>
                                <th>Email</th>
                                <th>Телефон</th>
                                <th>Сумма</th>
                                <th>Описание</th>
                                <th>Источник</th>
                                <th>Создана</th>
                                <th class="text-right">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="record in records" :key="record.id">
                                <td>{{ record.id }}</td>
                                <td class="font-weight-semibold">{{ record.name }}</td>
                                <td>{{ record.email }}</td>
                                <td>{{ record.phone || '—' }}</td>
                                <td>{{ formatAmount(record.amount) }}</td>
                                <td>{{ record.description || '—' }}</td>
                                <td>{{ record.uploaded_file ? record.uploaded_file.original_name : 'Вручную' }}</td>
                                <td>{{ formatDate(record.created_at) }}</td>
                                <td class="text-right text-nowrap">
                                    <button type="button" class="btn btn-sm btn-outline-primary mr-1"
                                            @click="openEdit(record)">Изменить</button>
                                    <button type="button" class="btn btn-sm btn-outline-danger"
                                            @click="askDelete(record)">Удалить</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="d-flex justify-content-center mt-4" v-if="showPagination">
                    <nav aria-label="Пагинация">
                        <ul class="pagination mb-0">
                            <li class="page-item" :class="{ disabled: meta.current_page <= 1 }">
                                <button class="page-link" type="button" @click="goToPage(meta.current_page - 1)">←</button>
                            </li>
                            <li class="page-item"
                                v-for="page in pageNumbers"
                                :key="page"
                                :class="{ active: page === meta.current_page }">
                                <button class="page-link" type="button" @click="goToPage(page)">{{ page }}</button>
                            </li>
                            <li class="page-item" :class="{ disabled: meta.current_page >= meta.last_page }">
                                <button class="page-link" type="button" @click="goToPage(meta.current_page + 1)">→</button>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div class="text-center mt-3" v-if="meta.current_page < meta.last_page">
                    <button type="button" class="btn btn-outline-primary" :disabled="loading" @click="loadMore">
                        {{ loading ? 'Загрузка…' : 'Загрузить ещё' }}
                    </button>
                </div>
            </div>
        </div>

        <RecordModal :show="modalShow"
                     :record="editingRecord"
                     @close="modalShow = false"
                     @saved="onSaved" />

        <ConfirmModal :show="deleteShow"
                      title="Удаление записи"
                      :message="`Удалить запись «${deleteTarget ? deleteTarget.name : ''}»?`"
                      @cancel="deleteShow = false"
                      @confirm="performDelete" />
    </div>
</template>

<script>
import api, { errorMessage } from '../api';
import RecordModal from '../components/RecordModal.vue';
import ConfirmModal from '../components/ConfirmModal.vue';

export default {
    name: 'DataView',
    components: { RecordModal, ConfirmModal },
    data() {
        return {
            records: [],
            meta: { current_page: 1, last_page: 1, total: 0, per_page: 10 },
            page: 1,
            perPage: 10,
            search: '',
            loading: false,
            errorMessageText: '',
            modalShow: false,
            editingRecord: null,
            deleteShow: false,
            deleteTarget: null,
        };
    },
    computed: {
        showPagination() {
            return this.meta.total > 10 && this.meta.last_page > 1;
        },
        pageNumbers() {
            const pages = [];
            for (let page = 1; page <= this.meta.last_page; page += 1) {
                pages.push(page);
            }
            return pages;
        },
    },
    mounted() {
        this.loadRecords(1, false);
    },
    methods: {
        async loadRecords(page = 1, append = false) {
            this.loading = true;
            this.errorMessageText = '';

            try {
                const response = await api.get('/api/v1/records', {
                    params: { page, per_page: this.perPage, search: this.search },
                });

                this.records = append ? [...this.records, ...response.data] : response.data;
                this.meta = {
                    current_page: response.current_page,
                    last_page: response.last_page,
                    total: response.total,
                    per_page: response.per_page,
                };
                this.page = response.current_page;
            } catch (error) {
                this.errorMessageText = errorMessage(error, 'Не удалось загрузить данные.');
            } finally {
                this.loading = false;
            }
        },
        applySearch() {
            this.loadRecords(1, false);
        },
        goToPage(page) {
            if (page < 1 || page > this.meta.last_page || page === this.page) {
                return;
            }
            this.loadRecords(page, false);
        },
        loadMore() {
            this.loadRecords(this.page + 1, true);
        },
        openCreate() {
            this.editingRecord = null;
            this.modalShow = true;
        },
        openEdit(record) {
            this.editingRecord = { ...record };
            this.modalShow = true;
        },
        async onSaved() {
            await this.loadRecords(1, false);
        },
        askDelete(record) {
            this.deleteTarget = record;
            this.deleteShow = true;
        },
        async performDelete() {
            if (!this.deleteTarget) {
                return;
            }
            try {
                await api.delete(`/api/v1/records/${this.deleteTarget.id}`);
                this.deleteShow = false;
                this.deleteTarget = null;
                await this.loadRecords(1, false);
            } catch (error) {
                this.errorMessageText = errorMessage(error, 'Не удалось удалить запись.');
                this.deleteShow = false;
            }
        },
        formatAmount(value) {
            if (value === null || value === undefined || value === '') {
                return '—';
            }
            return Number(value).toLocaleString('ru-RU', { minimumFractionDigits: 2 });
        },
        formatDate(value) {
            if (!value) return '—';
            return new Date(value.replace(' ', 'T')).toLocaleString('ru-RU');
        },
    },
};
</script>
