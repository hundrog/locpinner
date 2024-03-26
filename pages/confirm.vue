<script lang="ts" setup>
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
      return navigateTo('/places')
  }
}, { immediate: true })

definePageMeta({
  layout: 'blank'
})
</script>

<template>
  <span class="loading loading-bars loading-lg"></span>
</template>

<style scoped></style>
