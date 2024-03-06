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
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
            xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6">
            <path fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
            </path>
            <path fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z">
            </path>
            <path fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z">
            </path>
            <path fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
            </path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
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
