import type { Place } from '~/types/place'
export const usePlaces = () => defineStore('placesStore', () => {
    const places = ref()

    async function fetch() {
        const supabase = useSupabaseClient()
        const { data, error } = await supabase
            .from('places')
            .select('*')
            .order('created_at', { ascending: true })

        if (!error) {
            places.value = data
        }
    }

    function push(place: Place) {
        places.value.push(place)
    }

    function pop() {
        places.value.pop()
    }

    function replaceLast(place: Place) {
        places.value.splice(places.value.length -1, 1, place)
    }

    function set(items: Place[]) {
        places.value = items
    }

    return { places, fetch, push, pop, set, replaceLast }
})
