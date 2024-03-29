// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@nuxt/image"
  ],
  runtimeConfig: {
    geoapifyToken: '',
    public: {
      baseUrl: '',
      environment: ''
    }
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/'],
    }
  }
})
