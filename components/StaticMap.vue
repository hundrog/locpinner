<script lang="ts" setup>
const loading = ref(true)
const uri = ref()

const props = defineProps({
  lon: String,
  lat: String
})

onMounted(async () => {
  await $fetch('/api/image', {
    query: {
      lon: props.lon,
      lat: props.lat
    },
    async onResponse({ response }) {
      uri.value = URL.createObjectURL(response._data)
    }
  })
})
</script>

<template>
  <div class="rounded-t-xl lg:rounded-l-xl lg:rounded-none w-96 h-96 shrink-0" :class="{ skeleton: loading }">
    <NuxtImg :src="uri" @load="loading = false" v-if="uri" />
  </div>
</template>

<style scoped>
</style>
