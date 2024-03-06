<script lang="ts" setup></script>

<template>
  <div class="flex justify-end mb-8">
    <NewPlaceModal />
  </div>
  <div class="space-y-4 px-2">
    <div class="card lg:card-side bg-base-100 shadow-lg" v-for="index in 100" :key="index">
      <figure><img src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album" /></figure>
      <div class="card-body">
        <h2 class="card-title">New album is released!</h2>
        <p>Click the button to listen on Spotiwhy app.</p>
        <div class="justify-end card-actions">
          <button class="btn btn-primary">Listen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
