<script setup>
const supabase = useSupabaseClient()
const placesStore = usePlaces()

onMounted(async () => {
  await placesStore().fetch()
})

const details = ref()

supabase
  .channel('places_index')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'places' }, payload => {
    placesStore().replaceLast(payload.new)
  })
  .subscribe()

 function scrollToElement() {
      const el = details.value;
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
</script>

<template>
  <div class="mb-12 min-h-svh hero scroll-smooth"
    style="background-image: url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg);">
    <div class="bg-opacity-60 hero-overlay"></div>
    <div class="text-center text-neutral-content hero-content">
      <div class="max-w-md">
        <h1 class="mb-5 font-bold text-5xl">Hello there</h1>
        <p class="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.
          In deleniti eaque aut repudiandae et a id nisi.</p>
          <NuxtLink class="mb-36 btn btn-primary" to="/places">Start for free</NuxtLink>
        <div class="flex justify-center">
          <div class="tooltip-right tooltip" data-tip="Learn More">
          <button @click="scrollToElement">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="bottom-0 w-28 h-28 animate-bounce">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </div>
        </div>
      </div>
    </div>
  </div>
  <div class="justify-center space-y-12 bg-contain bg-no-repeat bg-center mb-24 min-h-svh bgimage" ref="details">
    <div class="gap-4 grid grid-cols-1 md:grid-cols-2 mx-auto max-w-xl">
      <div class="flex items-center">
        <p class="text-3xl text-center md:text-left">Save your favorite places with the press of a button, search for them
          and add the route to your
          favorite navigation app</p>
      </div>
      <div class="bg-contain bg-no-repeat bg-center min-h-72 mapman"></div>
    </div>
    <div class="gap-4 grid grid-cols-1 md:grid-cols-2 mx-auto max-w-xl">
      <div class="bg-contain bg-no-repeat bg-center min-h-72 stores"></div>
      <div class="flex items-center order-first md:order-last">
        <p class="md:text-right text-3xl text-center">You can save your friend's addreesses, store's locations, or where
          is your favorite icecream, you decide!</p>
      </div>
    </div>
    <div class="flex justify-center">
      <NuxtLink class="btn btn-primary" to="/places">Start for free</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.bgimage {
  background-image: url(../assets/images/blob.svg);
}

.mapman {
  background-image: url(../assets/images/mapman.svg);
}

.stores {
  background-image: url(../assets/images/stores.svg);
}
</style>
