import { serverSupabaseClient } from '#supabase/server'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { H3Event, EventHandlerRequest } from 'h3'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const geocodeResponse = ref()

  const { data: { session } } = await supabase.auth.getSession()

  const body = await readBody(event)
  await geolocate(event, geocodeResponse, body)

  // return { details: geocodeResponse.value }

  const response = await supabase
    .from('places')
    .insert({
      name: body.name,
      lon: body.longitude,
      lat: body.latitude,
      address: geocodeResponse.value.formatted,
      data: geocodeResponse.value,
      user_id: session?.user.id,
    })

  console.log("Response:", response)

  return { response }
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
