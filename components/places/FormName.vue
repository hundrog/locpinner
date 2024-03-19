<script setup lang="ts">
const route = useRoute()
const props = defineProps(['item'])

const editing = ref(false)
const name = ref('')

async function updateName() {
  const supabase = useSupabaseClient()
  const { error } = await supabase
    .from('places')
    .update({ name: name.value })
    .eq('id', route.params.id)

  if (!error) {
    props.item.name = name.value
    editing.value = false
  }
}
</script>

<template>
  <form class="flex flex-row" v-if="editing" @submit.prevent="updateName()">
    <div class="grow">
      <input type="text" placeholder="Type here" class="input-bordered w-full max-w-xl input input-md" v-model="name" />
    </div>
    <div class="">
      <PlacesSaveButton />
    </div>
  </form>
  <div class="flex" v-else>
    <div class="grow">
      <h2 class="card-title" ref="el">{{ item?.name }}</h2>
    </div>
    <div class="">
      <PlacesEditButton @click="editing = true" />
    </div>
  </div>
</template>

<style scoped>
</style>
