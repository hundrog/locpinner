<script lang="ts" setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (!error) { return navigateTo('/login') }
}
</script>

<template>
  <div class="bg-base-100 navbar">
    <div class="flex-1">
      <NuxtLink class="text-xl btn btn-ghost" :to="user ? '/places' : '/'">
        <planet-logo class="w-6 h-6" />
        LocPinner
      </NuxtLink>
    </div>
    <div class="flex-none gap-2">
      <div class="form-control">
        <!-- <input type="text" placeholder="Search" class="input-bordered w-24 md:w-auto input" /> -->
      </div>
      <div class="mr-2 dropdown dropdown-end" v-if="user">
        <Avatar />
        <ul tabindex="0" class="z-20 bg-base-100 shadow mt-3 p-2 rounded-box w-52 dropdown-content menu menu-sm">
          <li>
            <a class="justify-between text-base-200">
              Profile
              <!-- <span class="badge">New</span> -->
            </a>
          </li>
          <li><a class="text-base-200">Settings</a></li>
          <li>
            <label class="flex gap-2 cursor-pointer">
              <span class="label-text">Dark Mode</span>
              <input type="checkbox" data-toggle-theme="dark,light" data-act-class="ACTIVECLASS" class="theme-controller toggle" value="dim"/>
            </label>
          </li>
          <li><button @click.prevent="signOut()">Logout</button></li>
        </ul>
      </div>
      <div class="navbar-end" v-else>
        <NuxtLink to="/login" class="btn">Login</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
