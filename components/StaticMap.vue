<script setup lang="ts">
const supabase = useSupabaseClient()
const props = defineProps({
  mapUri: String,
  size: { type: String, default: 'default' },
})

const loading = ref(true)
const uri = ref()

watch(props, async () => {
  if (props.mapUri) {
    const { data, error } = await supabase
    .storage
    .from('maps')
    .createSignedUrl(props.mapUri || '', 3600)

    if(error) { throw error }

    uri.value = data?.signedUrl
  }
}, { immediate: true })
</script>

<template>
  <div class="rounded-t-xl lg:rounded-none lg:rounded-l-xl w-96 h-96" :class="{ skeleton: loading }" v-if="size == 'default'">
    <NuxtImg :src="uri" @load="loading = false" class="w-full h-full" v-if="uri" />
  </div>
  <div class="rounded-t-xl lg:rounded-none lg:rounded-l-xl w-96 lg:w-[640px] h-96 lg:h-[640px]" :class="{ skeleton: loading }" v-else-if="size == 'large'">
    <NuxtImg :src="uri" @load="loading = false" class="w-full h-full" v-if="uri" />
  </div>
</template>

<style scoped></style>
