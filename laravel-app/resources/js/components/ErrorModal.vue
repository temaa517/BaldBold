<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog" v-if="show" @click.self="$emit('close')">
        <div class="modal-backdrop show"></div>
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content card-shadow">
                <div class="card-header bg-danger text-white d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">{{ title }}</h5>
                    <button type="button" class="close text-white" aria-label="Close" @click="$emit('close')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="card-body">
                    <p class="mb-3">{{ message }}</p>
                    <div v-if="details && details.length">
                        <p class="font-weight-bold mb-1">Подходящие форматы файлов:</p>
                        <ul class="mb-0">
                            <li v-for="detail in details" :key="detail">{{ detail }}</li>
                        </ul>
                    </div>
                </div>
                <div class="card-footer text-right bg-white">
                    <button type="button" class="btn btn-danger" @click="$emit('close')">Понятно</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ErrorModal',
    props: {
        show: { type: Boolean, default: false },
        title: { type: String, default: 'Ошибка' },
        message: { type: String, default: '' },
        details: { type: Array, default: () => [] },
    },
};
</script>
