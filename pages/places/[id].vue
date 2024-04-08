<script lang="ts" setup>
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
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
        <div class="flex justify-end mb-4">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost m-1 btn-circle">
              <EllipsisVerticalIcon class="h-5 w-5" />
            </div>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><button @click.prevent="deletePlace(place.id)">Delete</button></li>
            </ul>
          </div>
        </div>
        <PlacesFormName :item="place" />
        <p>
          <PlacesFormAddress :item="place" />
          <PlacesFormCategory :item="place" />
        </p>
        <div class="justify-end card-actions">
          <NuxtLink class="btn btn-primary" to="/places">Back</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
