<script lang="ts" setup>
import type { Place } from '~/types/place'
const supabase = useSupabaseClient()
const route = useRoute()
const placesStore = usePlaces()

const { data: places, error } = await supabase
  .from('places')
  .select('id, name, address, lat, lon, map_url')
  .eq('id', route.params.id)

async function deletePlace(placeId: string) {
  const { error } = await supabase
    .from('places')
    .delete()
    .eq('id', placeId)

  if (!error) {
    placesStore().set(
      placesStore().places.filter((p: Place) => {
        p.id != route.params.id
      })
    )
    return navigateTo('/')
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
        </p>
        <div class="justify-end card-actions">
          <button class="btn btn-warning" @click.prevent="deletePlace(place.id)">Delete</button>
          <NuxtLink class="btn btn-primary" to="/">Back</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
