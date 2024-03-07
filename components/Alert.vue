<script lang="ts" setup>
const alert = Alert()
const { status, message } = storeToRefs(alert())
const alertClass = ref('alert')

watch(message, () => {
  if (message.value) {
    alertClass.value = `alert alert-${status.value}`
    setTimeout(() => alert().clear(), 3500)
  }
}, { immediate: true })
</script>

<template>
  <div class="toast" v-if="message">
    <div :class="alertClass">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<style scoped></style>
