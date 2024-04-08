<script lang="ts" setup>
import type { Enums } from '~/types/supabase'
const categories = ref()
const placesStore = usePlacesStore()

onMounted(() => {
  categories.value = [
    { key: 'all', val: 'All' },
    { key: 'person', val: 'Persons' },
    { key: 'store', val: 'Stores' },
  ]
})

function setCategory(category: Enums<'category'>) {
  placesStore().category = category
}
</script>

<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-circle btn-info">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
      </svg>
    </div>
    <ul tabindex="0" class="z-20 bg-base-100 shadow mt-3 p-2 rounded-box w-52 dropdown-content menu menu-sm">
      <li v-for="category in categories" :key="category.key">
        <a @click="setCategory(category.key)" :class="{ active: placesStore().category == category.key }">
          {{ category.val }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
