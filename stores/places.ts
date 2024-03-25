import type { Database, Tables } from '~/types/supabase'
export const usePlaces = () => defineStore('placesStore', () => {
    const places = ref()

    async function fetch() {
        const supabase = useSupabaseClient<Database>()
        const { data, error } = await supabase
            .from('places')
            .select('*')
            .order('created_at', { ascending: true })

        if (!error) {
            places.value = data
        }
    }

    function push(place: Tables<'places'>) {
        places.value.push(place)
    }

    function pop() {
        places.value.pop()
    }

    function replaceLast(place: Tables<'places'>) {
        places.value.splice(places.value.length -1, 1, place)
    }

    function set(items: Tables<'places'>[]) {
        places.value = items
    }

    return { places, fetch, push, pop, set, replaceLast }
})
