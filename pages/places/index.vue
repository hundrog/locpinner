<script setup>
const supabase = useSupabaseClient()
const placesStore = usePlacesStore()
const filteredPlaces = ref()

onMounted(async () => {
  await placesStore().fetch()
  filteredPlaces.value = placesStore().places
})

supabase
  .channel('places_index')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'places' }, payload => {
    placesStore().replaceLast(payload.new)
  })
  .subscribe()

function cetegorize(category) {
  filteredPlaces.value = category === 'all' ? placesStore().places : placesStore().places.filter((place) => place.category === category)
}

watch(() => placesStore().category, (newCategory, oldCategory) => {
  if (newCategory !== oldCategory) {
    cetegorize(newCategory)
  }
})
</script>

<template>
  <div class="flex justify-end space-x-2 mb-8">
    <CategoryFilter />
    <NewPlaceModal />
  </div>
  <div class="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-2 md:mx-0">
    <div class="card lg:card-side bg-base-100 shadow-lg image-full" v-for="place in filteredPlaces" :key="place.id">
      <figure>
        <StaticMap :map-uri="place.map_url" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ place.name }}</h2>
        <p>
        <div v-if="place.id">{{ place.address }}</div>
        <div class="bg-primary/40 w-full h-12 skeleton" v-else></div>
        </p>
        <div class="justify-end card-actions">
          <NuxtLink class="btn btn-primary" :to="`/places/${place.id}`">Details</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
