<script lang="ts" setup>
import { themeChange } from 'theme-change'
onMounted(() => {
  themeChange(false)
})
</script>

<template>
  <nav-bar />
  <div class="mx-auto mt-2 lg:mt-12 container">
    <slot />
  </div>
</template>

<style scoped></style>
