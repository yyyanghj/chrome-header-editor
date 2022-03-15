<script setup lang="ts">

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

interface Props {
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
})
function toggle() {
  emit('update:modelValue', !props.modelValue)
}

</script>

<template>
  <div
    class="border border-solid rounded-full cursor-pointer flex border-zinc-300 h-5 py-1 w-10 items-center"
    :class="modelValue ? 'bg-zinc-800' : 'bg-zinc-200'"
    @click.stop="toggle"
  >
    <div
      class="bg-white rounded-full h-4 transform transition ease w-4 duration-100 thumb"
      :class="modelValue ? ' translate-x-[20px]' : 'translate-x-[2px]'"
    ></div>
  </div>
</template>
