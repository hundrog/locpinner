<script lang="ts" setup>
import type { Database, Tables } from '~/types/supabase'
const supabase = useSupabaseClient<Database>()
const route = useRoute()
const placesStore = usePlacesStore()

const { data: places, error } = await supabase
  .from('places')
  .select('id, name, address, lat, lon, map_url, category')
  .eq('id', route.params.id)

async function deletePlace(placeId: string) {
  const { error } = await supabase
    .from('places')
    .delete()
    .eq('id', placeId)

  if (!error) {
    placesStore().set(
      placesStore().places.filter((p: Tables<'places'>) => {
        p.id != route.params.id
      })
    )
    return navigateTo('/places')
  }
}
</script>

<template>
  <div v-for="place in places" :key="place.id" class="container">
    <div class="card lg:card-side bg-base-100 shadow-lg mx-2 md:mx-0">
      <figure>
        <StaticMap :map-uri="place.map_url" size="large" />
      </figure>
      <div class="card-body">
        <PlacesFormName :item="place" />
        <p>
          <PlacesFormAddress :item="place" />
          <PlacesFormCategory :item="place" />
        </p>
        <div class="justify-end card-actions">
          <button class="btn btn-warning" @click.prevent="deletePlace(place.id)">Delete</button>
          <NuxtLink class="btn btn-primary" to="/places">Back</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
