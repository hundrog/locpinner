import type { H3Event, EventHandlerRequest } from 'h3'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const map = await getImage(event)

  return map
})

async function getImage(event: H3Event<EventHandlerRequest>) {
  const config = useRuntimeConfig(event)
  const {lon, lat, height, width, zoom, scale} = getQuery(event)

  let map: any
  const center = `lonlat:${lon},${lat}`

  await $fetch('https://maps.geoapify.com/v1/staticmap', {
      query: {
      style: 'osm-bright-smooth',
      width: width,
      height: height,
      center: center,
      zoom: zoom,
      marker: `${center};type:material;color:red;size:small;icon:wifi;icontype:awesome;iconsize:small`,
      scaleFactor: scale,
      apiKey: config.geoapifyToken,
    },
    async onResponse({ request, response, options }) {
      map = response._data
    }
  })

  return map
}
