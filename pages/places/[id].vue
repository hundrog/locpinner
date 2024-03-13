<script lang="ts" setup>
const supabase = useSupabaseClient()
const route = useRoute()

const { data: places, error } = await supabase
  .from('places')
  .select('*')
  .eq('id', route.params.id)

const { lon, lat } = places[0]
</script>

<template>
  <div>
    <StaticMap :lon="lon" :lat="lat" :rounded="false" size="large" />
  </div>
</template>

<style scoped></style>
