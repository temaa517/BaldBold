<template>
    <div>
        <h1 class="page-title">Загрузка данных из Excel</h1>
        <div class="row">
            <div class="col-lg-8">
                <ExcelUploader />
            </div>
            <div class="col-lg-4">
                <div class="card card-shadow">
                    <div class="card-header bg-white">
                        <h5 class="mb-0">Структура файла</h5>
                    </div>
                    <div class="card-body">
                        <p class="small text-muted">
                            Первая строка может содержать заголовки. Поддерживаются русские и английские названия
                            колонок. Если заголовки не распознаны, используются позиции по умолчанию.
                        </p>
                        <ol class="small mb-0">
                            <li>Имя / Name</li>
                            <li>Email / E-mail</li>
                            <li>Телефон / Phone</li>
                            <li>Сумма / Amount</li>
                            <li>Описание / Description</li>
                        </ol>
                    </div>
                </div>
                <div class="card card-shadow mt-4" v-if="!store.isAuthenticated">
                    <div class="card-body">
                        <h5 class="card-title">Просмотр данных</h5>
                        <p class="text-muted small">
                            После авторизации доступны просмотр, добавление, обновление и удаление записей,
                            а также история изменений.
                        </p>
                        <router-link to="/login" class="btn btn-outline-primary btn-sm">Войти</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ExcelUploader from '../components/ExcelUploader.vue';
import store from '../store';

export default {
    name: 'HomeView',
    components: { ExcelUploader },
    data() {
        return { store };
    },
};
</script>
