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
  <div class="z-50 toast" v-if="message">
    <div class="alert alert-error" v-if="status == 'error'">
      <span>{{ message }}</span>
    </div>
    <div class="alert alert-success" v-else-if="status == 'success'">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<style scoped></style>
