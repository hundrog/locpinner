<script lang="ts" setup>
const loading = ref(true)
const uri = ref()

interface QueryBySize {
  default: {
    width: number;
    height: number;
    zoom: number;
    scale: number;
  };
  large: {
    width: number;
    height: number;
    zoom: number;
    scale: number;
  };
}

type Size = keyof QueryBySize;

const queryBysize: QueryBySize = {
  default: {
    width: 400,
    height: 400,
    zoom: 15,
    scale: 2,
  },
  large: {
    width: 640,
    height: 640,
    zoom: 15.2,
    scale: 1,
  },
};

const props = defineProps({
  lon: String,
  lat: String,
  size: { type: String, default: 'default' as Size },
  rounded: { type: Boolean, default: true },
})

// onMounted(async () => {
watch(props, async () => {
  if (props.lon) {
    const { width, height, zoom, scale } = queryBysize[props.size as Size];
    await $fetch('/api/image', {
      query: {
        lon: props.lon,
        lat: props.lat,
        width,
        height,
        zoom,
        scale,
      },
      async onResponse({ response }) {
        uri.value = URL.createObjectURL(response._data)
      }
    })
  }
}, { immediate: true })
// })
</script>

<template>
  <div class="rounded-t-xl lg:rounded-none lg:rounded-l-xl w-96 h-96" :class="{ skeleton: loading }"
    v-if="size === 'default'">
    <NuxtImg :src="uri" @load="loading = false" v-if="uri" class="w-full h-full" />
  </div>
  <div class="rounded-none w-96 lg:w-[640px] h-96 lg:h-[640px]" :class="{ skeleton: loading }" v-else>
    <NuxtImg :src="uri" @load="loading = false" v-if="uri" class="w-full h-full" />
  </div>
</template>
