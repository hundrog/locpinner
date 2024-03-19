<script setup lang="ts">
const supabase = useSupabaseClient()
const route = useRoute()
const props = defineProps(['item'])

const editing = ref(false)
const address = ref('')

async function updateAddress() {
  props.item.address = address.value
  const { error } = await supabase
    .from('places')
    .update({ address: address.value })
    .eq('id', route.params.id)

  if (!error) {
    props.item.address = address.value
    editing.value = false
  }
}
</script>

<template>
  <form class="flex flex-row" v-if="editing" @submit.prevent="updateAddress()">
    <div class="grow"><input type="text" placeholder="Type here" class="input-bordered w-full max-w-xl input input-md"
        v-model="address" /></div>
    <div class="">
      <PlacesSaveButton />
    </div>
  </form>
  <div class="flex flex-row items-center" v-else>
    <div class="grow">{{ item.address }}</div>
    <div class="">
      <PlacesEditButton @click="editing = true" />
    </div>
  </div>
</template>

<style scoped>
</style>
