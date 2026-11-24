<template>
    <div>
        <div class="card card-shadow">
            <div class="card-body">
                <h4 class="card-title">Загрузка Excel-файла</h4>
                <p class="text-muted small">
                    Перетащите файл в область ниже или выберите его в диалоге. Данные будут разобраны и сохранены в базу,
                    а сам файл — в локальное хранилище сервера.
                </p>

                <div class="drop-zone"
                     :class="{ 'is-dragging': dragging, 'is-invalid': error.show }"
                     @dragenter.prevent="dragging = true"
                     @dragover.prevent="dragging = true"
                     @dragleave.prevent="dragging = false"
                     @drop.prevent="onDrop"
                     @click="openPicker">
                    <div class="drop-zone__icon mb-3 text-primary font-weight-bold">XLS</div>
                    <h5 v-if="!selectedFile">Перетащите Excel-файл сюда</h5>
                    <h5 v-else>{{ selectedFile.name }}</h5>
                    <p class="text-muted mb-3">или</p>
                    <button type="button" class="btn btn-primary" @click.stop="openPicker">
                        Выбрать файл
                    </button>
                    <input ref="fileInput" type="file" class="d-none" :accept="acceptAttribute" @change="onFileChange">
                    <p class="text-muted small mt-3 mb-0">
                        Допустимые форматы: {{ allowedFormats.join(', ') }}. Максимум 20 МБ.
                    </p>
                </div>

                <div class="progress mt-4" v-if="uploading">
                    <div class="progress-bar progress-bar-striped progress-bar-animated"
                         role="progressbar" style="width: 100%"></div>
                </div>

                <div class="alert alert-success mt-4 mb-0" v-if="successMessage">
                    {{ successMessage }}
                    <router-link to="/data" class="alert-link">Перейти к данным →</router-link>
                </div>
            </div>
        </div>

        <div class="card card-shadow mt-4">
            <div class="card-header bg-white">
                <h5 class="mb-0">Последние загруженные файлы</h5>
            </div>
            <div class="card-body">
                <p v-if="!files.length" class="text-muted mb-0">Файлы ещё не загружались.</p>
                <div v-else class="table-responsive">
                    <table class="table table-sm table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Файл</th>
                                <th>Формат</th>
                                <th>Размер</th>
                                <th>Строк</th>
                                <th>Дата</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="file in files" :key="file.id">
                                <td>{{ file.original_name }}</td>
                                <td><span class="badge badge-secondary">{{ file.extension }}</span></td>
                                <td>{{ formatSize(file.size) }}</td>
                                <td>{{ file.rows_count }}</td>
                                <td>{{ formatDate(file.created_at) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <ErrorModal :show="error.show"
                    :title="error.title"
                    :message="error.message"
                    :details="error.details"
                    @close="error.show = false" />
    </div>
</template>

<script>
import * as XLSX from 'xlsx';
import api, { errorMessage } from '../api';
import ErrorModal from './ErrorModal.vue';

const ALLOWED_FORMATS = ['xlsx', 'xls', 'xlsm', 'xlsb', 'csv', 'ods'];

const HEADER_ALIASES = {
    name: ['name', 'full name', 'fullname', 'fio', 'имя', 'фио', 'название', 'клиент', 'customer'],
    email: ['email', 'e-mail', 'mail', 'почта', 'электронная почта', 'email address'],
    phone: ['phone', 'tel', 'mobile', 'телефон', 'тел'],
    amount: ['amount', 'price', 'total', 'sum', 'сумма', 'цена', 'стоимость'],
    description: ['description', 'comment', 'note', 'описание', 'комментарий', 'примечание'],
};

function normalize(value) {
    return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

export default {
    name: 'ExcelUploader',
    components: { ErrorModal },
    data() {
        return {
            allowedFormats: ALLOWED_FORMATS,
            dragging: false,
            uploading: false,
            selectedFile: null,
            successMessage: '',
            files: [],
            error: { show: false, title: 'Ошибка загрузки', message: '', details: [] },
        };
    },
    computed: {
        acceptAttribute() {
            return this.allowedFormats.map((extension) => `.${extension}`).join(',');
        },
    },
    mounted() {
        this.loadFiles();
    },
    methods: {
        async loadFiles() {
            try {
                const response = await api.get('/api/v1/files');
                this.files = response.data;
            } catch (error) {
                this.files = [];
            }
        },
        openPicker() {
            this.$refs.fileInput.click();
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.handleFile(file);
            }
            event.target.value = '';
        },
        onDrop(event) {
            this.dragging = false;
            const file = event.dataTransfer.files[0];
            if (file) {
                this.handleFile(file);
            }
        },
        async handleFile(file) {
            this.successMessage = '';
            const extension = file.name.includes('.')
                ? file.name.split('.').pop().toLowerCase()
                : '';

            if (!ALLOWED_FORMATS.includes(extension)) {
                this.showError(
                    'Неверный формат файла',
                    `Файл «${file.name}» не является Excel-файлом. Поддерживаются только указанные ниже форматы.`,
                    ALLOWED_FORMATS.map((format) => `.${format}`)
                );
                return;
            }

            this.selectedFile = file;

            try {
                const rows = await this.parseFile(file);
                await this.upload(file, rows);
                await this.loadFiles();
                this.$emit('uploaded');
            } catch (error) {
                this.showError('Не удалось загрузить файл', errorMessage(error, 'Проверьте содержимое файла и попробуйте снова.'), []);
            } finally {
                this.uploading = false;
            }
        },
        async parseFile(file) {
            const buffer = await file.arrayBuffer();
            const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });
            const sheetName = workbook.SheetNames[0];

            if (!sheetName || !workbook.Sheets[sheetName]) {
                throw new Error('В файле не найдено ни одного листа.');
            }

            const matrix = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
                header: 1,
                defval: '',
                raw: false,
            }).filter((row) => row.some((cell) => String(cell ?? '').trim() !== ''));

            if (matrix.length < 2) {
                throw new Error('Файл должен содержать строку заголовков и хотя бы одну строку данных.');
            }

            const columns = this.detectColumns(matrix[0]);

            const rows = matrix.slice(1).map((row, index) => ({
                name: String(row[columns.name] ?? '').trim(),
                email: String(row[columns.email] ?? '').trim(),
                phone: String(row[columns.phone] ?? '').trim(),
                amount: this.parseAmount(row[columns.amount]),
                description: String(row[columns.description] ?? '').trim(),
                source_row: index + 2,
            })).filter((row) => row.name !== '' || row.email !== '');

            if (!rows.length) {
                throw new Error('В файле не найдено ни одной заполненной строки данных.');
            }

            return rows;
        },
        detectColumns(headerRow) {
            const columns = {};

            headerRow.forEach((cell, index) => {
                const key = normalize(cell);
                Object.keys(HEADER_ALIASES).forEach((field) => {
                    if (columns[field] === undefined && HEADER_ALIASES[field].includes(key)) {
                        columns[field] = index;
                    }
                });
            });

            if (Object.keys(columns).length >= 2) {
                return columns;
            }

            return { name: 0, email: 1, phone: 2, amount: 3, description: 4 };
        },
        parseAmount(value) {
            const raw = String(value ?? '').trim();
            if (raw === '') {
                return null;
            }
            const normalized = raw.replace(/\s/g, '').replace(',', '.').replace(/[^\d.\-]/g, '');
            const number = Number(normalized);
            return Number.isFinite(number) ? number : null;
        },
        async upload(file, rows) {
            this.uploading = true;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('rows', JSON.stringify(rows));

            const response = await api.post('/api/v1/uploads', formData);
            this.successMessage = `Загружено строк: ${response.rows_imported}.`;
        },
        showError(title, message, details) {
            this.error = { show: true, title, message, details };
        },
        formatSize(bytes) {
            if (!bytes) return '0 Б';
            const units = ['Б', 'КБ', 'МБ', 'ГБ'];
            const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
            return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${units[index]}`;
        },
        formatDate(value) {
            if (!value) return '—';
            return new Date(value.replace(' ', 'T')).toLocaleString('ru-RU');
        },
    },
};
</script>
