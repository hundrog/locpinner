<script lang="ts" setup>
definePageMeta({
  layout: 'blank'
})
</script>

<template>
  <h1 class="my-4 text-7xl">Login Now</h1>
  <div class="bg-base-100 shadow-2xl w-full max-w-sm card shrink-0">
    <form class="card-body">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input type="email" placeholder="email" class="input-bordered input" required />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input type="password" placeholder="password" class="input-bordered input" required />
        <label class="label">
          <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
        </label>
      </div>
      <div class="form-control mt-6">
        <button class="btn btn-primary">Login</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
