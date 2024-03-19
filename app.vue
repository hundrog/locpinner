<template>
  <NuxtLayout>
    <NuxtPage />
    <Alert />
  </NuxtLayout>
</template>

<script>
import { themeChange } from 'theme-change'
onMounted(() => {
  themeChange(false)
})
</script>
