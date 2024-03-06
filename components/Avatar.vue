<script lang="ts" setup>
const loading = ref(true)
const supabase = useSupabaseClient()

const { data: { session }, error } = await supabase.auth.getSession()
const avatarUrl = computed(() => {
  switch (session?.user.app_metadata.provider) {
    case "facebook":
      return `http://graph.facebook.com/${session?.user.user_metadata.sub}/picture?type=large&redirect=true&width=500&height=500`

    case "google":
      return session?.user.user_metadata.avatar_url

    default:
      return `https://robohash.org/${session?.user.id}?set=set4`
  }
})
</script>

<template>
  <div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost">
    <div class="rounded-full w-10 h-10 shrink-0" :class="{skeleton: loading}">
      <NuxtImg :src="avatarUrl" @load="loading = false" />
    </div>
  </div>
</template>

<style scoped></style>
