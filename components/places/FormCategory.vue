<script lang="ts" setup>
import type { Database, Enums } from "~/types/supabase";
const supabase = useSupabaseClient<Database>();
const route = useRoute();
const props = defineProps(["item"]);

const editing = ref(false);

async function updateCategory() {
  const { error } = await supabase
    .from("places")
    .update({ category: selectedCategory.value.key })
    .eq("id", route.params.id);

  if (!error) {
    props.item.category = selectedCategory.value;
    editing.value = false;
  }
}

import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

type CategoryOption = {
  key: Enums<"category">;
  val: string;
};

const categories = [
  { key: "person", val: "Persons" },
  { key: "store", val: "Stores" },
] as CategoryOption[];

const selectedCategory = ref(
  categories.find((category) => category.key === props.item.category) ||
    categories[0],
);
</script>

<template>
  <form
    class="flex flex-row mt-8"
    v-if="editing"
    @submit.prevent="updateCategory()"
  >
    <div class="grow">
      <Listbox v-model="selectedCategory">
        <div class="relative mt-1">
          <ListboxButton class="input input-bordered w-full">
            <span class="block truncate">{{ selectedCategory.val }}</span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <ChevronUpDownIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
            >
              <ListboxOption
                v-slot="{ active, selected }"
                v-for="category in categories"
                :key="category.key"
                :value="category"
                as="template"
              >
                <li
                  :class="[
                    active ? 'bg- text-base-content' : 'text-base-content',
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                  ]"
                >
                  <span
                    :class="[
                      selected ? 'font-medium' : 'font-normal',
                      'block truncate',
                    ]"
                    >{{ category.val }}</span
                  >
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>
    <div class="">
      <PlacesSaveButton />
    </div>
  </form>
  <div class="flex flex-row items-center" v-else>
    <div class="grow">
      <div class="badge badge-neutral">
        {{ selectedCategory.val }}
      </div>
    </div>
    <div class="">
      <PlacesEditButton @click="editing = true" />
    </div>
  </div>
</template>

<style scoped></style>
