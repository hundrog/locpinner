<script lang="ts" setup>
definePageMeta({
  layout: 'blank'
})
</script>

<template>
  <h1 class="my-4 text-7xl">Login Now</h1>
  <div class="bg-base-100 shadow-2xl w-full max-w-sm card shrink-0">
    <div class="card-body">
      <form class="space-y-2">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" class="input-bordered input" required />
        </div>
        <div class="form-control">
          <button class="text-base-100 btn btn-primary">Login with email</button>
        </div>
      </form>
      <div class="divider">or</div>
      <div class="space-y-2">
        <button class="btn-block btn btn-facebook">Login with Facebook</button>
        <button class="btn-block btn btn-google">
          <google-logo />
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-facebook {
  background-color: #1977f2;
  border-color: #1977f2;
  color: white;

  &:hover {
    background-color: #4267B2;
    border-color: #4267B2;
  }
}

.btn-google {
  background-color: #f2f2f2;
  border-color: #747775;
  color: #1f1f1f;

  &:hover {
    background-color: #ffffff61;
    /* -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15); */
  }
}
</style>
