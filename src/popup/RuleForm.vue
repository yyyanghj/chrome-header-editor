<script setup lang="ts">
import { Rule } from '~/types'

type Props = {
  rule: Rule
}

const props = defineProps<Props>()

const formState = reactive(props.rule)

const emit = defineEmits<{
  (e: 'save', rule: Rule): void
  (e: 'close'): void
}>()

</script>

<template>
  <div class="py-4">
    <div class="row">
      <h6 class="field-heading">
        Rule Name:
      </h6>
      <input
        v-model="formState.name"
        class="field-input"
        type="text"
      >
    </div>

    <div class="row">
      <h6 class="field-heading">
        Url Match:
      </h6>
      <input
        v-model="formState.matcher.value"
        class="field-input"
        type="text"
      >
    </div>

    <div class="row">
      <h6 class="field-heading">
        Header Key:
      </h6>
      <input v-model="formState.action.headerName" class="field-input" type="text">
    </div>

    <div class="row">
      <h6 class="field-heading">
        Header Value:
      </h6>
      <input v-model="formState.action.headerValue" class="field-input" type="text">
    </div>

    <!-- <div class="flex mt-2 row gap-6">
      <Button
        outline
        class="bg-white border-current border flex-1 w-30"
      >
        Cancel
      </Button>

      <Button class="flex-1">
        Save
      </Button>
    </div> -->
  </div>
</template>

<style scoped lang="postcss">

.field-heading {
  @apply font-medium text-sm mb-1 text-zinc-400 select-none;
}

.field-input {
  font: inherit;
  @apply  border-solid  border rounded outline-none border-zinc-300 text-sm w-full py-1 px-2 appearance-none;
}
.row {
  @apply py-1;
}

</style>
