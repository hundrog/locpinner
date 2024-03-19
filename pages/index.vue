<script setup>
const supabase = useSupabaseClient()

const { data: places, error } = await supabase
  .from('places')
  .select('*')
  .order('created_at', { ascending: true })
</script>

<template>
  <div class="flex justify-end mb-8">
    <NewPlaceModal />
  </div>
  <div class="gap-4 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mx-2 md:mx-0">
    <div class="card lg:card-side bg-base-100 shadow-lg image-full" v-for="place in places" :key="place.id">
      <figure><StaticMap :map-uri="place.map_url" /></figure>
      <div class="card-body">
        <h2 class="card-title">{{ place.name }}</h2>
        <p>{{ place.address }}</p>
        <div class="justify-end card-actions">
          <NuxtLink class="btn btn-primary" :to="`/places/${place.id}`">Details</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
