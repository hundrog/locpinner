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
  <div class="space-y-4 px-2">
    <div class="card lg:card-side bg-base-100 shadow-lg" v-for="place in places" :key="place.id">
      <figure><StaticMap :lon="place.lon" :lat="place.lat"/></figure>
      <div class="card-body">
        <h2 class="card-title">{{ place.name }}</h2>
        <p>{{ place.address }}</p>
        <div class="justify-end card-actions">
          <button class="btn btn-primary">Listen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
