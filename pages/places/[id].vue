<script lang="ts" setup>
const supabase = useSupabaseClient()
const route = useRoute()

const { data: places, error } = await supabase
  .from('places')
  .select('id, name, address, lat, lon')
  .eq('id', route.params.id)
</script>

<template>
  <div v-for="place in places" :key="place.id" class="container">
    <div class="card lg:card-side bg-base-100 shadow-lg">
      <figure>
        <StaticMap :lon="place.lon" :lat="place.lat" size="large" />
      </figure>
      <div class="card-body">
        <PlacesFormName :item="place" />
        <p><PlacesFormAddress :item="place" /></p>
        <div class="justify-end card-actions">
          <NuxtLink class="btn btn-primary" to="/">Back</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
