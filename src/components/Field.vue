<template>
    <div class="col" @click="$emit('mark', field.id)">
        <div class="position-relative" :class="field.background" style="height: 80px;">
            <span class="position-absolute top-50 start-50 translate-middle fs-1">
                <i class="bi" :class="[field.icon]"></i>
            </span>
        </div>
    </div>
</template>

<script setup>
defineProps(['field'])

</script>