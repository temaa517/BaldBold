<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog" v-if="show" @click.self="$emit('cancel')">
        <div class="modal-backdrop show"></div>
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content card-shadow">
                <div class="card-header bg-white">
                    <h5 class="mb-0">{{ title }}</h5>
                </div>
                <div class="card-body">
                    <p class="mb-0">{{ message }}</p>
                </div>
                <div class="card-footer bg-white d-flex justify-content-end">
                    <button type="button" class="btn btn-light mr-2" @click="$emit('cancel')">Отмена</button>
                    <button type="button" class="btn btn-danger" @click="$emit('confirm')">Удалить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConfirmModal',
    props: {
        show: { type: Boolean, default: false },
        title: { type: String, default: 'Подтверждение' },
        message: { type: String, default: 'Вы уверены?' },
    },
};
</script>
