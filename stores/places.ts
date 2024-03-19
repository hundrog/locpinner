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

    function push(place: any) {
        places.value.push(place)
    }

    function pop() {
        places.value.pop()
    }

    function replaceLast(place: any) {
        places.value.splice(places.value.length -1, 1, place)
    }

    return { places, fetch, push, pop, replaceLast }
})
