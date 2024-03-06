<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
function submitPlace() {
  console.log("Saving Place")
  isOpen.value = false
}
</script>

<template>
  <div class="">
    <button class="mr-2 btn btn-accent btn-circle" @click="openModal">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex justify-center items-center p-4 min-h-full">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel class="bg-base-100 shadow-xl w-full max-w-lg card">
              <div class="card-body">
                <DialogTitle as="h3" class="card-title">
                  Add a Place
                </DialogTitle>
                <div class="space-y-2 mt-2">
                  <label class="flex items-center gap-2 input-bordered input">
                    Name
                    <input type="text" class="grow" placeholder="Bakery" />
                  </label>
                </div>

                <div class="justify-end mt-2 card-actions">
                  <button type="button" class="text-white btn btn-primary" @click="submitPlace">
                    Save
                  </button>
                  <button type="button" class="btn btn-secondary" @click="closeModal">
                    Close
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
