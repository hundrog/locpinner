import type { H3Event, EventHandlerRequest } from 'h3'

export default defineEventHandler(async (event) => {
  const map = await getImage(event)

  return map
})

async function getImage(event: H3Event<EventHandlerRequest>) {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)

  let map: any
  const center = `lonlat:${query.lon},${query.lat}`

  await $fetch('https://maps.geoapify.com/v1/staticmap', {
      query: {
      style: 'osm-bright-smooth',
      width: '400',
      height: '400',
      center: center,
      zoom: '15',
      marker: `${center};type:material;color:red;size:small;icon:wifi;icontype:awesome;iconsize:small`,
      scaleFactor: '2',
      apiKey: config.geoapifyToken,
    },
    async onResponse({ request, response, options }) {
      map = response._data
    }
  })

  return map
}
