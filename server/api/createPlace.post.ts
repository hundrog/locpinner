import { serverSupabaseClient } from '#supabase/server'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { H3Event, EventHandlerRequest } from 'h3'

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
  const supabase = await serverSupabaseClient(event)
  const geocodeResponse = ref()

  const { data: { session } } = await supabase.auth.getSession()

  const body = await readBody(event)
  await geolocate(event, geocodeResponse, body)
  const image = await getImage(event, geocodeResponse, body)

  saveImage(supabase, geocodeResponse.value.place_id, image)

  return await savePlace(supabase, geocodeResponse, body, session?.user.id)
})

async function geolocate(event: H3Event<EventHandlerRequest>, geocodeResponse: Ref<any>, body: any) {
  const config = useRuntimeConfig(event)

  await $fetch('https://api.geoapify.com/v1/geocode/reverse', {
    query: {
      lon: body.longitude,
      lat: body.latitude,
      apiKey: config.geoapifyToken,
    },
    async onRequestError({ request, options, error }) {
      console.log("[fetch request error]", request, error);
    },
    async onResponse({ request, response, options }) {
      // console.log("[fetch response]", response)
      geocodeResponse.value = response._data.features[0].properties
    },
  })
}

async function getImage(event: H3Event<EventHandlerRequest>, geocodeResponse: Ref<any>, body: any) {
  const config = useRuntimeConfig(event)

  let map: any
  const center = `lonlat:${body.longitude},${body.latitude}`

  await $fetch('https://maps.geoapify.com/v1/staticmap', {
      query: {
      style: 'osm-bright-smooth',
      width: '800',
      height: '800',
      center: center,
      zoom: 15.2,
      marker: `${center};type:material;color:red;size:small;icon:wifi;icontype:awesome;iconsize:small`,
      scaleFactor: 2,
      apiKey: config.geoapifyToken,
    },
    async onResponse({ request, response, options }) {
      map = response._data
    }
  })

  return map
}

async function saveImage(supabase: any, name: string, image: any) {
  try {
    const { error } = await supabase.storage.from('maps').upload(name, image, {upsert: true});
    if (error) throw error;
  } catch (error) {
    console.error("Error while saving image:", error);
    throw error;
  }
}

async function savePlace(supabase: any, geocodeResponse: Ref<any>, body: any, userId: any) {
  try {
    const response = await supabase
    .from('places')
    .insert({
      name: body.name,
      lon: body.longitude,
      lat: body.latitude,
      address: geocodeResponse.value.formatted,
      data: geocodeResponse.value,
      user_id: userId,
      map_url: geocodeResponse.value.place_id
    })
    .select()

  if (response.error) { throw response.error }

  return { response: response, error: null }
  } catch (error) {
    console.error("Error while saving place:", error);
    return { response: null, error: error };
  }
}
