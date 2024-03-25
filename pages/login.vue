<script lang="ts" setup>
const supabase = useSupabaseClient()
const email = ref("")
const loading = ref(false)
const alert = Alert()
const runtimeConfig = useRuntimeConfig()

const redirectUrl = computed(()=>{
  const protocol = (runtimeConfig.public.environment === 'development') ? 'http://' : 'https://'

  return `${protocol}${runtimeConfig.public.baseUrl}/confirm`
})

const signInWithProvider = async (provider: any) => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: redirectUrl.value
    }
  })
  if (error) throw (error)

  } catch (error) {
    alert().create(
      'error',
      'Please review your login details and try again'
    )
  } finally {
    loading.value = false
  }
}

const signInWithEmail = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: redirectUrl.value
    }
  })
  if (error) throw (error)

  } catch (error) {
    alert().create(
      'error',
      'Please review your login details and try again'
    )
  } finally {
    loading.value = false
  }
}

definePageMeta({
  layout: 'blank'
})
</script>

<template>
  <div class="bg-base-100 shadow-2xl w-full max-w-sm card shrink-0">
    <div class="card-body">
      <h2 class="justify-center card-title"><planet-logo class="w-40 h-40" /></h2>
      <form class="space-y-2">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" class="input-bordered input" required v-model="email" />
        </div>
        <div class="form-control">
          <button class="text-base-100 btn btn-primary" :class="{'btn-disabled': loading}" @click.prevent="signInWithEmail()">
            <span class="loading loading-spinner" v-if="loading"></span>
            <span v-else>Login with email</span>
          </button>
        </div>
      </form>
      <div class="divider">or</div>
      <div class="space-y-2">
        <button class="btn-block btn btn-facebook" @click.prevent="signInWithProvider('facebook')">Sign with Facebook</button>
        <button class="btn-block btn btn-google" @click.prevent="signInWithProvider('google')">
          <google-logo class="w-6 h-6" />
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
